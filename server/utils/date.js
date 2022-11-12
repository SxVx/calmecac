const fullCurrentDate = function () {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  if (month < 10) month = `0${month}`
  if (day < 10) day = `0${day}`
  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds

  const todayDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return todayDate
}
// this function return the today date
const currentDate = function (timestamp = null) {
  const date = timestamp ? new Date(timestamp) : new Date()
  const year = date.getFullYear()
  let mount = date.getMonth() + 1
  let day = date.getDate()
  if (mount < 10) mount = `0${mount}`
  if (day < 10) day = `0${day}`
  const todayDate = `${year}/${mount}/${day}`

  return todayDate
}

const fullFormatDate = function (timestamp) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()

  if (month < 10) month = `0${month}`
  if (day < 10) day = `0${day}`
  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

module.exports = {
  fullCurrentDate,
  currentDate,
  fullFormatDate,
}
