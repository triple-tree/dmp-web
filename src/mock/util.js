let responseBody = {
  message: '',
  // timestamp: 0,
  data: null,
  code: 0,
}

export const builder = (data, message, code = 0, headers = {}, extraData = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    responseBody._status = code
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers
  }
  // responseBody.timestamp = new Date().getTime()
  responseBody = { ...responseBody, ...extraData }
  return responseBody
}

export const getQueryParameters = options => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export const getBody = options => {
  return options && JSON.parse(options)
}
