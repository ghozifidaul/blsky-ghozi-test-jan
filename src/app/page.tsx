'use client'

import ChatPanel from '../components/chat/ChatPanel';
import TwoPanelLayout from '../components/layout/TwoPanelLayout';
import { usePersistedMessages } from '../hooks/usePersistedMessages';

export default function Home() {
  const leftChat = usePersistedMessages('left');
  const rightChat = usePersistedMessages('right');

  return (
    <div className="bg-black">
      <TwoPanelLayout
        left={
          <ChatPanel
            title="Chat Panel 1"
            messages={leftChat.messages}
            onSendMessage={leftChat.addMessage}
            onClearMessages={leftChat.clearMessages}
            isLeft={true}
          />
        }
        right={
          <ChatPanel
            title="Chat Panel 2"
            messages={rightChat.messages}
            onSendMessage={rightChat.addMessage}
            onClearMessages={rightChat.clearMessages}
            isLeft={false}
          />
        }
      />
    </div>
  );
}
