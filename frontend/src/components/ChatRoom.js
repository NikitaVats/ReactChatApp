import React, { useState, useEffect, useRef } from 'react';
import './ChatRoom.css';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatRoom = ({ user, stompClient, connected, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe('/topic/public', (message) => {
        const receivedMessage = JSON.parse(message.body);
        
        if (receivedMessage.type === 'CHAT') {
          setMessages(prev => [...prev, receivedMessage]);
        } else if (receivedMessage.type === 'JOIN') {
          setMessages(prev => [...prev, {
            ...receivedMessage,
            content: `${receivedMessage.sender} joined the chat!`
          }]);
        } else if (receivedMessage.type === 'LEAVE') {
          setMessages(prev => [...prev, {
            ...receivedMessage,
            content: `${receivedMessage.sender} left the chat!`
          }]);
        } else if (receivedMessage.type === 'TYPING') {
          if (receivedMessage.content === 'START') {
            setTypingUsers(prev => 
              prev.includes(receivedMessage.sender) 
                ? prev 
                : [...prev, receivedMessage.sender]
            );
          } else if (receivedMessage.content === 'STOP') {
            setTypingUsers(prev => 
              prev.filter(username => username !== receivedMessage.sender)
            );
          }
        }
      });
    }
  }, [stompClient]);

  const sendMessage = (content) => {
    if (stompClient && content.trim()) {
      const chatMessage = {
        sender: user,
        content: content.trim(),
        type: 'CHAT'
      };
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage)
      });
    }
  };

  const sendTypingStatus = (isTyping) => {
    if (stompClient) {
      const typingMessage = {
        sender: user,
        content: isTyping ? 'START' : 'STOP',
        type: 'TYPING'
      };
      stompClient.publish({
        destination: "/app/chat.typing",
        body: JSON.stringify(typingMessage)
      });
    }
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <div className="user-info">
          <span className="username">{user}</span>
          <span className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
            {connected ? '●' : '○'}
          </span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>
      
      <MessageList 
        messages={messages} 
        currentUser={user}
        typingUsers={typingUsers}
        messagesEndRef={messagesEndRef}
      />
      
      <MessageInput 
        onSendMessage={sendMessage}
        onTypingStatus={sendTypingStatus}
        disabled={!connected}
      />
    </div>
  );
};

export default ChatRoom; 