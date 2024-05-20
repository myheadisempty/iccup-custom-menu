export function parseDate(date: string) {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;

  if (isoDateRegex.test(date)) {
    const isoDate = new Date(date);

    const day = isoDate.getDate().toString().padStart(2, "0");
    const month = (isoDate.getMonth() + 1).toString().padStart(2, "0");
    const year = isoDate.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
  } else {
    const daysMatch = date.match(/(\d+)\s+дн/);
    const days = daysMatch ? parseInt(daysMatch[1]) : 0;

    const hoursMatch = date.match(/(\d+)\s+час/);
    const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;

    const minutesMatch = date.match(/(\d+)\s+мин/);
    const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

    const today = new Date();
    const utcTime = today.getTime() + today.getTimezoneOffset() * 60000;
    const mskOffset = 3 * 60 * 60000;
    const mskTime = new Date(utcTime + mskOffset);
    const calcDate = new Date(
      mskTime.getFullYear(),
      mskTime.getMonth(),
      mskTime.getDate() - days,
      mskTime.getHours() - hours,
      mskTime.getMinutes() - minutes
    );

    const year = calcDate.getFullYear().toString().slice(-2);
    const month = (calcDate.getMonth() + 1).toString().padStart(2, "0");
    const day = calcDate.getDate().toString().padStart(2, "0");

    return `${day}.${month}.${year}`;
  }
}
