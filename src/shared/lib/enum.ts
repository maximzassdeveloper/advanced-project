type EnumObj = { [s: number]: string }

export const enumEntries = <T extends EnumObj>(enumObj: T) => {
  const arr = Object.entries(enumObj) as unknown as Array<[keyof T, T[keyof T]]>
  // enum returns key-value and value-key pairs, so we remove half of them
  // arr.splice(0, arr.length / 2)
  return arr
}
