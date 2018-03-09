let _options = {
  get: (serviceName, url, method = 'get', data = {}, isJson = false, timeout = 5000, baseURL = '/api') => {
    let headers = {'service_name': `${serviceName}`}
    headers = isJson ? {...headers, 'content-type': 'application/json'} : headers
    return {url, baseURL, timeout, method, params: !isJson && data, data: isJson && data, headers}
  }
}

export const users = (url, method, data, isJson, timeout, baseURL) => {
  return _options.get('userservice', url, method, data, isJson, timeout, baseURL)
}

// export default users
