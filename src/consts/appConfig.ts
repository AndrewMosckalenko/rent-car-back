// выходные дни, в которые нельзя брать в аренду или возращать атомобиль
// Date.getDay()
// 0 - вск
// 1 - пн
// 2 - вт
// 3 - ср
// 4 - чт
// 5 - пт
// 6 - сб
export const WEEKEND = [0, 6];

// перерыв между сдачей в аренду для конкретного автомобиля
export const BREAK_RENT_TIME = 3;

// базовая стоимость аренды за день
export const BASE_COST = 1000;

// максимальный и минимальный срок аренды
export const MAX_RENT_TIME = 30;
export const MIN_RENT_TIME = 1;

// тарифный план, от большого end, до минимального
export const TARIF_PLAN = [
  {
    start: 18,
    end: 29,
    cost: Number(BASE_COST * (1 - 0.15)),
  },
  {
    start: 10,
    end: 17,
    cost: Number(BASE_COST * (1 - 0.1)),
  },
  {
    start: 5,
    end: 9,
    cost: Number(BASE_COST * (1 - 0.05)),
  },
  {
    start: 1,
    end: 4,
    cost: BASE_COST,
  },
];

// милисекунд в дне
export const MILLISENDS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
