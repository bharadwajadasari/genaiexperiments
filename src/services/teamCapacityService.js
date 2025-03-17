import { teamCapacityData } from '../data/teamCapacityData';
import { validateEngineer, validateTeam, validateTeamCapacityData } from '../utils/validation';
import * as XLSX from 'xlsx';

const STORAGE_KEY = 'teamCapacityData';

// Custom error class for service errors
class TeamCapacityError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR') {
    super(message);
    this.name = 'TeamCapacityError';
    this.code = code;
  }
}

// Initialize data if not exists
const initializeData = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teamCapacityData));
      return teamCapacityData;
    }
    const parsedData = JSON.parse(storedData);
    const validationErrors = validateTeamCapacityData(parsedData);
    if (validationErrors) {
      throw new TeamCapacityError(
        `Invalid stored data: ${JSON.stringify(validationErrors)}`,
        'INVALID_STORED_DATA'
      );
    }
    return parsedData;
  } catch (error) {
    if (error instanceof TeamCapacityError) throw error;
    throw new TeamCapacityError(
      'Failed to initialize data: ' + error.message,
      'INITIALIZATION_ERROR'
    );
  }
};

// Get all teams
export const getTeams = () => {
  try {
    const data = initializeData();
    return data.teams;
  } catch (error) {
    console.error('Error getting teams:', error);
    throw error;
  }
};

// Get all roles
export const getRoles = () => {
  try {
    const data = initializeData();
    return data.roles;
  } catch (error) {
    console.error('Error getting roles:', error);
    throw error;
  }
};

// Add a new engineer to a team
export const addEngineer = (teamId, engineer) => {
  try {
    const validationErrors = validateEngineer(engineer);
    if (validationErrors) {
      throw new TeamCapacityError(
        `Invalid engineer data: ${JSON.stringify(validationErrors)}`,
        'INVALID_ENGINEER_DATA'
      );
    }

    const data = initializeData();
    const team = data.teams.find(t => t.id === teamId);
    if (!team) {
      throw new TeamCapacityError(`Team with ID ${teamId} not found`, 'TEAM_NOT_FOUND');
    }

    const updatedTeams = data.teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          engineers: [...team.engineers, { ...engineer, id: Date.now() }]
        };
      }
      return team;
    });

    const updatedData = {
      ...data,
      teams: updatedTeams
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return updatedTeams;
  } catch (error) {
    console.error('Error adding engineer:', error);
    throw error;
  }
};

// Update engineer capacity
export const updateEngineerCapacity = (teamId, engineerId, capacity) => {
  try {
    const validationErrors = validateEngineer({ capacity });
    if (validationErrors) {
      throw new TeamCapacityError(
        `Invalid capacity value: ${JSON.stringify(validationErrors)}`,
        'INVALID_CAPACITY'
      );
    }

    const data = initializeData();
    const team = data.teams.find(t => t.id === teamId);
    if (!team) {
      throw new TeamCapacityError(`Team with ID ${teamId} not found`, 'TEAM_NOT_FOUND');
    }

    const engineer = team.engineers.find(e => e.id === engineerId);
    if (!engineer) {
      throw new TeamCapacityError(`Engineer with ID ${engineerId} not found`, 'ENGINEER_NOT_FOUND');
    }

    const updatedTeams = data.teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          engineers: team.engineers.map(engineer => {
            if (engineer.id === engineerId) {
              return { ...engineer, capacity };
            }
            return engineer;
          })
        };
      }
      return team;
    });

    const updatedData = {
      ...data,
      teams: updatedTeams
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return updatedTeams;
  } catch (error) {
    console.error('Error updating engineer capacity:', error);
    throw error;
  }
};

// Update team's allocated capacity
export const updateTeamAllocatedCapacity = (teamId, allocatedCapacity) => {
  try {
    if (allocatedCapacity < 0 || allocatedCapacity > 100) {
      throw new TeamCapacityError(
        'Allocated capacity must be between 0 and 100',
        'INVALID_ALLOCATED_CAPACITY'
      );
    }

    const data = initializeData();
    const team = data.teams.find(t => t.id === teamId);
    if (!team) {
      throw new TeamCapacityError(`Team with ID ${teamId} not found`, 'TEAM_NOT_FOUND');
    }

    const updatedTeams = data.teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          allocatedCapacity
        };
      }
      return team;
    });

    const updatedData = {
      ...data,
      teams: updatedTeams
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return updatedTeams;
  } catch (error) {
    console.error('Error updating team capacity:', error);
    throw error;
  }
};

// Reset data to initial state
export const resetData = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teamCapacityData));
    return teamCapacityData;
  } catch (error) {
    console.error('Error resetting data:', error);
    throw error;
  }
};

// Export data to JSON file
export const exportData = () => {
  try {
    const data = JSON.parse(localStorage.getItem('teamCapacityData')) || teamCapacityData;
    
    // Prepare data for Excel
    const excelData = [];
    
    // Add teams data
    data.teams.forEach(team => {
      // Add team header
      excelData.push([
        { v: `Team: ${team.name}`, t: 's' },
        { v: `Total Capacity: ${team.totalCapacity}%`, t: 's' },
        { v: `Allocated Capacity: ${team.allocatedCapacity}%`, t: 's' }
      ]);
      
      // Add team contacts
      excelData.push([
        { v: 'Contact Name', t: 's' },
        { v: 'Email', t: 's' },
        { v: 'Phone', t: 's' }
      ]);
      team.contacts.forEach(contact => {
        excelData.push([
          { v: contact.name, t: 's' },
          { v: contact.email, t: 's' },
          { v: contact.phone, t: 's' }
        ]);
      });
      
      // Add engineers
      excelData.push([
        { v: 'Engineer Name', t: 's' },
        { v: 'Role', t: 's' },
        { v: 'Capacity', t: 's' }
      ]);
      team.engineers.forEach(engineer => {
        excelData.push([
          { v: engineer.name, t: 's' },
          { v: engineer.role, t: 's' },
          { v: `${engineer.capacity}%`, t: 's' }
        ]);
      });
      
      // Add empty row for spacing
      excelData.push([]);
    });
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    // Set column widths
    const colWidths = [
      { wch: 30 }, // Name column
      { wch: 40 }, // Email column
      { wch: 15 }  // Phone/Capacity column
    ];
    ws['!cols'] = colWidths;
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Team Capacity');
    
    // Generate Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'team_capacity.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting data:', error);
    throw new TeamCapacityError('Failed to export data');
  }
};

// Import data from JSON file
export const importData = async (file) => {
  try {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get the first sheet
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          // Process the data into teams structure
          const teams = processExcelData(jsonData);
          
          // Save to localStorage
          localStorage.setItem('teams', JSON.stringify(teams));
          
          resolve({ teams });
        } catch (error) {
          reject(new Error('Error processing Excel file: ' + error.message));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };

      reader.readAsArrayBuffer(file);
    });
  } catch (error) {
    throw new Error('Error importing data: ' + error.message);
  }
};

const processExcelData = (jsonData) => {
  // Group data by team
  const teamsMap = new Map();

  jsonData.forEach(row => {
    const teamName = row['Team Name'] || 'Default Team';
    const engineerName = row['Engineer Name'];
    const role = row['Role'];
    const capacity = parseFloat(row['Capacity (weeks)']) || 0;
    const allocatedCapacity = parseFloat(row['Allocated Capacity (weeks)']) || 0;

    if (!teamsMap.has(teamName)) {
      teamsMap.set(teamName, {
        id: generateId(),
        name: teamName,
        allocatedCapacity: allocatedCapacity,
        engineers: []
      });
    }

    const team = teamsMap.get(teamName);
    team.engineers.push({
      id: generateId(),
      name: engineerName,
      role: role,
      capacity: capacity
    });
  });

  return Array.from(teamsMap.values());
}; 