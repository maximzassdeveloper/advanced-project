import { mergeProps } from './mergeProps'

describe('mergeProps', () => {
  test('Combine classNames', () => {
    expect(
      mergeProps(
        {
          className: 'foo',
          containerClassName: 'container',
        },
        {
          className: 'simple',
          containerClassName: '',
        },
        {
          className: undefined,
          containerClassName: 'primary',
        }
      )
    ).toStrictEqual({
      className: 'foo simple',
      containerClassName: 'container primary',
    })
  })

  test('Combine events', () => {
    const mockOnClick1 = jest.fn((e: string) => e)
    const mockOnClick3 = jest.fn((e: string, start: boolean) => e)
    const mockFocus1 = jest.fn(() => 'focus 1')
    const mockFocus3 = jest.fn(() => 'focus 3')
    const mockOnFocus2 = jest.fn(() => 'onFocus 2')

    const result = mergeProps(
      {
        onClick: mockOnClick1,
        focus: mockFocus1,
      },
      {
        onFocus: mockOnFocus2,
      },
      {
        focus: mockFocus3,
        onFocus: undefined,
        onClick: mockOnClick3,
      }
    )

    result.onClick('event', false)
    result.focus()
    result.onFocus()

    expect(mockOnClick1.mock.calls[0][0]).toBe('event')
    expect(mockOnClick3.mock.calls[0][0]).toBe('event')
    expect(mockOnClick3.mock.calls[0][1]).toBe(false)
    expect(mockOnClick1.mock.results[0].value).toBe('event')

    expect(mockFocus1.mock.calls).toHaveLength(0)
    expect(mockFocus3.mock.calls).toHaveLength(1)

    expect(mockOnFocus2.mock.calls).toHaveLength(1)
  })

  test('All types of props', () => {
    const mockOnClick1 = jest.fn((e: string) => e)
    const mockOnClick3 = jest.fn((e: string) => e)

    const result = mergeProps(
      {
        name: 'input',
        onClick: mockOnClick1,
        className: 'input',
        hidden: false,
        actions: ['hover', 'click'],
        obj: { campaign: 'Campaign 1' },
      },
      {
        name: 'password',
        autoComplete: 'off',
        onClick: mockOnClick3,
        className: 'primary',
        actions: ['hover'],
        obj: null,
      }
    )

    const mockEventObj = { name: 'input', x: 20 }

    result.onClick(mockEventObj)
    expect(mockOnClick1.mock.results[0].value).toStrictEqual(mockEventObj)
    expect(mockOnClick3.mock.results[0].value).toStrictEqual(mockEventObj)

    expect(result).toStrictEqual({
      name: 'password',
      autoComplete: 'off',
      onClick: result.onClick,
      hidden: false,
      className: 'input primary',
      actions: ['hover'],
      obj: null,
    })
  })
})
