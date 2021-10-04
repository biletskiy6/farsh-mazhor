function isSafari() {
  if (process.browser) {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  }
  return false
}
export default function (date, options = null) {
  if (!date) return ''
  if (isSafari()) {
    return date.replace(/-/g, '/')
  }
  const defaultOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  return Intl.DateTimeFormat('en-US', options || defaultOptions).format(
    new Date(date)
  )
}
