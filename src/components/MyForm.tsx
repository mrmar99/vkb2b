import "./MyForm.scss";
import { useState, useEffect } from "react";
import {
  towers as towersData,
  floors as floorsData,
  rooms as roomsData,
} from "../data/data";
import dayjs, { Dayjs } from "dayjs";
import { Form, Select, DatePicker, TimePicker, ConfigProvider, Input, Button } from "antd";
import { RangeValue } from "rc-picker/lib/interface"
import locale from "antd/locale/ru_RU";

type Props = {};

const MyForm = (props: Props) => {
  const [towersOptions, setTowersOptions] = useState<{ value: string; label: string }[]>([]);
  const [floorsOptions, setFloorsOptions] = useState<{ value: string; label: number }[]>([]);
  const [roomsOptions, setRoomsOptions] = useState<{ value: number; label: number }[]>([]);

	const [towerValue, setTowerValue] = useState<string | null>(null);
	const [floorValue, setFloorValue] = useState<string | null>(null);
	const [roomValue, setRoomValue] = useState<string | null>(null);

	const [dateValue, setDateValue] = useState<Dayjs | null>(null);
	const [timeValue, setTimeValue] = useState<RangeValue<Dayjs> | undefined>(undefined);

	const [commentValue, setCommentValue] = useState<string | number | readonly string[] | undefined>(undefined);

  useEffect(() => {
    const towers = Object.entries(towersData).map(([key, value]) => {
      return {
        value: key,
        label: value.name,
      };
    });

    setTowersOptions(towers);
  }, []);

  const onTowerSelect = (value: string) => {
    const floors = Object.values(floorsData)
      .filter((floor) => {
        return floor.towerId === value;
      })
      .map(({ id, level }) => {
        return {
          value: id,
          label: level,
        };
      });

    if (!!towerValue) {
      setFloorValue(null);
      setRoomValue(null);
    }

    setFloorsOptions(floors);
    setTowerValue(value);
  };

  const onFloorSelect = (value: string) => {
    const rooms = roomsData
      .filter(({ floorId }) => floorId === value)
      .map(({ number }) => {
        const level = floorsData[value].level;
        return {
          value: number,
          label: number,
        };
      });

    if (!!floorValue) {
      setRoomValue(null);
    }

    setRoomsOptions(rooms);
    setFloorValue(value);
  };

	const onDateChange = (value: Dayjs | null) => {
		setDateValue(value);
	}

	const onTimeChange = (value: RangeValue<Dayjs> | undefined) => {
		setTimeValue(value);
	}

	const disabledDate = (current: Dayjs) => {
		const prevDay = dayjs().subtract(1, 'day');
		return current && current < prevDay;
	}

	const disabledTime = () => {
		const currentDate = dayjs();
		
		if (currentDate.isSame(dateValue, 'date')) {
			return {
				disabledHours: () => range(0, 24).filter((h) => h < currentDate.hour()),
				disabledMinutes: (selectedHour: number) => {
					if (selectedHour === currentDate.hour()) {
						return range(0, 60).filter((m) => m < currentDate.minute());
					}
					return [];
				},
			}
		}
		return {};
  };

	const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

	const onClear = () => {
		setTowerValue(null);
		setFloorValue(null);
		setRoomValue(null);
		setDateValue(null);
		setTimeValue(undefined);
		setCommentValue(undefined);
	}

	const onFinish = () => {
		const formData = {
			tower: towerValue && towersData[towerValue].name,
			floor: floorValue && floorsData[floorValue].level,
			room: roomValue,
			date: dateValue,
			timerange: timeValue,
			comment: commentValue
		}

		console.log(JSON.stringify(formData, null, 2));

		onClear();
	}

	const isSubmitDisabled = () => {
		return Boolean(towerValue) && Boolean(floorValue) && Boolean(roomValue) && Boolean(dateValue) && Boolean(timeValue);
	}

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinish}>
				<span className="form-header">Бронирование переговорной</span>
        <Form.Item label="Башня" rules={[{ required: true, message: 'Выберите башню!' }]}>
					<Select
						style={{
							width: "100%",
						}}
						placeholder="Выберите башню"
						options={towersOptions}
						onChange={onTowerSelect}
						value={towerValue}
					/>
				</Form.Item>
        <Form.Item label="Этаж" rules={[{ required: true, message: 'Выберите этаж!' }]}>
					<Select
						style={{
							width: "100%",
						}}
						disabled={!Boolean(towerValue)}
						placeholder="Выберите этаж"
						onChange={onFloorSelect}
						value={floorValue}
						options={floorsOptions}
					/>
				</Form.Item>
				<Form.Item label="Переговорная" rules={[{ required: true, message: 'Выберите переговорную!' }]}>
					<Select
						style={{
							width: "100%",
						}}
						disabled={!Boolean(floorValue)}
						placeholder="Выберите переговорную"
						onChange={(value: string) => setRoomValue(value)}
						value={roomValue}
						options={roomsOptions}
					/>
				</Form.Item>
        <ConfigProvider locale={locale}>
					<Form.Item label="Дата бронирования" rules={[{ required: true, message: 'Выберите дату!' }]}>
						<DatePicker 
							onChange={onDateChange}
							disabledDate={disabledDate}
							format={'DD/MM/YYYY'}
							style={{ width: "100%" }}
							value={dateValue}
							disabled={!(Boolean(towerValue) && Boolean(floorValue) && Boolean(roomValue))}
						/>
					</Form.Item>
					<Form.Item label="Временной интервал" rules={[{ required: true, message: 'Выберите время!' }]}>
						<TimePicker.RangePicker 
							onChange={onTimeChange}
							disabledTime={disabledTime}
							format={'HH:mm'}
							style={{ width: "100%" }}
							value={timeValue}
							disabled={!(Boolean(towerValue) && Boolean(floorValue) && Boolean(roomValue) && Boolean(dateValue))}
						/>
					</Form.Item>
        </ConfigProvider>
				<Form.Item label="Комментарий">
					<Input.TextArea value={commentValue} onChange={({ target }) => setCommentValue(target.value)} />
				</Form.Item>
				<Form.Item>
					<Button disabled={!isSubmitDisabled()} type="primary" htmlType="submit" style={{ width: '100%' }}>
						Забронировать
					</Button>
				</Form.Item>
				<Form.Item>
					<Button onClick={onClear} type="default" style={{ width: '100%' }}>
						Очистить
					</Button>
				</Form.Item>
      </Form>
    </div>
  );
};

export default MyForm;
