import moment from "moment";

export function formatDate (date: Date | undefined): string {
  if (!date) return "";
  return moment(date).format('MMM D, YYYY')
}
