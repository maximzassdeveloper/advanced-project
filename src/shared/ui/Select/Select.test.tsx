import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react'
import { Select, SelectOption, SelectProps } from './Select'

const SELECT_TESTID = 'select-container'
const INPUT_TESTID = 'select-input'
const LIST_TESTID = 'select-list'

const dataOptions: SelectOption<string | number>[] = [
  {
    value: 'test1',
    label: 'Label test1',
  },
  {
    value: 'test2',
    label: 'Label test2',
  },
  {
    value: 12,
    label: 'Label number',
  },
  {
    value: 'test3',
    label: 'Label disabled',
    disabled: true,
  },
]

describe('Select', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('list should open on focus and hide on blur', async () => {
    render(<Select options={dataOptions} />)

    const input = screen.getByTestId(INPUT_TESTID)

    fireEvent.focus(input)
    expect(screen.getByTestId(LIST_TESTID)).toBeInTheDocument()

    fireEvent.blur(input)
    await waitFor(() => {
      expect(screen.queryByTestId(LIST_TESTID)).toBeNull()
    })
  })

  test('controlled select', () => {
    const onChange = jest.fn()
    const { rerender } = render(
      <Select value={dataOptions[0].value} onChange={onChange} options={dataOptions} defaultOpen />
    )

    const input = screen.getByTestId(INPUT_TESTID)
    const secondOption = screen.getByText(dataOptions[1].label)

    expect(input).toHaveAttribute('placeholder', dataOptions[0].label)

    fireEvent.click(secondOption)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(dataOptions[1].value)

    rerender(<Select value={dataOptions[1].value} options={dataOptions} />)
    expect(input).toHaveValue(dataOptions[1].label)
  })

  test('uncontrolled select', () => {
    const onChange = jest.fn()
    render(<Select onChange={onChange} options={dataOptions} defaultOpen />)

    const input = screen.getByTestId(INPUT_TESTID)
    const secondOption = screen.getByText(dataOptions[1].label)

    expect(input).toHaveAttribute('placeholder', 'Выберите элемент')

    fireEvent.click(secondOption)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(dataOptions[1].value)
    expect(input).toHaveValue(dataOptions[1].label)
  })

  test('should correct work with number', () => {
    const onChange = jest.fn()
    render(<Select options={dataOptions} onChange={onChange} defaultOpen />)

    const input = screen.getByTestId(INPUT_TESTID)
    const numberOption = screen.getByText('Label number')

    fireEvent.click(numberOption)
    expect(onChange).toHaveBeenCalledWith(12)
    expect(input).toHaveValue('Label number')
  })

  test('should be disabled', () => {
    render(<Select disabled options={dataOptions} />)

    const input = screen.getByTestId(INPUT_TESTID)
    expect(input).toBeDisabled()

    fireEvent.focus(input)
    expect(screen.queryByTestId(LIST_TESTID)).toBeNull()
  })

  test('should be readonly', () => {
    render(<Select readOnly defaultOpen options={dataOptions} />)

    const input = screen.getByTestId(INPUT_TESTID)
    expect(input).toHaveAttribute('readonly')

    fireEvent.blur(input)
    expect(screen.queryByTestId(LIST_TESTID)).toBeInTheDocument()
  })

  test('should be work diabled option', () => {
    const onChange = jest.fn()
    render(<Select options={dataOptions} onChange={onChange} defaultOpen />)

    const disabledOption = screen.getByText(/Label disabled/)

    fireEvent.click(disabledOption)
    expect(onChange).toHaveBeenCalledTimes(0)
  })

  test('placeholder should show selected value with open list', () => {
    render(<Select value={dataOptions[0].value} options={dataOptions} defaultOpen />)

    const input = screen.getByTestId(INPUT_TESTID)
    expect(input).toHaveAttribute('placeholder', dataOptions[0].label)
    expect(input).toHaveValue('')

    fireEvent.blur(input)
    expect(input).toHaveValue(dataOptions[0].label)
  })

  // test('should show emptyText if options empty', () => {})
})
