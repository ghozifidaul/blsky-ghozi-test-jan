import { ChatPanelProps } from '../../types/chat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useEffect, useRef, useState } from 'react';

export default function ChatPanel({ title, messages, onSendMessage, onClearMessages, panelIdentity, connectionStatus }: ChatPanelProps) {
  const [flashKey, setFlashKey] = useState(0);
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender !== panelIdentity) {
        setFlashKey(prev => prev + 1);
      }
      prevMessagesLength.current = messages.length;
    }
  }, [messages, panelIdentity]);

  return (
    <div key={flashKey} className="flex flex-col h-full bg-gray-900 border-2 border-transparent flash-animation">
      <ChatHeader
        title={title}
        messageCount={messages.length}
        onClear={onClearMessages}
        connectionStatus={connectionStatus}
      />
      <MessageList messages={messages} panelIdentity={panelIdentity} />
      <ChatInput onSend={onSendMessage} />
    </div>
  );
}
