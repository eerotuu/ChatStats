// @flow


// check if date range is out of bounds, return true if it is.
export const isDateRangeOutOfBounds = (start: Date, end: Date, max: number) => {
  let diffInTime = end.getTime() - start.getTime()
  let diffInDays = diffInTime / (1000 * 3600 * 24)
  console.log(diffInDays)
  return diffInDays > max
}
