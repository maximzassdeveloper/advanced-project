import { isFocusable } from './isFocusable'
import { WithoutReadonly } from '@/shared/types/global'

describe('isFocusable', () => {
  test('should return true with basic focusable HTML elements', () => {
    const input = document.createElement('input')
    const textarea = document.createElement('textarea')
    const select = document.createElement('select')
    const button = document.createElement('button')

    expect(isFocusable(input, false)).toBe(true)
    expect(isFocusable(textarea, false)).toBe(true)
    expect(isFocusable(select, false)).toBe(true)
    expect(isFocusable(button, false)).toBe(true)
  })

  test('should return false if element div', () => {
    const div = document.createElement('div')

    expect(isFocusable(div, false)).toBe(false)
  })

  test('should correct work with anchor', () => {
    const anchor = document.createElement('a')
    anchor.tabIndex = -1
    expect(isFocusable(anchor, false)).toBe(false)

    anchor.href = '#'
    expect(isFocusable(anchor, false)).toBe(true)
  })

  test('should return false if el disabled', () => {
    const input = document.createElement('input')
    input.setAttribute('disabled', 'true')

    expect(isFocusable(input)).toBe(false)
  })

  test('should return false if tabindex < 0 with onlyTabbed', () => {
    const input = document.createElement('input')
    input.setAttribute('tabIndex', '-1')

    expect(isFocusable(input, true)).toBe(false)
  })

  test('should return true if input tabindex < 0 without onlyTabbed', () => {
    const input = document.createElement('input')
    input.setAttribute('tabIndex', '-1')

    expect(isFocusable(input, false)).toBe(true)
  })

  test('should return true if el is contenteditable', () => {
    const div = document.createElement('div') as WithoutReadonly<HTMLDivElement>
    div.isContentEditable = true

    expect(isFocusable(div, false)).toBe(true)
  })
})
