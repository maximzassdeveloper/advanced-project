import { objectKeys } from '../../object'

export function generateQueryParams(params: Record<string, any>) {
  const queryParams = new URLSearchParams(window.location.search)

  objectKeys(params).forEach((key) => {
    const val = params[key]
    if (val === undefined || val === null || val === '') return

    queryParams.set(key, params[key].toString())
  })

  return queryParams
}

export function setQueryParams(params: Record<string, any>) {
  const queryParams = generateQueryParams(params)

  return window.history.pushState(null, '', `?${queryParams.toString()}`)
}
