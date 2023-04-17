const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  const dateNow = Date.now()
  const elapsedTime = (dateNow - timestamp) / 1000
  for (const [unit, secondInUnit] of DATE_UNITS) {
    console.log(dateNow - timestamp, secondInUnit)
    if (elapsedTime >= secondInUnit) {
      const value = -Math.floor(elapsedTime / secondInUnit)
      console.log("value: ", value)
      return { value, unit }
    }
  }
}

export default function useTimeago(timestamp) {
  const { value, unit } = getDateDiffs(timestamp)
  const idioma = window.navigator.language
  // relative time format ()
  const rtf = new Intl.RelativeTimeFormat(idioma, { style: "long" })

  const time = rtf.format(value, unit)

  return time
}
