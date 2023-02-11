import { classNames } from './classNames'

describe('classNames', () => {
  test('with only string params', () => {
    expect(classNames('someClass')).toBe('someClass')
  })

  test('with string and number params', () => {
    expect(classNames('someClass', 2)).toBe('someClass 2')
  })

  test('with string, number, array params', () => {
    expect(classNames('someClass', 2, ['hovered', 'touched'])).toBe('someClass 2 hovered touched')
  })

  test('with all params', () => {
    expect(
      classNames('someClass', 2, ['hovered', 'touched'], {
        submit: true,
        enable: false,
      }),
    ).toBe('someClass 2 hovered touched submit')
  })

  test('with object with undefined key', () => {
    expect(
      classNames({
        undefined: true,
        enable: false,
      }),
    ).toBe('')
  })

  test('with undefined params', () => {
    const className = undefined
    expect(classNames('someClass', className)).toBe('someClass')
  })

  test('with undefined value in array', () => {
    const className = undefined
    expect(classNames('someClass', [className, 'submit'])).toBe('someClass submit')
  })

  test('with object with undefined value', () => {
    expect(
      classNames('someClass', {
        hovered: undefined,
        pressed: null,
        submitted: true,
      }),
    ).toBe('someClass submitted')
  })
})
