-- Grant all privileges on the projects table to the database user
GRANT ALL PRIVILEGES ON TABLE projects TO planning_user;

-- Grant usage and select privileges on the sequence
GRANT USAGE, SELECT ON SEQUENCE projects_id_seq TO planning_user;

-- Grant all privileges on the schema to the database user
GRANT ALL PRIVILEGES ON SCHEMA public TO planning_user; 