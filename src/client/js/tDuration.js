// calculate the trip duration from start to end date

const calcTripDuration = (d1, d2) => {
  const start = new Date(d1)
  const end = new Date(d2)

  const dDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1 
  return dDays
}

export { calcTripDuration }
window.calcTripDuration = calcTripDuration
