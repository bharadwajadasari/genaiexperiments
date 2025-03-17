# Taskify - Project Planning and Tracking Application

A React-based web application for efficient project planning, task management, team collaboration, and progress tracking.

> **Note**: This project uses a development branch workflow. All new features and changes are developed in the `development` branch before being merged to `main`.

## Features

- **Project Management**: Create and manage projects with stack ranking and duration tracking
- **Team Capacity Management**: Track and adjust engineer utilization and team capacity
- **Quarter Planning**: Plan and organize your quarterly objectives and milestones
- **Task Management**: Create, assign, and track tasks efficiently
- **Team Collaboration**: Work together seamlessly with your team
- **Progress Tracking**: Monitor project progress in real-time

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd taskify
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Open the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - The application should now be running locally

## Project Structure

```
taskify/
├── src/
│   ├── context/           # Context providers
│   │   └── EngineerContext.jsx
│   ├── pages/            # Page components
│   │   ├── AddProject.jsx
│   │   ├── AdjustCapacity.jsx
│   │   ├── Planning.jsx
│   │   ├── Projects.jsx
│   │   └── TeamCapacity.jsx
│   ├── components/       # Reusable components
│   │   └── TaskifyIcon.jsx
│   ├── App.jsx          # Main application component
│   ├── App.css          # Global styles
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── package.json        # Project dependencies and scripts
└── vite.config.js      # Vite configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Technologies Used

- React.js
- React Router DOM
- Vite
- CSS3
- Context API for state management

## Features in Detail

### Project Management
- Create new projects with detailed information
- Stack rank projects for priority management
- Track project duration in weeks
- Monitor project status (planned, in-progress, completed, on-hold)
- View all projects in a grid layout with sorting by priority

### Team Capacity Management
- Track engineer utilization rates
- Adjust individual engineer capacity
- View overall team capacity
- Monitor team workload distribution
- Real-time updates of capacity changes

## Development Guidelines

1. **Code Style**
   - Follow the existing code structure
   - Use functional components with hooks
   - Keep components modular and reusable
   - Utilize Context API for shared state management

2. **Adding New Features**
   - Create new components in the appropriate directories
   - Update routing in `App.jsx` if adding new pages
   - Maintain consistent styling using the existing CSS classes
   - Add new context providers if needed for state management

3. **Git Workflow**
   - Create feature branches for new development
   - Use meaningful commit messages
   - Keep commits focused and atomic

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.
