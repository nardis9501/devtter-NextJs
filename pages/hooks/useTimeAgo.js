import { useCallback, useEffect, useState } from "react"

const DATE_UNITS = [
  // ["month", 2592000],
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

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  const memoizedCallback = useCallback(() => {
    const newTimeAgo = getDateDiffs(timestamp)
    setTimeAgo(newTimeAgo)
  }, [timestamp])

  const { value, unit } = timeAgo
  const language = navigator.language

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  console.log(timeZone)
  const titleTime = new Intl.DateTimeFormat(language, {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: `${timeZone}`,
  }).format(timestamp)
  useEffect(() => {
    const interval = setInterval(memoizedCallback, 30000) // Updates every # (60000 = 1 minute)

    return () => clearInterval(interval)
  }, [timestamp])

  if (value < -1 && unit === DATE_UNITS[0][0]) {
    const timeAgo = new Intl.DateTimeFormat(language).format(timestamp)

    return { timeAgo, titleTime }
  } else {
    // relative time format ()
    const rtf = new Intl.RelativeTimeFormat(language, {
      ocaleMatcher: "lookup",
      numeric: "auto",
      style: "long",
    })

    const timeAgo = rtf.format(value, unit)
    return { timeAgo, titleTime }
  }
}
