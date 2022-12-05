import { getDate, getMonth, getYear } from 'date-fns';

export const convertDateToUTC = (date: Date): Date => {
  const firstOfThisMonth = Date.UTC(getYear(date), getMonth(date), getDate(date), 0, 0, 0, 0);
  return new Date(firstOfThisMonth);
};
