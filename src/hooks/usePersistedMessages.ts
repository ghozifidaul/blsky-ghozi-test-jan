'use client'

import { useState, useEffect } from 'react';
import { Message } from '../types/chat';

const STORAGE_KEYS = {
  left: 'chat-panel-left',
  right: 'chat-panel-right',
};

export function usePersistedMessages(panel: 'left' | 'right', initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return initialMessages;

    try {
      const stored = localStorage.getItem(STORAGE_KEYS[panel]);
      return stored ? JSON.parse(stored) : initialMessages;
    } catch {
      return initialMessages;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS[panel], JSON.stringify(messages));
  }, [messages, panel]);

  const addMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: panel,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return { messages, addMessage, clearMessages };
}
