export function parseDate(date) {
  date = new Date(date)
  return (date.getMonth()+1) + "/" + date.getDay() + "/" + date.getFullYear()
}
