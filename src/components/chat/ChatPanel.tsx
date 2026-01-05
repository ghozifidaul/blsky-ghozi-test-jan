import { ChatPanelProps } from '../../types/chat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

export default function ChatPanel({ title, messages, onSendMessage, onClearMessages, panelIdentity, connectionStatus }: ChatPanelProps) {
  return (
    <div className="flex flex-col h-full bg-gray-900">
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
