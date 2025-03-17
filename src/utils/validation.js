// Validation schemas
const engineerSchema = {
  name: (value) => {
    if (!value || typeof value !== 'string') return 'Name is required and must be a string';
    if (value.length < 2) return 'Name must be at least 2 characters long';
    return null;
  },
  role: (value) => {
    if (!value || typeof value !== 'string') return 'Role is required and must be a string';
    return null;
  },
  capacity: (value) => {
    const num = Number(value);
    if (isNaN(num)) return 'Capacity must be a number';
    if (num < 0 || num > 100) return 'Capacity must be between 0 and 100';
    return null;
  }
};

const teamSchema = {
  teamName: (value) => {
    if (!value || typeof value !== 'string') return 'Team name is required and must be a string';
    if (value.length < 2) return 'Team name must be at least 2 characters long';
    return null;
  },
  pointOfContact: (value) => {
    if (!value || typeof value !== 'string') return 'Point of contact is required';
    return null;
  },
  productContact: (value) => {
    if (!value || typeof value !== 'string') return 'Product contact is required';
    return null;
  },
  programContact: (value) => {
    if (!value || typeof value !== 'string') return 'Program contact is required';
    return null;
  },
  businessContact: (value) => {
    if (!value || typeof value !== 'string') return 'Business contact is required';
    return null;
  },
  sprintDuration: (value) => {
    const num = Number(value);
    if (isNaN(num)) return 'Sprint duration must be a number';
    if (num < 1 || num > 4) return 'Sprint duration must be between 1 and 4 weeks';
    return null;
  }
};

// Validation functions
export const validateEngineer = (engineer) => {
  const errors = {};
  for (const [field, validator] of Object.entries(engineerSchema)) {
    const error = validator(engineer[field]);
    if (error) errors[field] = error;
  }
  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateTeam = (team) => {
  const errors = {};
  for (const [field, validator] of Object.entries(teamSchema)) {
    const error = validator(team[field]);
    if (error) errors[field] = error;
  }
  return Object.keys(errors).length > 0 ? errors : null;
};

export const validateTeamCapacityData = (data) => {
  if (!data || typeof data !== 'object') return 'Invalid data format';
  if (!Array.isArray(data.teams)) return 'Teams must be an array';
  if (!Array.isArray(data.roles)) return 'Roles must be an array';

  const errors = [];
  
  // Validate each team
  data.teams.forEach((team, index) => {
    const teamErrors = validateTeam(team);
    if (teamErrors) {
      errors.push(`Team ${index + 1} has errors: ${JSON.stringify(teamErrors)}`);
    }

    // Validate engineers
    if (!Array.isArray(team.engineers)) {
      errors.push(`Team ${index + 1} engineers must be an array`);
    } else {
      team.engineers.forEach((engineer, engIndex) => {
        const engineerErrors = validateEngineer(engineer);
        if (engineerErrors) {
          errors.push(`Team ${index + 1}, Engineer ${engIndex + 1} has errors: ${JSON.stringify(engineerErrors)}`);
        }
      });
    }
  });

  return errors.length > 0 ? errors : null;
}; 