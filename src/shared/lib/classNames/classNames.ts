type Mode = Record<string, string | boolean>
type ArgType = string | number | string[] | Mode

export function classNames(...args: ArgType[]): string {
  let classes: string[] = []

  for (const arg of args) {
    if (!arg) continue
    const argType = typeof arg

    if (argType === 'number' || argType === 'string') {
      classes.push(arg.toString())
      continue
    }

    if (Array.isArray(arg)) {
      classes = [...classes, ...arg]
      continue
    }

    if (argType === 'object') {
      for (const key in arg as Mode) {
        if ((arg as Mode)[key]) {
          classes.push(key)
        }
      }
    }
  }

  return classes.join(' ')
}