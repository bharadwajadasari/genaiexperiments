import { Pool } from 'pg';

const environments = {
  local: {
    user: import.meta.env.VITE_LOCAL_DB_USER || 'planning_user',
    host: import.meta.env.VITE_LOCAL_DB_HOST || 'localhost',
    database: import.meta.env.VITE_LOCAL_DB_NAME || 'planning_db',
    password: import.meta.env.VITE_LOCAL_DB_PASSWORD || 'planning_password',
    port: import.meta.env.VITE_LOCAL_DB_PORT || 5432,
  },
  remoteIntegration: {
    user: import.meta.env.VITE_INTEGRATION_DB_USER,
    host: import.meta.env.VITE_INTEGRATION_DB_HOST,
    database: import.meta.env.VITE_INTEGRATION_DB_NAME,
    password: import.meta.env.VITE_INTEGRATION_DB_PASSWORD,
    port: import.meta.env.VITE_INTEGRATION_DB_PORT || 5432,
    ssl: {
      rejectUnauthorized: false
    }
  },
  remoteProd: {
    user: import.meta.env.VITE_PROD_DB_USER,
    host: import.meta.env.VITE_PROD_DB_HOST,
    database: import.meta.env.VITE_PROD_DB_NAME,
    password: import.meta.env.VITE_PROD_DB_PASSWORD,
    port: import.meta.env.VITE_PROD_DB_PORT || 5432,
    ssl: {
      rejectUnauthorized: false
    }
  }
};

const environment = import.meta.env.VITE_ENV || 'local';
const config = environments[environment];

if (!config) {
  throw new Error(`Invalid environment: ${environment}`);
}

export const pool = new Pool(config);

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log(`Successfully connected to ${environment} database`);
    release();
  }
}); 