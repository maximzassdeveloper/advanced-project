export const getPaginationFirstLast = (paginationData: string | undefined) => {
  const result = {
    first: 1,
    last: 1,
  }

  if (!paginationData) return result

  const matches = paginationData.split(',')
  matches.forEach((i) => {
    const matchResult = i.match(/((?<=rel=").+(?="))|((?<=_page=)\d+)/gi)
    if (matchResult?.length !== 2) return
    const { 0: pageNum, 1: name } = matchResult

    if (name === 'first') {
      result.first = +pageNum
    } else if (name === 'last') {
      result.last = +pageNum
    }
  })

  return result
}
