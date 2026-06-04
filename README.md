# CollabCode Studio

A real-time collaborative code editor that enables multiple developers to write, execute, and debug code together in a shared workspace. Built with modern web technologies for seamless pair programming and team collaboration.

- [Click Here For Video Demonstration](https://drive.google.com/file/d/10PBOz3QXzaTEQccTg5rg_wB4QpNit73x/view?usp=drive_link)
  

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality

- **Real-time Collaborative Editing** - Multiple users can simultaneously edit files with live synchronization
- **Live Cursor Tracking** - See collaborators' cursor positions with color-coded tooltips showing their names
- **File System Management** - Create, rename, delete files and folders with instant sync across all users
- **Multi-Language Support** - Execute code in 40+ programming languages with syntax highlighting
- **Integrated Code Execution** - Run code directly in the browser and view output in real-time
- **Collaborative Whiteboard** - Built-in drawing board for visual explanations and diagrams using Tldraw
- **Real-time Chat** - Communicate with team members through integrated messaging
- **AI Code Assistant** - Generate code snippets and get programming help using AI (Mistral LLM)
- **Firebase Authentication** - Secure login with Google and email/password
- **Room Persistence** - Users, rooms, and session metadata stored in Firebase Realtime Database
- **Per-File Locks** - Lock individual files so only the locker can edit
- **Editor Settings Panel** - Customize font size, tab size, word wrap, minimap, and line numbers

### Additional Features

- **User Presence Awareness** - See who's online and track their activity status
- **Typing Indicators** - Know when collaborators are actively typing
- **Auto Language Detection** - Automatically detects programming language from file extensions
- **Download Workspace** - Export entire workspace as a ZIP file
- **Responsive Design** - Optimized for desktop and tablet devices
- **Custom File Icons** - Visual file type indicators using VS Code icon set
- **Lazy File Loading** - File contents load on demand to reduce UI lag
- **Upload Performance Optimizations** - Chunked directory reads prevent UI freezes

## Technology Stack

### Frontend

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| React 18         | UI framework with hooks and context API |
| TypeScript       | Type-safe development                   |
| CodeMirror 6     | Advanced code editor with extensions    |
| Socket.IO Client | Real-time bidirectional communication   |
| Tldraw           | Collaborative whiteboard functionality  |
| Tailwind CSS     | Utility-first styling framework         |
| Vite             | Fast build tool and development server  |
| Axios            | HTTP client for API requests            |
| Firebase Auth    | Google + email/password authentication  |
| Firebase RTDB    | User/room/session persistence           |

**Key Libraries:**

- `@uiw/react-codemirror` - CodeMirror React wrapper
- `@replit/codemirror-minimap` - Code editor minimap
- `react-router-dom` - Client-side routing
- `react-hot-toast` - Toast notifications
- `vscode-icons-js` - File type icons
- `react-split` - Resizable split panes

### Backend

| Technology | Purpose                               |
| ---------- | ------------------------------------- |
| Node.js    | JavaScript runtime environment        |
| Express    | Web application framework             |
| Socket.IO  | WebSocket server for real-time events |
| TypeScript | Type-safe backend development         |
| CORS       | Cross-origin resource sharing         |
| Firebase Admin | Server-side token verification   |

### External APIs

- **Piston API** - Sandboxed code execution engine supporting 40+ languages
- **Pollinations AI** - Mistral-based code generation and assistance

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 16.x or higher)
- npm (version 7.x or higher) or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/divyanshuchander/CollabCode-MajorProject.git
cd CollabCode-MajorProject
```

2. **Install client dependencies**

```bash
cd src/client
npm install
```

3. **Install server dependencies**

```bash
cd ../server
npm install

4. **Configure environment variables**

**Client** (`src/client/.env`):

```bash
VITE_BACKEND_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_DATABASE_URL=...
```

**Server** (`src/server/.env`):

```bash
PORT=3000
FIREBASE_DATABASE_URL=...
FIREBASE_SERVICE_ACCOUNT_PATH=
```

Place your Firebase Admin service account JSON at:

```
src/server/firebase_creds.json
```

> The service account key must never be stored in the client.
```

### Running the Application

You need to run both the client and server concurrently.

**Terminal 1 - Start the backend server:**

```bash
cd src/server
npm run dev
```

The server will start on `http://localhost:3000`

**Terminal 2 - Start the frontend development server:**

```bash
cd src/client
npm run dev
```

The client will start on `http://localhost:5173`

### Building for Production

**Build the client:**

```bash
cd src/client
npm run build
```

**Build the server:**

```bash
cd src/server
npm run build
npm start
```

## Usage

### Creating a New Room

1. Open the application at `http://localhost:5173`
2. Sign in with Google or email/password
3. Enter your display name
4. Click **"Create Room"**
5. Share the room ID with collaborators

### Joining an Existing Room

1. Open the application
2. Sign in
3. Enter the room ID shared by your collaborator
4. Click **"Join Room"**

### Locking a File

1. Open a file in the editor
2. Click **"Lock file"** in the editor header
3. Other users can view but cannot edit until you unlock

### Editor Settings

1. Open the **Settings** view from the sidebar
2. Adjust font size, tab size, word wrap, minimap, and line numbers
3. Settings are saved locally in the browser

### Working with Files

- **Create File/Folder**: Click the "New File" or "New Folder" button in the Files panel
- **Rename**: Right-click on a file/folder and select "Rename"
- **Delete**: Right-click on a file/folder and select "Delete"
- **Open File**: Click on any file to open it in the editor
- **Auto-save**: All changes are automatically synchronized in real-time
- **Lock-aware operations**: File operations are blocked if a file is locked by another user

### Running Code

1. Select a file or create a new one with appropriate extension (e.g., `.py`, `.js`, `.cpp`)
2. Write or paste your code
3. Click the **Run** icon in the sidebar
4. View execution results in the output panel
5. Supports input/output for interactive programs

### Using the Whiteboard

1. Click the **Drawing** icon in the sidebar
2. Use tools to draw, add shapes, or write text
3. All drawing actions sync in real-time across users
4. Toggle back to code editor view anytime

### AI Code Generation

1. Click the **Copilot** icon in the sidebar
2. Type your code request in natural language
3. AI will generate code suggestions
4. Insert generated code into your editor

### Chat with Team

1. Click the **Chat** icon in the sidebar
2. Type messages to communicate with team members
3. See message history and timestamps
4. Get notifications for new messages

## Project Structure

```
CollabCode-MajorProject/
├── src/
│   ├── client/                    # Frontend React application
│   │   ├── public/                # Static assets
│   │   ├── src/
│   │   │   ├── api/              # API integration (Piston, Pollinations)
│   │   │   ├── components/       # Reusable React components
│   │   │   │   ├── editor/       # Code editor components
│   │   │   │   ├── files/        # File tree components
│   │   │   │   ├── sidebar/      # Sidebar navigation
│   │   │   │   ├── sidebar/sidebar-views/SettingsView.tsx
│   │   │   │   ├── chats/        # Chat interface
│   │   │   │   ├── drawing/      # Whiteboard component
│   │   │   │   └── workspace/    # Main workspace layout
│   │   │   ├── context/          # React Context providers
│   │   │   │   ├── AppContext.tsx          # Global app state
│   │   │   │   ├── FileContext.tsx         # File system state
│   │   │   │   ├── SocketContext.tsx       # WebSocket connections
│   │   │   │   ├── SettingsContext.tsx     # Editor settings
│   │   │   │   ├── ChatContext.tsx         # Chat messaging
│   │   │   │   ├── CopilotContext.tsx      # AI code generation
│   │   │   │   └── RunCodeContext.tsx      # Code execution
│   │   │   ├── lib/              # Firebase client setup
│   │   │   ├── services/         # Firebase RTDB helpers
│   │   │   ├── hooks/            # Custom React hooks
│   │   │   ├── pages/            # Page components (Landing, Auth, Home, Editor)
│   │   │   ├── types/            # TypeScript type definitions
│   │   │   ├── utils/            # Utility functions
│   │   │   └── styles/           # Global CSS styles
│   │   ├── package.json
│   │   └── vite.config.mts       # Vite configuration
│   │
│   └── server/                    # Backend Node.js application
│       ├── src/
│       │   ├── server.ts          # Main server file with Socket.IO handlers
│       │   ├── firebaseAdmin.ts   # Firebase Admin initialization
│       │   └── types/             # TypeScript type definitions
│       ├── package.json
│       └── tsconfig.json
│
├── README.md
└── .gitignore
```

## Architecture

### System Overview

CollabCode Studio follows a client-server architecture with real-time communication:

```
┌─────────────┐         WebSocket (Socket.IO)        ┌─────────────┐
│   Client A  │ ←──────────────────────────────────→ │             │
├─────────────┤                                       │   Node.js   │
│   Client B  │ ←──────────────────────────────────→ │   Server    │
├─────────────┤                                       │             │
│   Client C  │ ←──────────────────────────────────→ │  (Express + │
└─────────────┘                                       │  Socket.IO) │
                                                      └─────────────┘
                                                            ↓
                                                      ┌─────────────┐
                                                      │  External   │
                                                      │    APIs     │
                                                      │  (Piston,   │
                                                      │ Pollinations)│
                                                      └─────────────┘
```

### Frontend Architecture

The React application uses **Context API** for state management with multiple specialized contexts:

- **FileContext**: Manages file tree structure, CRUD operations, and file synchronization
- **SocketContext**: Handles WebSocket connection lifecycle and event listeners
- **AppContext**: Manages global app state (users, active file, drawing mode)
- **SettingsContext**: Stores editor preferences (font size, tab size, minimap, etc.)
- **ChatContext**: Controls chat messages and notifications
- **CopilotContext**: Integrates AI code generation
- **RunCodeContext**: Handles code execution and output display
- **ViewContext**: Controls sidebar view navigation

### Backend Architecture

The Node.js server handles:

1. **Room Management**: Creating and joining collaborative rooms
2. **File Synchronization**: Broadcasting file operations to all room members
3. **User Management**: Tracking connected users and their states
4. **Event Broadcasting**: Real-time event distribution via Socket.IO
5. **Auth Verification**: Firebase Admin token validation

### Firebase Integration

- **Auth**: Google + email/password sign-in on the client
- **RTDB**: Store users, rooms, and session membership
- **Admin**: Server verifies Firebase ID tokens for Socket.IO access

### Key Socket Events

| Event            | Direction                 | Purpose                        |
| ---------------- | ------------------------- | ------------------------------ |
| `JOIN_REQUEST`   | Client → Server           | User requests to join a room   |
| `USER_JOINED`    | Server → Clients          | Notify all users of new member |
| `FILE_CREATED`   | Client → Server → Clients | Sync new file creation         |
| `FILE_UPDATED`   | Client → Server → Clients | Sync file content changes      |
| `FILE_DELETED`   | Client → Server → Clients | Sync file deletion             |
| `TYPING_START`   | Client → Server → Clients | Show typing indicator          |
| `FILE_LOCK`      | Client → Server → Clients | Lock an individual file        |
| `FILE_UNLOCK`    | Client → Server → Clients | Unlock an individual file      |
| `FILE_LOCK_STATUS` | Server → Clients        | Lock state updates             |
| `DRAWING_UPDATE` | Client → Server → Clients | Sync whiteboard changes        |
| `SEND_MESSAGE`   | Client → Server → Clients | Broadcast chat messages        |

### Custom CodeMirror Extension

**Cursor Tooltip Extension** (`tooltip.ts`):

- Custom StateField tracking remote user cursors
- Real-time cursor position synchronization
- Color-coded tooltips with usernames
- Efficient DOM updates using CodeMirror's view plugin system

## Implementation Highlights

### Real-time File Synchronization

When a user modifies a file:

1. Local state updates immediately (optimistic UI)
2. Change emitted via Socket.IO to server
3. Server broadcasts to all room members
4. Other clients update their local file tree
5. Active editors refresh to show new content

### Collaborative Cursor Tracking

Each user's cursor position is tracked and displayed:

1. CodeMirror selection changes trigger events
2. Cursor position sent to server with user metadata
3. Server broadcasts to other room members
4. Custom extension renders colored tooltips at remote cursor positions

### Code Execution Flow

1. User clicks "Run" button
2. Current file content and language sent to Piston API
3. API executes code in sandboxed container
4. Output streamed back and displayed in results panel
5. Supports stdin/stdout for interactive programs

## Acknowledgments

- **CodeMirror** - Powerful and extensible code editor component
- **Socket.IO** - Real-time bidirectional event-based communication
- **Piston** - Code execution engine with multi-language support
- **Tldraw** - Infinite canvas for collaborative drawing
- **Pollinations AI** - AI-powered code generation


---

