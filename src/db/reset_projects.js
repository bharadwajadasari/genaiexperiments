import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  user: process.env.VITE_AZURE_DB_USER,
  host: process.env.VITE_AZURE_DB_HOST,
  database: process.env.VITE_AZURE_DB_NAME,
  password: process.env.VITE_AZURE_DB_PASSWORD,
  port: process.env.VITE_AZURE_DB_PORT,
});

async function resetProjectsTable() {
  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'reset_projects.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Execute the SQL
    await pool.query(sql);
    console.log('Projects table reset successfully');

    // Close the pool
    await pool.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error resetting projects table:', error);
    process.exit(1);
  }
}

resetProjectsTable(); 