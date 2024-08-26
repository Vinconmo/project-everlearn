import moment from "moment";

export function formatDate (date: Date | undefined): string {
  if (!date) return "";
  return moment(date).format('MMM D, YYYY')
}

export function getFormFormat(
  year: number,
  month: number,
  day: number
): string {
  return `${year}-${month < 10 ? 0 : ""}${month}-${day}`;
}
