# Project Planning Application

A modern web application for managing project planning, team capacity, and resource allocation.

## Features

### Project Management
- Create, view, edit, and delete projects
- Detailed project information including:
  - Project name and description
  - Timeline (start date, end date, duration)
  - Priority (stack rank)
  - Status tracking (planned, in-progress, completed, on-hold)
  - Creation and update timestamps
- Project prioritization with stack ranking
- Status visualization with color-coded badges

### Team Capacity
- View team utilization metrics
- Track individual engineer capacity
- Project distribution visualization
- Capacity adjustment tools

### Planning
- Quarterly planning view
- Project timeline visualization
- Key metrics dashboard
- Quick action buttons for common tasks

## Tech Stack

- Frontend:
  - React 19
  - Vite
  - React Router
  - CSS3 with modern features

- Backend:
  - Node.js
  - Express
  - PostgreSQL
  - RESTful API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd genaiexperiments
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
VITE_AZURE_DB_USER=your_db_user
VITE_AZURE_DB_HOST=your_db_host
VITE_AZURE_DB_NAME=your_db_name
VITE_AZURE_DB_PASSWORD=your_db_password
VITE_AZURE_DB_PORT=your_db_port
```

4. Set up the database:
```bash
npm run db:setup-full
```

### Running the Application

1. Start both frontend and backend servers:
```bash
npm run dev:all
```

This will start:
- Frontend server on http://localhost:5173 (or next available port)
- Backend server on http://localhost:3000

2. Access the application in your browser at http://localhost:5173

## Available Scripts

- `npm run dev:local` - Start frontend development server
- `npm run dev:all` - Start both frontend and backend servers
- `npm run db:setup-full` - Set up the database schema and tables
- `npm run db:reset-projects` - Reset the projects table
- `npm run build` - Build the application for production
- `npm run test` - Run tests
- `npm run lint` - Run linting

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API and service functions
├── context/       # React context providers
├── db/           # Database setup and migrations
└── App.jsx       # Main application component
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.
