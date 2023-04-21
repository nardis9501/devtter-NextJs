const DATE_UNITS = [
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  const dateNow = Date.now()
  const elapsedTime = (dateNow - timestamp) / 1000
  // eslint-disable-next-line no-unreachable-loop
  for (const [unit, secondInUnit] of DATE_UNITS) {
    if (elapsedTime >= secondInUnit) {
      const value = -Math.floor(elapsedTime / secondInUnit)
      return { value, unit }
    } else if (elapsedTime < 1) {
      const value = 0
      const unit = "second"
      return { value, unit }
    }
  }
}

export default function useTimeago(timestamp) {
  const { value, unit } = getDateDiffs(timestamp)
  const language = navigator.language

  if (value < -1 && unit === "month") {
    const time = new Intl.DateTimeFormat(language).format(timestamp)
    return time
  } else {
    // relative time format ()
    const rtf = new Intl.RelativeTimeFormat(language, {
      ocaleMatcher: "lookup",
      numeric: "auto",
      style: "long",
    })

    const time = rtf.format(value, unit)

    return time
  }
}
