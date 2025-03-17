# Planning Dashboard Database

This directory contains the database setup and management files for the Planning Dashboard application.

## Database Setup

### Prerequisites
- PostgreSQL 14 or higher
- macOS (for local development)

### Local Development Setup

1. Install PostgreSQL:
```bash
brew install postgresql@14
```

2. Start PostgreSQL service:
```bash
brew services start postgresql@14
```

3. Create database and user:
```bash
createdb planning_db
psql planning_db -c "CREATE USER planning_user WITH PASSWORD 'planning_password'; GRANT ALL PRIVILEGES ON DATABASE planning_db TO planning_user;"
```

4. Set up environment variables in `.env`:
```env
VITE_AZURE_DB_USER=planning_user
VITE_AZURE_DB_HOST=localhost
VITE_AZURE_DB_NAME=planning_db
VITE_AZURE_DB_PASSWORD=planning_password
VITE_AZURE_DB_PORT=5432
```

### Database Schema

The database consists of two main tables:

#### Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    team VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    progress INTEGER DEFAULT 0,
    blockers TEXT,
    path_to_green TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Highlights Table
```sql
CREATE TABLE highlights (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    impact VARCHAR(50) NOT NULL,
    resolution TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Database Management

#### Initialize Database
To create tables and indexes:
```bash
psql -d planning_db -U planning_user -f schema.sql
```

#### Seed Sample Data
To populate the database with sample data:
```bash
psql -d planning_db -U planning_user -f seed.sql
```

#### Useful Commands

1. Connect to database:
```bash
psql -d planning_db -U planning_user
```

2. View all projects:
```bash
psql -d planning_db -U planning_user -c "SELECT * FROM projects;"
```

3. View all highlights:
```bash
psql -d planning_db -U planning_user -c "SELECT * FROM highlights;"
```

4. Reset database (drop and recreate):
```bash
dropdb planning_db
createdb planning_db
psql -d planning_db -U planning_user -f schema.sql
psql -d planning_db -U planning_user -f seed.sql
```

### Database Service

The database operations are handled by the `planningService` in `src/services/planningService.js`. This service provides methods for:

- Fetching projects and highlights
- Adding new projects and highlights
- Updating existing records
- Deleting records
- Calculating metrics

### Database Backup and Recovery

#### Creating Backups

1. Full Database Backup:
```bash
pg_dump -d planning_db -U planning_user > planning_db_backup.sql
```

2. Compressed Backup:
```bash
pg_dump -d planning_db -U planning_user | gzip > planning_db_backup.sql.gz
```

3. Custom Format Backup (recommended for large databases):
```bash
pg_dump -d planning_db -U planning_user -Fc > planning_db_backup.dump
```

#### Restoring from Backups

1. From SQL File:
```bash
psql -d planning_db -U planning_user < planning_db_backup.sql
```

2. From Compressed Backup:
```bash
gunzip -c planning_db_backup.sql.gz | psql -d planning_db -U planning_user
```

3. From Custom Format:
```bash
pg_restore -d planning_db -U planning_user planning_db_backup.dump
```

#### Automated Backup Script
Create a backup script (`backup.sh`):
```bash
#!/bin/bash
BACKUP_DIR="/path/to/backups"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -d planning_db -U planning_user -Fc > "$BACKUP_DIR/planning_db_$DATE.dump"
# Keep only last 7 days of backups
find $BACKUP_DIR -name "planning_db_*.dump" -mtime +7 -delete
```

### Migration to Azure

When ready to migrate to Azure PostgreSQL:

1. Create an Azure Database for PostgreSQL instance
2. Update the `.env` file with Azure credentials
3. Run the schema and seed files against the Azure database
4. Test the connection and data operations

### Troubleshooting

#### Connection Issues

1. Service Status:
```bash
# Check service status
brew services list

# Restart service if needed
brew services restart postgresql@14
```

2. Connection Testing:
```bash
# Test connection
psql -h localhost -U planning_user -d planning_db

# Check connection parameters
psql -h localhost -U planning_user -d planning_db -c "\conninfo"
```

3. Permission Issues:
```bash
# Check user permissions
psql -d planning_db -U planning_user -c "\du"

# Grant additional permissions if needed
psql -d planning_db -U planning_user -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO planning_user;"
```

#### Data Issues

1. Table Structure:
```bash
# List all tables
\dt

# Describe table structure
\d projects
\d highlights

# Check constraints
\d+ projects
\d+ highlights
```

2. Data Integrity:
```bash
# Check for NULL values
SELECT * FROM projects WHERE project_name IS NULL;

# Check for invalid dates
SELECT * FROM projects WHERE end_date < start_date;

# Check for invalid status values
SELECT DISTINCT status FROM projects;
```

3. Data Recovery:
```bash
# Create a backup before fixing issues
pg_dump -d planning_db -U planning_user > before_fix.sql

# Fix data issues
UPDATE projects SET status = 'Planned' WHERE status = 'Invalid';

# Verify fixes
SELECT * FROM projects WHERE status = 'Invalid';
```

#### Performance Issues

1. Index Management:
```bash
# List all indexes
\di

# Check index usage
SELECT schemaname, tablename, indexname, idx_scan 
FROM pg_stat_user_indexes 
WHERE tablename = 'projects';
```

2. Query Performance:
```bash
# Analyze query performance
EXPLAIN ANALYZE SELECT * FROM projects WHERE status = 'Planned';

# Check table statistics
ANALYZE projects;
ANALYZE highlights;
```

3. Connection Pool Issues:
```bash
# Check active connections
SELECT * FROM pg_stat_activity WHERE datname = 'planning_db';

# Kill idle connections
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = 'planning_db' 
AND state = 'idle in transaction';
```

#### Common Error Messages and Solutions

1. "connection refused":
   - Check if PostgreSQL service is running
   - Verify port number in .env
   - Check firewall settings

2. "password authentication failed":
   - Verify password in .env
   - Check pg_hba.conf configuration
   - Reset user password if needed

3. "relation does not exist":
   - Run schema.sql again
   - Check table names in queries
   - Verify database name in connection

4. "permission denied":
   - Check user privileges
   - Verify schema permissions
   - Grant necessary permissions 