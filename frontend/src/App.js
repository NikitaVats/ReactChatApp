import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './App.css';
import ChatRoom from './components/ChatRoom';
import LoginForm from './components/LoginForm';

function App() {
  const [stompClient, setStompClient] = useState(null);
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (user) {
      connectWebSocket();
    }
  }, [user]);

  const connectWebSocket = () => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setConnected(true);
      setStompClient(client);
      
      // Subscribe to public chat
      client.subscribe('/topic/public', (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log('Received message:', receivedMessage);
      });
      
      // Send join message
      client.publish({
        destination: "/app/chat.addUser",
        body: JSON.stringify({
          sender: user,
          type: 'JOIN'
        })
      });
    };

    client.onStompError = (frame) => {
      console.error('WebSocket connection error:', frame);
      setConnected(false);
    };

    client.activate();
  };

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/chat.addUser",
        body: JSON.stringify({
          sender: user,
          type: 'LEAVE'
        })
      });
      stompClient.deactivate();
    }
    setUser(null);
    setConnected(false);
    setStompClient(null);
  };

  return (
    <div className="App">
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <ChatRoom 
          user={user} 
          stompClient={stompClient} 
          connected={connected}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App; 