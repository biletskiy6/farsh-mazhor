export default function (data) {
  console.log(data)
  if (!data || !data.length) return []
  return (
    data && data.map((orderLog, index) => ({ qty: index + 1, ...orderLog }))
  )
}
