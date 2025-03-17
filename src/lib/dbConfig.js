import { Pool } from 'pg'

const pool = new Pool({
  user: import.meta.env.VITE_AZURE_DB_USER,
  host: import.meta.env.VITE_AZURE_DB_HOST,
  database: import.meta.env.VITE_AZURE_DB_NAME,
  password: import.meta.env.VITE_AZURE_DB_PASSWORD,
  port: import.meta.env.VITE_AZURE_DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
})

export default pool 