import { WebSocket, WebSocketServer } from 'ws';

interface Message {
  type: string;
  content: string;
  sender: string;
  timestamp: number;
}

const connectedClients = new Set<WebSocket>();

export function UPGRADE(client: WebSocket, server: WebSocketServer) {
  console.log('WebSocket client connected');

  connectedClients.add(client);

  client.on('message', (data: Buffer) => {
    try {
      const message: Message = JSON.parse(data.toString());

      console.log('Received message:', message);

      const response = {
        type: 'message',
        content: message.content,
        sender: message.sender || 'unknown',
        timestamp: Date.now(),
      };

      server.clients.forEach((connectedClient: WebSocket) => {
        if (connectedClient.readyState === WebSocket.OPEN) {
          connectedClient.send(JSON.stringify(response));
        }
      });
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  client.once('close', () => {
    console.log('WebSocket client disconnected');
    connectedClients.delete(client);
  });

  client.once('error', (error: Error) => {
    console.error('WebSocket error:', error);
    connectedClients.delete(client);
  });

  client.send(JSON.stringify({
    type: 'connected',
    message: 'WebSocket connection established',
    timestamp: Date.now(),
  }));
}
