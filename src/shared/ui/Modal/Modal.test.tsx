import { useState } from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ModalProps } from './Modal'

function ModalWrapper(props: Partial<ModalProps>) {
  const { visible, onClose, animationTime = 0, ...rest } = props
  const [_visible, _setVisible] = useState(visible ?? false)

  const closeHandler = () => {
    _setVisible(false)
    onClose?.()
  }

  return (
    <div>
      <button data-testid='button' onClick={() => _setVisible(true)}>
        Modal
      </button>
      <Modal visible={_visible} onClose={closeHandler} animationTime={animationTime} {...rest}>
        <input data-testid='firstInput' />
        <input data-testid='secondInput' />
      </Modal>
    </div>
  )
}

const customEventTab = async (el: Element | Node | Document | Window, shift = false) => {
  fireEvent.keyDown(el, { code: 'Tab', shiftKey: shift })
  await userEvent.tab({ shift })
}

describe('Modal', () => {
  test('should correctly open and close', async () => {
    const mockedOnClose = jest.fn()
    jest.useFakeTimers()

    render(<ModalWrapper visible={false} onClose={mockedOnClose} destroyOnClose />)
    const button = screen.getByTestId('button')

    fireEvent.click(button)

    const modalMask = screen.getByTestId('modal-mask')
    expect(screen.getByTestId('modal-mask')).toBeInTheDocument()

    fireEvent.click(modalMask)
    jest.runAllTimers()

    expect(mockedOnClose).toHaveBeenCalled()
    expect(screen.queryByTestId('modal-mask')).toBeNull()

    jest.useRealTimers()
  })

  test('should focus first element', () => {
    render(<ModalWrapper visible={false} focusFirst />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    const firstInput = screen.getByTestId('firstInput')
    const secondInput = screen.getByTestId('secondInput')
    expect(firstInput).toEqual(document.activeElement)
    expect(secondInput).not.toEqual(document.activeElement)
  })

  test('should focus elements only in modal by Tab', async () => {
    render(<ModalWrapper visible focusFirst />)
    const modal = screen.getByTestId('modal')
    const firstInput = screen.getByTestId('firstInput')
    const secondInput = screen.getByTestId('secondInput')
    const sentialEnd = screen.getByTestId('sentialEnd')

    expect(firstInput).toHaveFocus()

    await customEventTab(modal)
    expect(secondInput).toHaveFocus()

    await customEventTab(modal)
    expect(sentialEnd).toHaveFocus()

    await customEventTab(modal)
    expect(firstInput).toHaveFocus()

    await customEventTab(modal)
    expect(secondInput).toHaveFocus()
  })

  test('should focus elements only in modal by Shift+Tab', async () => {
    render(<ModalWrapper visible focusFirst />)
    const modal = screen.getByTestId('modal')
    const firstInput = screen.getByTestId('firstInput')
    const secondInput = screen.getByTestId('secondInput')
    const sentialStart = screen.getByTestId('sentialStart')

    expect(firstInput).toHaveFocus()

    await customEventTab(modal, true)
    await waitFor(() => expect(sentialStart).toHaveFocus())

    await customEventTab(modal, true)
    await waitFor(() => expect(secondInput).toHaveFocus())

    await customEventTab(modal, true)
    await waitFor(() => expect(firstInput).toHaveFocus())
  })
})
