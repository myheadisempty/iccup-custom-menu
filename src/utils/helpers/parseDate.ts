import { tz } from "moment-timezone";

export function parseDate(date: string) {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;

  if (isoDateRegex.test(date)) {
    const isoDate = new Date(date);

    const day = isoDate.getDate().toString().padStart(2, "0");
    const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
    const year = isoDate.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
  } else {
    const daysMatch = date.match(/(\d+)\s(дн|day)/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 0;

    const hoursMatch = date.match(/(\d+)\s(час|hour)/);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;

    const minutesMatch = date.match(/(\d+)\s(мин|min)/);
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

    const today = tz("Europe/Moscow").toDate();
    const calcDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - days,
      today.getHours() - hours,
      today.getMinutes() - minutes
    );

    const year = calcDate.getFullYear().toString().slice(-2);
    const month = (calcDate.getMonth() + 1).toString().padStart(2, "0");
    const day = calcDate.getDate().toString().padStart(2, "0");

    return `${day}.${month}.${year}`;
  }
}
