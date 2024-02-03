export const firstUpperCase = (str: string) => {
  if (str.length < 2) {
    return str.toUpperCase()
  }

  return str[0].toUpperCase() + str.substring(1)
}
