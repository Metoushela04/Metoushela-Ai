import React, { useState } from 'react';
import { Message, Conversation, User } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';

const API_KEY = "AIzaSyDSrtttEykprVBleLk9iWXMZZeJCt3bBRk";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useState<User>({
    id: '1',
    isPremium: false,
    prefersDarkMode: false,
    language: 'fr'
  });

  const createNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      messages: [],
      title: 'New Conversation',
      timestamp: new Date()
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversation(newConversation);
  };

  const sendMessage = async (content: string) => {
    if (!currentConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage]
    };

    setCurrentConversation(updatedConversation);
    setConversations(conversations.map(c => 
      c.id === updatedConversation.id ? updatedConversation : c
    ));

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: content
            }]
          }]
        })
      });

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, assistantMessage]
      };

      setCurrentConversation(finalConversation);
      setConversations(conversations.map(c => 
        c.id === finalConversation.id ? finalConversation : c
      ));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        conversations={conversations}
        currentUser={user}
        onNewChat={createNewChat}
        onSelectConversation={(id) => {
          const conversation = conversations.find(c => c.id === id);
          if (conversation) setCurrentConversation(conversation);
        }}
        onToggleTheme={() => {}}
        selectedConversationId={currentConversation?.id}
      />
      
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {currentConversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="p-4 text-center text-gray-500">
                  Metoushela AI is thinking...
                </div>
              )}
            </div>
            <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-700 mb-2">
                Welcome to Metoushela AI
              </h1>
              <p className="text-gray-500 mb-4">
                Start a new conversation to begin chatting with Metoushela AI
              </p>
              <button
                onClick={createNewChat}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Start New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

export default App