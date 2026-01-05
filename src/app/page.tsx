'use client'

// import { usePersistedMessages } from '@/hooks/usePersistedMessages';
import ChatPanel from '../components/chat/ChatPanel';
import TwoPanelLayout from '../components/layout/TwoPanelLayout';
import { useChatWithWebSocket } from '@/hooks/useChatWithWebSocket';
// import { useChatWithWebSocket } from '../hooks/useChatWithWebSocket';

export default function Home() {
  const leftChat = useChatWithWebSocket('left');
  const rightChat = useChatWithWebSocket('right');

  return (
    <div className="bg-black">
      <TwoPanelLayout
        left={
          <ChatPanel
            title="Chat Panel 1"
            messages={leftChat.messages}
            onSendMessage={leftChat.addMessage}
            onClearMessages={leftChat.clearMessages}
            panelIdentity="left"
            connectionStatus={leftChat.connectionStatus}
          />
        }
        right={
          <ChatPanel
            title="Chat Panel 2"
            messages={rightChat.messages}
            onSendMessage={rightChat.addMessage}
            onClearMessages={rightChat.clearMessages}
            panelIdentity="right"
            connectionStatus={rightChat.connectionStatus}
          />
        }
      />
    </div>
  );
}
