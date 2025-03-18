import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function setupDatabase() {
  try {
    // Run the schema setup
    await execAsync('psql -d planning_db -f src/db/schema.sql');
    console.log('Schema created successfully');

    // Run the projects reset
    await execAsync('psql -d planning_db -f src/db/reset_projects.sql');
    console.log('Projects table reset successfully');

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 