'use client';

import { useChatContext } from '@/context/chat-context';
import { useEffect, useRef } from 'react';
import { marked } from 'marked';
import CodeBlock from '../layout/code-block';
import PromptGrid from '@/components/layout/prompt-grid';

const parseMessage = (content: string) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index)
      });
    }

    // Add code block
    parts.push({
      type: 'code',
      language: match[1] || '',
      content: match[2].trim()
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex)
    });
  }

  return parts;
};

export default function ChatMessages() {
  const { chats, activeChat, isLoading, addMessage } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(chat => chat.id === activeChat);
  const messages = currentChat?.messages || [];

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);


  const handlePromptSelect = async (prompt: string) => {
    const message = prompt;
    await addMessage(message, 'user');
  };

  // Show prompts if no active chat or no messages
  if (!activeChat || !currentChat || messages.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          {!activeChat || !currentChat ? (
            <PromptGrid onPromptSelect={(prompt: string) => handlePromptSelect(prompt)} />
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Start a New Chat</h2>
              <PromptGrid onPromptSelect={(prompt: string) => handlePromptSelect(prompt)} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-message ${
            message.role === 'user' ? 'user-message' : 'ai-message'
          }`}
        >
          {message.role === 'user' ? (
            message.content
          ) : (
            parseMessage(message.content).map((part, index) => (
              part.type === 'code' ? (
                <CodeBlock 
                  key={index}
                  code={part.content}
                  language={part.language}
                />
              ) : (
                <div 
                  key={index}
                  dangerouslySetInnerHTML={{ 
                    __html: marked(part.content, {
                      breaks: false,
                      gfm: false
                    }) 
                  }} 
                />
              )
            ))
          )}
        </div>
      ))}
      {isLoading && (
        <div className="chat-message ai-message">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}