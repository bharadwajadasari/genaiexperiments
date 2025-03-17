import React from 'react';

const TeamSummary = ({ teams }) => {
  // Calculate platform-wise breakdown
  const platformBreakdown = teams.reduce((acc, team) => {
    team.engineers.forEach(engineer => {
      const platform = engineer.role.split(' ')[0]; // Assuming role format is "Platform Engineer"
      if (!acc[platform]) {
        acc[platform] = {
          totalEngineers: 0,
          totalCapacity: 0,
          allocatedCapacity: 0,
          availableCapacity: 0
        };
      }
      acc[platform].totalEngineers++;
      acc[platform].totalCapacity += engineer.capacity;
      acc[platform].allocatedCapacity += team.allocatedCapacity;
      acc[platform].availableCapacity += (engineer.capacity - team.allocatedCapacity);
    });
    return acc;
  }, {});

  // Calculate overall totals
  const overallTotals = teams.reduce((acc, team) => {
    acc.totalEngineers += team.engineers.length;
    acc.totalCapacity += team.engineers.reduce((sum, eng) => sum + eng.capacity, 0);
    acc.allocatedCapacity += team.allocatedCapacity;
    acc.availableCapacity += (acc.totalCapacity - team.allocatedCapacity);
    return acc;
  }, {
    totalEngineers: 0,
    totalCapacity: 0,
    allocatedCapacity: 0,
    availableCapacity: 0
  });

  const overallUtilization = overallTotals.totalCapacity > 0 
    ? (overallTotals.allocatedCapacity / overallTotals.totalCapacity) * 100 
    : 0;

  return (
    <div className="team-summary">
      <h2>Team Summary</h2>
      <div className="summary-grid">
        <div className="summary-card">
          <h3>Overall Statistics</h3>
          <div className="summary-item">
            <span className="label">Total Teams:</span>
            <span className="value">{teams.length}</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Engineers:</span>
            <span className="value">{overallTotals.totalEngineers}</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Available Capacity:</span>
            <span className="value">{overallTotals.availableCapacity} weeks</span>
          </div>
          <div className="summary-item">
            <span className="label">Overall Utilization:</span>
            <span className="value">{overallUtilization.toFixed(1)}%</span>
          </div>
        </div>

        <div className="summary-card">
          <h3>Platform-wise Breakdown</h3>
          {Object.entries(platformBreakdown).map(([platform, stats]) => {
            const utilization = stats.totalCapacity > 0 
              ? (stats.allocatedCapacity / stats.totalCapacity) * 100 
              : 0;
            return (
              <div key={platform} className="platform-stats">
                <h4>{platform}</h4>
                <div className="summary-item">
                  <span className="label">Engineers:</span>
                  <span className="value">{stats.totalEngineers}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Available Capacity:</span>
                  <span className="value">{stats.availableCapacity} weeks</span>
                </div>
                <div className="summary-item">
                  <span className="label">Utilization:</span>
                  <span className="value">{utilization.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamSummary; 