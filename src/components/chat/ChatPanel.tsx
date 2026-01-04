import { ChatPanelProps } from '../../types/chat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

export default function ChatPanel({ title, messages, onSendMessage, onClearMessages, isLeft = false }: ChatPanelProps) {
  return (
    <div className="flex flex-col h-full bg-gray-900">
      <ChatHeader
        title={title}
        messageCount={messages.length}
        onClear={onClearMessages}
      />
      <MessageList messages={messages} isOwnPanel={isLeft} />
      <ChatInput onSend={onSendMessage} />
    </div>
  );
}
