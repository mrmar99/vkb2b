interface Tower {
  id: string;
  name: string;
};

interface Floor {
  id: string;
  towerId: string;
  level: number;
};

interface Room {
  towerId: string;
  floorId: string;
  number: number;
};

const generateRandomId = () => {
  return Math.random().toString(36).slice(2, 9);
}

const towers: { [id: string]: Tower } = {
  "towerA": { id: "towerA", name: "Башня А" },
  "towerB": { id: "towerB", name: "Башня Б" }
};

const floors: { [id: string]: Floor } = {};
Object.entries(towers).forEach(([key, value]) => {
  for (let level = 3; level <= 27; level++) {
    const floor: Floor = { id: generateRandomId(), towerId: key, level };
    floors[floor.id] = floor;
  }
});

const rooms: Room[] = [];
Object.values(floors).forEach((floor) => {
  for (let i = 1; i <= 10; i++) {
    const room: Room = { towerId: floor.towerId, floorId: floor.id, number: i };
    rooms.push(room);
  }
});

export {
  towers,
  floors,
  rooms
}
