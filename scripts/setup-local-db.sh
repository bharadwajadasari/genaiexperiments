#!/bin/bash

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install it first."
    echo "On macOS, you can use: brew install postgresql@14"
    exit 1
fi

# Check if PostgreSQL service is running
if ! pg_isready &> /dev/null; then
    echo "PostgreSQL service is not running. Starting it..."
    brew services start postgresql@14
    sleep 2
fi

# Create database and user if they don't exist
echo "Setting up database and user..."
psql postgres -c "CREATE USER planning_user WITH PASSWORD 'planning_password';" || true
createdb planning_db || true
psql planning_db -c "GRANT ALL PRIVILEGES ON DATABASE planning_db TO planning_user;" || true

# Run schema and seed files
echo "Running schema and seed files..."
psql -d planning_db -U planning_user -f src/db/schema.sql
psql -d planning_db -U planning_user -f src/db/seed.sql

echo "Local database setup complete!"
echo "You can now run the application with: npm run dev:local" 