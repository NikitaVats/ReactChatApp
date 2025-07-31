# WebSocket Chat Application Setup Guide

This guide will help you set up and run the WebSocket-based chat application with React.js frontend and Spring Boot backend.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Java 17** or higher - [Download here](https://adoptium.net/)
- **Maven** (optional, as we use Maven wrapper)

## Quick Start

### Option 1: Using the provided scripts (Recommended)

1. **Start the Backend:**
   ```bash
   ./start-backend.sh
   ```
   The Spring Boot application will start on `http://localhost:8080`

2. **Start the Frontend (in a new terminal):**
   ```bash
   ./start-frontend.sh
   ```
   The React application will start on `http://localhost:3000`

### Option 2: Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter a username to join the chat
3. Start sending messages in real-time!

## Features

- **Real-time messaging** using WebSocket technology
- **User join/leave notifications**
- **Typing indicators** - see when other users are typing
- **Responsive design** - works on desktop and mobile
- **Modern UI** with gradient backgrounds and smooth animations
- **Connection status indicator** - shows if you're connected to the server

## Architecture

### Backend (Spring Boot)
- **WebSocket Configuration**: Handles WebSocket connections and message routing
- **Chat Controller**: Processes chat messages and user events
- **Security Configuration**: Allows WebSocket connections and disables CSRF
- **Message Model**: Defines the structure of chat messages

### Frontend (React.js)
- **App Component**: Main application logic and WebSocket connection management
- **LoginForm**: User authentication interface
- **ChatRoom**: Main chat interface with message display
- **MessageList**: Displays messages with proper styling
- **MessageInput**: Handles message input and typing indicators

## WebSocket Endpoints

- **Connection**: `ws://localhost:8080/ws`
- **Send Message**: `/app/chat.sendMessage`
- **Add User**: `/app/chat.addUser`
- **Typing Status**: `/app/chat.typing`
- **Public Topic**: `/topic/public`

## Troubleshooting

### Backend Issues
- Make sure Java 17+ is installed and `JAVA_HOME` is set correctly
- Check if port 8080 is available
- Verify Maven dependencies are downloaded

### Frontend Issues
- Make sure Node.js is installed
- Clear npm cache if needed: `npm cache clean --force`
- Check if port 3000 is available

### WebSocket Connection Issues
- Ensure the backend is running before starting the frontend
- Check browser console for connection errors
- Verify CORS settings if accessing from different domains

## Development

### Adding New Features
1. **Backend**: Add new message types in `ChatMessage.java` and handlers in `ChatController.java`
2. **Frontend**: Update React components to handle new message types

### Styling
- CSS files are organized by component
- Uses modern CSS features like flexbox and gradients
- Responsive design with mobile-first approach

## Production Deployment

### Backend
```bash
cd backend
./mvnw clean package
java -jar target/websocket-chat-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a web server
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License. 