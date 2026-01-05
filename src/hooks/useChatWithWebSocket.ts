'use client'

import { useState, useEffect, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { Message, ConnectionStatus } from '../types/chat';

const STORAGE_KEYS = {
  left: 'chat-panel-messages-left',
  right: 'chat-panel-messages-right',
};

interface ChatReturn {
  messages: Message[];
  connectionStatus: ConnectionStatus;
  addMessage: (content: string) => void;
  clearMessages: () => void;
}

export function useChatWithWebSocket(panel: 'left' | 'right'): ChatReturn {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(STORAGE_KEYS[panel]);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const ws = useWebSocket();

  const handleMessage = useCallback((data: Message) => {
    if (data.type !== 'message') {
      return;
    }

    if (!data.id || !data.content || !data.sender || !data.timestamp) {
      console.error('Invalid message format:', data);
      return;
    }

    const receivedMessage: Message = {
      id: data.id,
      content: data.content,
      sender: data.sender,
      timestamp: data.timestamp,
    };

    setMessages(prev => {
      if (prev.some(m => m.id === receivedMessage.id)) {
        return prev;
      }
      return [...prev, receivedMessage];
    });
  }, []);

  useEffect(() => {
    ws.onMessage(handleMessage);

    return () => {
      ws.offMessage(handleMessage);
    };
  }, [ws]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS[panel], JSON.stringify(messages));
  }, [messages, panel]);

  const addMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      content,
      sender: panel,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);

    ws.send(newMessage);
  }, [panel, ws]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEYS[panel]);
  }, [panel]);

  return {
    messages,
    connectionStatus: ws.connectionStatus,
    addMessage,
    clearMessages
  };
}
