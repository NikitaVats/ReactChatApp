# WebSocket Chat Application

A real-time chat application built with React.js frontend and Spring Boot backend using WebSocket technology.

## Features

- Real-time messaging using WebSocket
- User authentication and session management
- Message history
- Online user list
- Typing indicators
- Responsive design

## Project Structure

```
ReactChatApp/
├── frontend/          # React.js application
├── backend/           # Spring Boot application
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- Java 17 or higher
- Maven

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

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

The frontend will start on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Enter a username to join the chat
3. Start sending messages in real-time!

## Technologies Used

### Backend
- Spring Boot 3.x
- Spring WebSocket
- Spring Security
- Maven

### Frontend
- React.js 18
- WebSocket API
- CSS3 with modern styling
- Responsive design 