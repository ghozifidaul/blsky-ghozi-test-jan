'use client'

import { useEffect, useRef, useState, useCallback } from 'react';
import { ConnectionStatus } from '../types/chat';

interface WebSocketReturn {
  send: (data: any) => void;
  isConnected: boolean;
  connectionStatus: ConnectionStatus;
  onMessage: (callback: (data: any) => void) => void;
  offMessage: (callback: (data: any) => void) => void;
}

let globalWs: WebSocket | null = null;
const messageCallbacks: Set<(data: any) => void> = new Set();
let reconnectTimeout: NodeJS.Timeout | null = null;
let reconnectAttempts = 0;
let globalConnectionStatus: ConnectionStatus = { status: 'disconnected' as const };
const statusListeners: Set<(status: ConnectionStatus) => void> = new Set();

const notifyStatusChange = (status: ConnectionStatus) => {
  globalConnectionStatus = status;
  statusListeners.forEach(listener => listener(status));
};

export function useWebSocket(): WebSocketReturn {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(globalConnectionStatus);

  const reconnect = useCallback(() => {
    if (globalWs) {
      globalWs.close();
    }

    notifyStatusChange({ status: 'connecting' });

    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/ws`;

      globalWs = new WebSocket(wsUrl);

      globalWs.onopen = () => {
        console.log('WebSocket connected');
        notifyStatusChange({ status: 'connected' });
        reconnectAttempts = 0;
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
          reconnectTimeout = null;
        }
      };

      globalWs.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          messageCallbacks.forEach(callback => callback(data));
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      globalWs.onerror = (event) => {
        console.error('WebSocket error:', event);
        notifyStatusChange({
          status: 'error',
          error: 'Connection error',
        });
      };

      globalWs.onclose = () => {
        console.log('WebSocket disconnected');
        notifyStatusChange({ status: 'disconnected' });

        if (reconnectAttempts < 10) {
          const backoffTime = Math.min(1000 * Math.pow(2, reconnectAttempts), 10000);
          reconnectAttempts++;
          console.log(`Reconnecting in ${backoffTime}ms (attempt ${reconnectAttempts})`);
          reconnectTimeout = setTimeout(reconnect, backoffTime);
        }
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      notifyStatusChange({
        status: 'error',
        error: 'Failed to connect',
      });
    }
  }, []);

  useEffect(() => {
    if (!globalWs) {
      reconnect();
    }

    const statusListener = (status: ConnectionStatus) => {
      setConnectionStatus(status);
    };

    statusListeners.add(statusListener);

    return () => {
      statusListeners.delete(statusListener);
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [reconnect]);

  const send = useCallback((data: any) => {
    if (globalWs && globalWs.readyState === WebSocket.OPEN) {
      globalWs.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);

  const onMessage = useCallback((callback: (data: any) => void) => {
    messageCallbacks.add(callback);
  }, []);

  const offMessage = useCallback((callback: (data: any) => void) => {
    messageCallbacks.delete(callback);
  }, []);

  return {
    send,
    isConnected: connectionStatus.status === 'connected',
    connectionStatus,
    onMessage,
    offMessage,
  };
}
