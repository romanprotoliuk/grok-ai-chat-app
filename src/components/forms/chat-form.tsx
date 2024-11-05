'use client';

import { useState, FormEvent, useCallback } from 'react';
import { useChatContext } from '@/context/chat-context';

export default function ChatForm() {
  const [message, setMessage] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');
  const { addMessage, isLoading, activeChat, chats } = useChatContext();

  // Get current chat to check if it exists and has messages
  const currentChat = chats.find(chat => chat.id === activeChat);


  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
  
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !activeChat || !currentChat) return;
    
    console.log('Submitting message for chat:', {
      chatId: activeChat,
      messageCount: currentChat.messages.length
    });
    
    await addMessage(message.trim(), 'user');
    
    setMessage('');
    setTextareaHeight('auto');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-form-container">
      <form className="chat-form" onSubmit={handleSubmit}>
        <textarea 
          className="chat-input"
          placeholder={activeChat ? "Type your message..." : "Select a chat to start messaging"}
          rows={1}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={isLoading || !activeChat}
          style={{ height: textareaHeight }}
        />
        <button 
          type="submit" 
          className="submit-button"
          disabled={!message.trim() || isLoading || !activeChat}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}