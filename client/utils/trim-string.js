export default function (value, count) {
  if (!value) {
    return ''
  }
  const sliced = value.slice(0, count)
  return sliced + '...'
}
