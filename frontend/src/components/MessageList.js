import React from 'react';
import './MessageList.css';

const MessageList = ({ messages, currentUser, typingUsers, messagesEndRef }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={message.id || index}
          className={`message ${message.sender === currentUser ? 'own-message' : 'other-message'}`}
        >
          {message.type === 'CHAT' ? (
            <>
              <div className="message-header">
                <span className="message-sender">{message.sender}</span>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
              <div className="message-content">{message.content}</div>
            </>
          ) : (
            <div className="system-message">
              <span>{message.content}</span>
            </div>
          )}
        </div>
      ))}
      
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          <span>{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</span>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 