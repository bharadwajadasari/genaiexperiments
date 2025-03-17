export const planningMetrics = {
  totalProjects: 5,
  plannedProjects: 3,
  prioritizedProjects: 2,
  pendingProjects: 2,
  planningRate: 60,
  prioritizationRate: 40,
  capacityUtilization: 85
};

export const projectData = [
  {
    id: 1,
    projectName: "Mobile App Redesign",
    status: "Planned",
    priority: "High",
    team: "Mobile Team Alpha",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    progress: 0,
    blockers: "None",
    pathToGreen: "On track",
    requiredCapacity: 80,
    allocatedCapacity: 80,
    capacityStatus: "green"
  },
  {
    id: 2,
    projectName: "API Gateway Implementation",
    status: "Prioritized",
    priority: "High",
    team: "Backend Team Beta",
    startDate: "2024-04-15",
    endDate: "2024-06-15",
    progress: 0,
    blockers: "None",
    pathToGreen: "On track",
    requiredCapacity: 90,
    allocatedCapacity: 90,
    capacityStatus: "yellow"
  },
  {
    id: 3,
    projectName: "User Authentication System",
    status: "Planned",
    priority: "Medium",
    team: "Backend Team Beta",
    startDate: "2024-05-01",
    endDate: "2024-06-30",
    progress: 0,
    blockers: "None",
    pathToGreen: "On track",
    requiredCapacity: 70,
    allocatedCapacity: 70,
    capacityStatus: "green"
  },
  {
    id: 4,
    projectName: "Analytics Dashboard",
    status: "Pending Planning",
    priority: "Low",
    team: "Mobile Team Alpha",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    progress: 0,
    blockers: "Capacity constraints",
    pathToGreen: "Need to reallocate resources",
    requiredCapacity: 60,
    allocatedCapacity: 0,
    capacityStatus: "red"
  },
  {
    id: 5,
    projectName: "Performance Optimization",
    status: "Pending Planning",
    priority: "Medium",
    team: "Backend Team Beta",
    startDate: "2024-06-15",
    endDate: "2024-06-30",
    progress: 0,
    blockers: "Team capacity exceeded",
    pathToGreen: "Consider moving to next quarter",
    requiredCapacity: 50,
    allocatedCapacity: 0,
    capacityStatus: "red"
  }
];

export const keyHighlights = [
  {
    type: "Blocker",
    description: "Team capacity exceeded for Q2",
    impact: "High",
    resolution: "Consider moving some projects to Q3"
  },
  {
    type: "Path to Green",
    description: "Optimize resource allocation",
    impact: "Medium",
    resolution: "Review and adjust project timelines"
  }
]; 