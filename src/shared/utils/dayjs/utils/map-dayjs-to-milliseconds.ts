import dayjs, { Dayjs } from 'dayjs'

export function mapDayjsToMilliseconds(date: Dayjs) {
  return dayjs(date).toDate().getTime()
}
