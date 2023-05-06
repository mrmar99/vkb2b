# Профильное задание Фронтенд-разработчик (B2B)

## Демо

[Нажми на меня](https://vkb2b.vercel.app/)

## Информация

Форма реализована с помощью `React & TypeScript`.

Использована библиотека компонентов `Ant Design`.
Библиотека `dayjs` нужна для корректной работы `DatePicker` и `TimePicker`.

В проекте заранее генерируются все необходимые данные. 

Интерфейсы генерируемых данных выглядят следующим образом:

```js
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
```