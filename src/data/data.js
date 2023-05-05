const towers = [
  { name: "Башня А", floors: [] },
  { name: "Башня Б", floors: [] }
];

for (let i = 3; i <= 27; i++) {
  const floor = {
    level: i,
    rooms: []
  }

  for (let j = 1; j <= 10; j++) {
    floor.rooms.push({ name: `Переговорная ${j}` });
  }

  towers.forEach((tower) => tower.floors.push(floor));
}

export default towers;