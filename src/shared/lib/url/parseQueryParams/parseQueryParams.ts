export function parseQueryParams() {
  const queryParams = new URLSearchParams(window.location.search)
  const params: Record<string, string> = {}

  for (const param of queryParams) {
    const key = param[0]
    const val = param[1]
    params[key] = val
  }

  return params
}
