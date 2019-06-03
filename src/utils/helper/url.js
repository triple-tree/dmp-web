export function searchParasToString(search) {
  const keyValuePair = []
  for (const key in search) {
    keyValuePair.push(`${key}=${search[key]}`)
  }
  return keyValuePair.join('&')
}
