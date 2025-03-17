-- Insert sample projects
INSERT INTO projects (project_name, status, priority, team, start_date, end_date, progress, blockers, path_to_green)
VALUES 
  ('Q2 Platform Upgrade', 'Planned', 'High', 'Platform Team', '2024-04-01', '2024-06-30', 0, 'None', 'On track'),
  ('Customer Analytics Dashboard', 'Prioritized', 'High', 'Analytics Team', '2024-04-15', '2024-07-15', 0, 'Resource allocation pending', 'Need to assign dedicated team'),
  ('Mobile App Redesign', 'Pending Planning', 'Medium', 'Mobile Team', '2024-05-01', '2024-08-01', 0, 'Design assets not ready', 'Awaiting design approval'),
  ('API Security Enhancement', 'Planned', 'High', 'Security Team', '2024-04-10', '2024-06-10', 0, 'None', 'On track'),
  ('Performance Optimization', 'Prioritized', 'Medium', 'Performance Team', '2024-05-15', '2024-07-15', 0, 'Tools selection pending', 'Need to finalize monitoring tools');

-- Insert sample highlights
INSERT INTO highlights (type, description, impact, resolution)
VALUES 
  ('Blocker', 'Resource allocation pending for Customer Analytics Dashboard', 'High', 'Awaiting team assignment'),
  ('Blocker', 'Design assets not ready for Mobile App Redesign', 'Medium', 'In progress with design team'),
  ('Path to Green', 'Need to assign dedicated team for Analytics Dashboard', 'High', 'Team assignment in progress'); 