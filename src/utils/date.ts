import i18n from './i18n'

export const formatData = (data: number) => {
  return data < 10 ? `0${data}` : data
}

export const parseSimpleDate = (timestamp: number | string) => {
  const date = new Date(Number(timestamp))
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${formatData(date.getHours())}:${formatData(
    date.getMinutes(),
  )}:${formatData(date.getSeconds())}`
}

export const parseSimpleDateNoSecond = (timestamp: number | string, connector = '-') => {
  const date = new Date(Number(timestamp))
  return `${date.getFullYear()}${connector}${date.getMonth() + 1}${connector}${date.getDate()} ${formatData(
    date.getHours(),
  )}:${formatData(date.getMinutes())}`
}

export const parseDiffDate = (startTime: number | string, endTime: number | string) => {
  const second = (Number(endTime) - Number(startTime)) / 1000
  if (second < 0) {
    throw Error('End timestamp must be bigger than start timestamp')
  }
  const hour = Math.floor((second / 3600) % 24)
  const day = Math.floor(second / 3600 / 24)
  return `${day} days ${hour} hrs`
}

export const parseTimeNoSecond = (millisecond: number | string) => {
  const second = Number(millisecond) / 1000
  const minute = Math.floor((second / 60) % 60)
  const hour = Math.floor(second / 3600)
  return `${hour} h ${minute} m`
}

export const parseDateNoTime = (timestamp: number | string) => {
  const date = new Date(Number(timestamp) * 1000)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export const parseDate = (timestamp: number | string) => {
  const now = new Date().getTime()
  const diff = (now - Number(timestamp)) / 1000
  if (diff < 60) {
    return `${Math.floor(diff)}${i18n.t('common.second_ago')}`
  }
  if (diff < 3600) {
    return `${Math.floor(diff / 60)}${i18n.t('common.minute')} ${Math.floor(diff % 60)}${i18n.t('common.second_ago')}`
  }
  return parseSimpleDate(timestamp)
}

export const getCurrentYear = () => {
  return new Date().getFullYear()
}

export const parseTime = (millisecond: number) => {
  let second = millisecond / 1000
  let minute = second / 60
  const hour = second / 3600

  if (hour >= 1) {
    minute %= 60
    second %= 60
    return `${Math.floor(hour)} h ${Math.floor(minute)} m ${second.toFixed(0)} s`
  }

  if (minute >= 1) {
    second %= 60
    return `${Math.floor(minute)} m ${second.toFixed(0)} s`
  }
  return `${second.toFixed(2)} s`
}
