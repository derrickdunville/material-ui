export function parseDate(date) {
  if(!date){
    return ""
  }
  date = new Date(date)
  return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear()
}
