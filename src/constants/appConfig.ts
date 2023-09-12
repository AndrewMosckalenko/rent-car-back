// weekends, user can't rent a car
// Date.getDay()
// 0 - sun
// 1 - mon
// 2 - tu
// 3 - wed
// 4 - th
// 5 - fr
// 6 - sat
export const WEEKEND = [0, 6];

// breake beetwen rent a car
export const BREAK_RENT_TIME = 3;

// base rent cost per day
export const BASE_COST = 1000;

// max and min time for rent car
export const MAX_RENT_TIME = 30;
export const MIN_RENT_TIME = 1;

// tarif plan from max end time to min
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

// day in milliseconds
export const MILLISECONDS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
