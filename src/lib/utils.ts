export function getBaseUrl (): string {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  } else {
    return 'https://dolarenbancos.com'
  }
}
