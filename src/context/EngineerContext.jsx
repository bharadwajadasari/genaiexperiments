import React, { createContext, useState, useContext } from 'react';

const EngineerContext = createContext();

export const EngineerProvider = ({ children }) => {
  const [engineers, setEngineers] = useState([
    { id: 1, name: 'John Doe', role: 'Senior Engineer', utilization: 80 },
    { id: 2, name: 'Jane Smith', role: 'Frontend Developer', utilization: 65 },
    { id: 3, name: 'Mike Johnson', role: 'Backend Developer', utilization: 90 },
  ]);

  const updateEngineerUtilization = (id, newUtilization) => {
    setEngineers(engineers.map(engineer => 
      engineer.id === id 
        ? { ...engineer, utilization: Math.min(100, Math.max(0, newUtilization)) }
        : engineer
    ));
  };

  const getOverallUtilization = () => {
    const total = engineers.reduce((sum, engineer) => sum + engineer.utilization, 0);
    return Math.round(total / engineers.length);
  };

  return (
    <EngineerContext.Provider value={{ 
      engineers, 
      updateEngineerUtilization,
      getOverallUtilization 
    }}>
      {children}
    </EngineerContext.Provider>
  );
};

export const useEngineers = () => {
  const context = useContext(EngineerContext);
  if (!context) {
    throw new Error('useEngineers must be used within an EngineerProvider');
  }
  return context;
}; 