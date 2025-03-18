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

async function setupDatabase() {
  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema
    await pool.query(schema);
    console.log('Database schema created successfully');

    // Close the pool
    await pool.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 