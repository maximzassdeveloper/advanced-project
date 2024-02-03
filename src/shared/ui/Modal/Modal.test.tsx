import { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ModalProps } from './Modal'

function ModalWrapper(props: Partial<ModalProps>) {
  const [visible, setVisible] = useState(props.visible ?? false)

  const closeHandler = () => {
    setVisible(false)
    props.onClose?.()
  }

  return (
    <div>
      <button data-testid='button' onClick={() => setVisible(true)}>
        Modal
      </button>
      <Modal visible={visible} onClose={closeHandler} {...props}>
        <input data-testid='firstInput' />
        <input data-testid='secondInput' />
      </Modal>
    </div>
  )
}

const customEventTab = (el: HTMLElement, shift = false) => {
  userEvent.tab({ shift })
  fireEvent.keyDown(el, { code: 'Tab', shiftKey: shift })
}

describe('Modal', () => {
  test('should correctly open and close', async () => {
    const mockedOnClose = jest.fn()
    const { getByTestId } = render(<ModalWrapper visible={false} onClose={mockedOnClose} />)
    const button = getByTestId('button')
    fireEvent.click(button)
    // replace to find
    setTimeout(() => {
      const modalMask = getByTestId('modal-mask')
      expect(modalMask).toBeInTheDocument()

      fireEvent.click(modalMask)
      expect(mockedOnClose).toHaveBeenCalled()
      expect(modalMask).not.toBeInTheDocument()
    }, 300)
  })

  test('should focus first element', () => {
    const { getByTestId } = render(<ModalWrapper visible={false} focusFirst />)
    const button = getByTestId('button')
    fireEvent.click(button)

    setTimeout(() => {
      const firstInput = getByTestId('firstInput')
      const secondInput = getByTestId('secondInput')
      expect(firstInput).toEqual(document.activeElement)
      expect(secondInput).not.toEqual(document.activeElement)
    }, 300)
  })

  test('should focus elements only in modal by Tab', () => {
    const { getByTestId } = render(<ModalWrapper visible={true} focusFirst />)
    const modal = getByTestId('modal')
    const firstInput = getByTestId('firstInput')
    const secondInput = getByTestId('secondInput')

    expect(firstInput).toEqual(document.activeElement)

    customEventTab(modal)
    expect(secondInput).toEqual(document.activeElement)

    customEventTab(modal)
    customEventTab(modal)
    expect(firstInput).toEqual(document.activeElement)
  })

  test('should focus elements only in modal by Shift+Tab', () => {
    const { getByTestId } = render(<ModalWrapper visible={true} focusFirst />)
    const modal = getByTestId('modal')
    const firstInput = getByTestId('firstInput')
    const secondInput = getByTestId('secondInput')

    expect(firstInput).toEqual(document.activeElement)

    customEventTab(modal, true)
    customEventTab(modal, true)

    expect(secondInput).toEqual(document.activeElement)

    customEventTab(modal, true)
    expect(firstInput).toEqual(document.activeElement)
  })
})
