'use client'

import { useEffect, useRef } from 'react';
import { Message } from '../../types/chat';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  isOwnPanel: boolean;
}

export default function MessageList({ messages, isOwnPanel }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 bg-gray-950"
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-600">
          <p>No messages yet</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.sender === 'user' && isOwnPanel}
          />
        ))
      )}
    </div>
  );
}
