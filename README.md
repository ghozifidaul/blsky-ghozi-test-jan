# Blsky Chat Demo

A real-time chat application built with Next.js 16 and React 19, featuring dual chat panels with WebSocket communication and local message persistence.

## Features

- **Dual Chat Panels**: Two side-by-side chat interfaces (Chat Panel 1 and Chat Panel 2)
- **Real-time Communication**: WebSocket-powered messaging between panels using `next-ws`
- **Message Persistence**: Messages are stored in localStorage and survive page refreshes
- **Connection Status**: Visual indicators showing WebSocket connection state
- **Visual Feedback**: Panels flash when receiving messages from the other panel
- **Clear Messages**: Option to clear all messages for each panel

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.18
- **WebSocket**: next-ws 2.1.12 with ws 8.18.3

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── app/
│   ├── api/ws/route.ts     # WebSocket API route
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main chat page
├── components/
│   ├── chat/
│   │   ├── ChatHeader.tsx  # Panel header with controls
│   │   ├── ChatInput.tsx   # Message input component
│   │   ├── ChatPanel.tsx   # Main chat panel container
│   │   ├── MessageBubble.tsx  # Individual message display
│   │   └── MessageList.tsx    # Scrollable message list
│   └── layout/
│       └── TwoPanelLayout.tsx  # Side-by-side layout
├── hooks/
│   ├── useChatWithWebSocket.ts  # Chat logic with WebSocket
│   ├── usePersistedMessages.ts  # localStorage persistence
│   └── useWebSocket.ts          # WebSocket connection hook
├── types/
│   └── chat.ts              # TypeScript definitions
└── public/                  # Static assets
```

## Assumptions that I made based on the task description:
1. I'm using local storage instead of a database for storing the messages, as localStorage is a better fit for this task:
  - It's a frontend task, so it makes more sense to focus on front-end functionality rather than using a database that is typically used for backend tasks.
  - The task mentions 'Keep all messages so even when we close the tab and reopen it'. The messages don't need to exist across other devices as well.
