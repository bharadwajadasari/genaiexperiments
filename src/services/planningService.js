import pool from '../lib/dbConfig'

export const planningService = {
  // Fetch all projects
  async getProjects() {
    try {
      const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC')
      return result.rows
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
  },

  // Fetch planning metrics
  async getMetrics() {
    try {
      const result = await pool.query('SELECT status FROM projects')
      const projects = result.rows

      const totalProjects = projects.length
      const plannedProjects = projects.filter(p => p.status === 'Planned').length
      const prioritizedProjects = projects.filter(p => p.status === 'Prioritized').length
      const pendingProjects = projects.filter(p => p.status === 'Pending Planning').length

      return {
        totalProjects,
        plannedProjects,
        prioritizedProjects,
        pendingProjects,
        completionRate: Math.round((plannedProjects / totalProjects) * 100),
        prioritizationRate: Math.round((prioritizedProjects / totalProjects) * 100),
        planningRate: Math.round((plannedProjects / totalProjects) * 100)
      }
    } catch (error) {
      console.error('Error fetching metrics:', error)
      throw error
    }
  },

  // Fetch key highlights
  async getHighlights() {
    try {
      const result = await pool.query('SELECT * FROM highlights ORDER BY created_at DESC')
      return result.rows
    } catch (error) {
      console.error('Error fetching highlights:', error)
      throw error
    }
  },

  // Add a new project
  async addProject(project) {
    try {
      const { projectName, status, priority, team, startDate, endDate, progress, blockers, pathToGreen } = project
      const result = await pool.query(
        `INSERT INTO projects (project_name, status, priority, team, start_date, end_date, progress, blockers, path_to_green)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [projectName, status, priority, team, startDate, endDate, progress, blockers, pathToGreen]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error adding project:', error)
      throw error
    }
  },

  // Update a project
  async updateProject(id, updates) {
    try {
      const { projectName, status, priority, team, startDate, endDate, progress, blockers, pathToGreen } = updates
      const result = await pool.query(
        `UPDATE projects 
         SET project_name = $1, status = $2, priority = $3, team = $4, 
             start_date = $5, end_date = $6, progress = $7, blockers = $8, 
             path_to_green = $9, updated_at = CURRENT_TIMESTAMP
         WHERE id = $10
         RETURNING *`,
        [projectName, status, priority, team, startDate, endDate, progress, blockers, pathToGreen, id]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },

  // Delete a project
  async deleteProject(id) {
    try {
      await pool.query('DELETE FROM projects WHERE id = $1', [id])
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  },

  // Add a new highlight
  async addHighlight(highlight) {
    try {
      const { type, description, impact, resolution } = highlight
      const result = await pool.query(
        `INSERT INTO highlights (type, description, impact, resolution)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [type, description, impact, resolution]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error adding highlight:', error)
      throw error
    }
  },

  // Update a highlight
  async updateHighlight(id, updates) {
    try {
      const { type, description, impact, resolution } = updates
      const result = await pool.query(
        `UPDATE highlights 
         SET type = $1, description = $2, impact = $3, resolution = $4,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $5
         RETURNING *`,
        [type, description, impact, resolution, id]
      )
      return result.rows[0]
    } catch (error) {
      console.error('Error updating highlight:', error)
      throw error
    }
  },

  // Delete a highlight
  async deleteHighlight(id) {
    try {
      await pool.query('DELETE FROM highlights WHERE id = $1', [id])
    } catch (error) {
      console.error('Error deleting highlight:', error)
      throw error
    }
  }
} 