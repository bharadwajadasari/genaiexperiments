import { useState, useCallback } from 'react';
import { jiraService } from '../services/jiraService';

export const useJira = (boardId) => {
  const [sprints, setSprints] = useState([]);
  const [currentSprint, setCurrentSprint] = useState(null);
  const [sprintIssues, setSprintIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all sprints for the board
  const fetchSprints = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const sprintsData = await jiraService.getSprints(boardId);
      setSprints(sprintsData);
      return sprintsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  // Fetch sprint details
  const fetchSprintDetails = useCallback(async (sprintId) => {
    try {
      setLoading(true);
      setError(null);
      const sprintDetails = await jiraService.getSprintDetails(sprintId);
      setCurrentSprint(sprintDetails);
      return sprintDetails;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch issues for a sprint
  const fetchSprintIssues = useCallback(async (sprintId) => {
    try {
      setLoading(true);
      setError(null);
      const issues = await jiraService.getSprintIssues(sprintId);
      setSprintIssues(issues);
      return issues;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update issue status
  const updateIssueStatus = useCallback(async (issueKey, transitionId) => {
    try {
      setLoading(true);
      setError(null);
      const result = await jiraService.updateIssueStatus(issueKey, transitionId);
      // Refresh sprint issues after status update
      if (currentSprint) {
        await fetchSprintIssues(currentSprint.id);
      }
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentSprint, fetchSprintIssues]);

  // Search issues
  const searchIssues = useCallback(async (jql) => {
    try {
      setLoading(true);
      setError(null);
      const issues = await jiraService.searchIssues(jql);
      return issues;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get issue details
  const getIssueDetails = useCallback(async (issueKey) => {
    try {
      setLoading(true);
      setError(null);
      const issueDetails = await jiraService.getIssueDetails(issueKey);
      return issueDetails;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get issue transitions
  const getIssueTransitions = useCallback(async (issueKey) => {
    try {
      setLoading(true);
      setError(null);
      const transitions = await jiraService.getIssueTransitions(issueKey);
      return transitions;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add comment to issue
  const addIssueComment = useCallback(async (issueKey, comment) => {
    try {
      setLoading(true);
      setError(null);
      const result = await jiraService.addIssueComment(issueKey, comment);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sprints,
    currentSprint,
    sprintIssues,
    loading,
    error,
    fetchSprints,
    fetchSprintDetails,
    fetchSprintIssues,
    updateIssueStatus,
    searchIssues,
    getIssueDetails,
    getIssueTransitions,
    addIssueComment
  };
}; 