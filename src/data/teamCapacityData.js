export const teamCapacityData = {
  teams: [
    {
      id: 1,
      teamName: "Mobile Team Alpha",
      pointOfContact: "John Smith",
      productContact: "Sarah Johnson",
      programContact: "Mike Wilson",
      businessContact: "Lisa Brown",
      engineers: [
        { id: 1, name: "Alex Chen", role: "iOS Engineer", capacity: 100 },
        { id: 2, name: "Maria Garcia", role: "Android Engineer", capacity: 100 },
        { id: 3, name: "David Kim", role: "Web Engineer", capacity: 100 }
      ],
      sprintDuration: 2, // weeks
      availableCapacity: 100,
      allocatedCapacity: 0
    },
    {
      id: 2,
      teamName: "Backend Team Beta",
      pointOfContact: "Tom Anderson",
      productContact: "Emma Davis",
      programContact: "Chris Lee",
      businessContact: "Rachel Green",
      engineers: [
        { id: 4, name: "James Wilson", role: "Node Engineer", capacity: 100 },
        { id: 5, name: "Sophie Chen", role: "Back End Engineer", capacity: 100 },
        { id: 6, name: "Lucas Silva", role: "Back End Engineer", capacity: 100 }
      ],
      sprintDuration: 2,
      availableCapacity: 100,
      allocatedCapacity: 0
    }
  ],
  roles: [
    "iOS Engineer",
    "Android Engineer",
    "Web Engineer",
    "Node Engineer",
    "Back End Engineer"
  ]
}; 