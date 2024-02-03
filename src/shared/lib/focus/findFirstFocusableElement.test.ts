import { findFirstFocusableElement } from './findFirstFocusableElement'

const TEST_INPUT_ID = 'test-input'
const TEST_BUTTON_ID = 'test-button'
const TEST_SPAN_ID = 'test-span'
const DEFAULT_HTML_EXAMPLE = `<div>
<form>
  <h1>Title</h1>
  <input id="${TEST_INPUT_ID}" type="text" />
  <button id="${TEST_BUTTON_ID}">Cool</button>
</form>
</div>`

describe('findFirstFocusableElement', () => {
  afterAll(() => {
    document.body.innerHTML = ''
  })

  test('should find input', () => {
    document.body.innerHTML = DEFAULT_HTML_EXAMPLE
    const result = findFirstFocusableElement(document.body)

    expect(result).toHaveProperty('id', TEST_INPUT_ID)
  })

  test('should exclude elements', () => {
    document.body.innerHTML = DEFAULT_HTML_EXAMPLE
    const inputForExclude = document.getElementById(TEST_INPUT_ID) as HTMLInputElement
    const result = findFirstFocusableElement(document.body, [inputForExclude])

    expect(result).toHaveProperty('id', TEST_BUTTON_ID)
  })

  test('should return null', () => {
    document.body.innerHTML = '<div><form></form></div>'
    const result = findFirstFocusableElement(document.body)

    expect(result).toBeNull()
  })

  test('should return null if tabindex < 0', () => {
    document.body.innerHTML = `<div>
      <input id="${TEST_INPUT_ID}" type="text" tabIndex="-1" />
    </div>`
    const result = findFirstFocusableElement(document.body)

    expect(result).toBeNull()
  })

  test('should return span with tabIndex 0', () => {
    document.body.innerHTML = `<div>
      <span id="${TEST_SPAN_ID}" tabIndex="0"></span>
      <input id="${TEST_INPUT_ID}" type="text" />
    </div>`
    const result = findFirstFocusableElement(document.body)

    expect(result).toHaveProperty('id', TEST_SPAN_ID)
  })
})
