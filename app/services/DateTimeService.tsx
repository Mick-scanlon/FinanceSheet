export function ISOToMDY(isoString: string): string {
  const year = isoString.slice(0, 4);
  const month = isoString.slice(5, 7);
  const day = isoString.slice(8, 10);

  return `${month}/${day}/${year}`;
}

export function getFirstDayCurrMonth() {
  const today = new Date();

  return new Date(today.getFullYear(), today.getMonth(), 1);
}

export function getFirstDayLastMonth() {
  const today = new Date();
  const lastMonth = today.getMonth() === 1 ? 12 : today.getMonth() - 1;
  const lastYear =
    today.getMonth() === 1 ? today.getFullYear() - 1 : today.getFullYear();

  return new Date(lastYear, lastMonth, 1);
}
