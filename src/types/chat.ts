export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: number;
}

export interface ChatPanelProps {
  title: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onClearMessages?: () => void;
  isLeft?: boolean;
}
