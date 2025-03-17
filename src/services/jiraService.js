import axios from 'axios';

const JIRA_API_BASE_URL = process.env.REACT_APP_JIRA_API_URL || 'https://your-domain.atlassian.net/rest/api/3';
const JIRA_AUTH_TOKEN = process.env.REACT_APP_JIRA_AUTH_TOKEN;

const jiraApi = axios.create({
  baseURL: JIRA_API_BASE_URL,
  headers: {
    'Authorization': `Basic ${JIRA_AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  }
});

export const jiraService = {
  // Get all sprints for a board
  getSprints: async (boardId) => {
    try {
      const response = await jiraApi.get(`/board/${boardId}/sprint`);
      return response.data.values;
    } catch (error) {
      console.error('Error fetching sprints:', error);
      throw error;
    }
  },

  // Get sprint details
  getSprintDetails: async (sprintId) => {
    try {
      const response = await jiraApi.get(`/sprint/${sprintId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sprint details:', error);
      throw error;
    }
  },

  // Get issues in a sprint
  getSprintIssues: async (sprintId) => {
    try {
      const response = await jiraApi.get(`/sprint/${sprintId}/issue`);
      return response.data.issues;
    } catch (error) {
      console.error('Error fetching sprint issues:', error);
      throw error;
    }
  },

  // Get issue details
  getIssueDetails: async (issueKey) => {
    try {
      const response = await jiraApi.get(`/issue/${issueKey}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching issue details:', error);
      throw error;
    }
  },

  // Get issue transitions
  getIssueTransitions: async (issueKey) => {
    try {
      const response = await jiraApi.get(`/issue/${issueKey}/transitions`);
      return response.data.transitions;
    } catch (error) {
      console.error('Error fetching issue transitions:', error);
      throw error;
    }
  },

  // Update issue status
  updateIssueStatus: async (issueKey, transitionId) => {
    try {
      const response = await jiraApi.post(`/issue/${issueKey}/transitions`, {
        transition: { id: transitionId }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating issue status:', error);
      throw error;
    }
  },

  // Search issues
  searchIssues: async (jql) => {
    try {
      const response = await jiraApi.get('/search', {
        params: { jql }
      });
      return response.data.issues;
    } catch (error) {
      console.error('Error searching issues:', error);
      throw error;
    }
  },

  // Get issue comments
  getIssueComments: async (issueKey) => {
    try {
      const response = await jiraApi.get(`/issue/${issueKey}/comment`);
      return response.data.comments;
    } catch (error) {
      console.error('Error fetching issue comments:', error);
      throw error;
    }
  },

  // Add comment to issue
  addIssueComment: async (issueKey, comment) => {
    try {
      const response = await jiraApi.post(`/issue/${issueKey}/comment`, {
        body: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: comment }]
            }
          ]
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding issue comment:', error);
      throw error;
    }
  }
}; 