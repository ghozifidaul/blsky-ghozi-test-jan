export interface Message {
  type?: string;
  id: string;
  content: string;
  sender: 'left' | 'right';
  timestamp: number;
}

export interface ChatPanelProps {
  title: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onClearMessages?: () => void;
  panelIdentity: 'left' | 'right';
  connectionStatus: ConnectionStatus;
}

export interface ConnectionStatus {
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  error?: string;
}
