import { StateSchema } from '@/app/providers/store'
import { isObject, objectKeys } from '../object'
import { firstUpperCase } from '../string'

type GetSelectorName<S extends PropertyKey> = S extends string ? `get${Capitalize<S>}Selector` : S

type GenerateSelectorsResult<S extends keyof StateSchema, V extends Partial<StateSchema[S]>> = {
  [K in keyof V as GetSelectorName<K>]: (
    state: StateSchema
  ) => K extends keyof StateSchema[S] ? StateSchema[S][K] : V[K]
}

export function generateSelectors<S extends keyof StateSchema, V extends Partial<StateSchema[S]>>(
  schema: S,
  values: V
) {
  const result = {} as GenerateSelectorsResult<S, typeof values>

  objectKeys(values).forEach((key) => {
    if (typeof key !== 'string') return

    const selectorName = `get${firstUpperCase(key)}Selector`

    const selectorFunc = (state: StateSchema) => {
      const currentSchema = state[schema]

      // TODO: Add info log, if reducer not found
      if (!currentSchema || !isObject(currentSchema) || !currentSchema.hasOwnProperty(key)) {
        return values[key]
      }

      // Obvious type convention else ts - angry
      return (currentSchema as typeof currentSchema)?.[key as keyof typeof currentSchema]
    }

    // eslint-disable-next-line
    // @ts-ignore
    result[selectorName] = selectorFunc
  })

  return result
}
