import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.VITE_AZURE_DB_USER,
  host: process.env.VITE_AZURE_DB_HOST,
  database: process.env.VITE_AZURE_DB_NAME,
  password: process.env.VITE_AZURE_DB_PASSWORD,
  port: process.env.VITE_AZURE_DB_PORT,
});

// Test database connection and log table structure
pool.query('SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1', ['projects'])
  .then(result => {
    console.log('Current projects table structure:', result.rows);
  })
  .catch(error => {
    console.error('Error checking table structure:', error);
  });

// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY stack_rank ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    console.log('Received project data:', req.body);
    const { name, description, start_date, end_date, estimated_weeks, stack_rank, status } = req.body;
    
    // Log the database connection info (without sensitive data)
    console.log('Database connection info:', {
      user: process.env.VITE_AZURE_DB_USER,
      host: process.env.VITE_AZURE_DB_HOST,
      database: process.env.VITE_AZURE_DB_NAME,
      port: process.env.VITE_AZURE_DB_PORT
    });

    const result = await pool.query(
      `INSERT INTO projects (name, description, start_date, end_date, estimated_weeks, stack_rank, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, description, start_date, end_date, estimated_weeks, stack_rank, status]
    );
    console.log('Project created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const { name, description, start_date, end_date, estimated_weeks, stack_rank, status } = req.body;
    const result = await pool.query(
      `UPDATE projects 
       SET name = $1, description = $2, start_date = $3, end_date = $4, 
           estimated_weeks = $5, stack_rank = $6, status = $7
       WHERE id = $8
       RETURNING *`,
      [name, description, start_date, end_date, estimated_weeks, stack_rank, status, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 