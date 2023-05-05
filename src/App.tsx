import './styles/App.scss';
import React, { useState, useEffect } from 'react';
import { towers as towersData, floors as floorsData, rooms as roomsData } from "./data/data";
import { Select } from 'antd';

function App() {
  const [towersOptions, setTowersOptions] = useState<{ value: string; label: string; }[]>([]);
  const [towerValue, setTowerValue] = useState<string | null>(null);
  const [floorsOptions, setFloorsOptions] = useState<{ value: string; label: string; }[]>([]);
  const [floorValue, setFloorValue] = useState<string | null>(null);
  const [roomsOptions, setRoomsOptions] = useState<{ value: number; label: string; }[]>([]);
  const [roomValue, setRoomValue] = useState<string | null>(null);

  useEffect(() => {
    const towers = Object.entries(towersData).map(([key, value]) => {
      return {
        value: key,
        label: value.name
      }
    });

    setTowersOptions(towers);
  }, []);

  const onTowerSelect = (value: string) => {
    const floors = Object.values(floorsData).filter((floor) => {
      return floor.towerId === value;
    }).map(({ id, level }) => {
      return { value: id, label: `${level} этаж "${towersData[value].name}"` }
    });

    if (!!towerValue) {
      setFloorValue(null);
      setRoomValue(null);
    }

    setFloorsOptions(floors);
    setTowerValue(value);
  }

  const onFloorSelect = (value: string) => {
    const rooms = roomsData
      .filter(({ floorId }) => floorId === value)
      .map(({ number }) => {
        return { value: number, label: `Переговорная ${number}` }
      });

    if (!!floorValue) {
      setRoomValue(null);
    }

    setRoomsOptions(rooms);
    setFloorValue(value);
  }

  return (
    <div className="App">
      <div className='form-container'>
        <form>
          <Select 
            style={{
              width: '100%'
            }}
            placeholder="Выберите башню"
            options={towersOptions}
            onSelect={onTowerSelect}
            value={towerValue}
          />
          <Select 
            style={{
              width: '100%'
            }}
            disabled={!Boolean(towerValue)}
            placeholder="Выберите этаж"
            onSelect={onFloorSelect}
            value={floorValue}
            options={floorsOptions}
          />
          <Select 
            style={{
              width: '100%'
            }}
            disabled={!Boolean(floorValue)}
            placeholder="Выберите переговорную"
            onSelect={(value: string) => setRoomValue(value)}
            value={roomValue}
            options={roomsOptions}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
