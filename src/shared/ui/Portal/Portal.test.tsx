import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Portal, PortalProps } from './Portal'

const TRIGGER_BUTTON_TESTID = 'button'
const PORTAL_CONTAINER_TESTID = 'portal-container'

function PortalTestRender(props: Partial<PortalProps>) {
  const { visible, ...rest } = props
  const [_visible, _setVisible] = useState(visible ?? false)

  return (
    <>
      <button data-testid={TRIGGER_BUTTON_TESTID} onClick={() => _setVisible((p) => !p)}>
        Toggle portal
      </button>

      <Portal dataTestId={PORTAL_CONTAINER_TESTID} visible={_visible} {...rest}>
        Portal content
      </Portal>
    </>
  )
}

describe('Portal', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    jest.clearAllMocks()
  })

  test('should work animationTimer', () => {
    jest.useFakeTimers()

    render(<PortalTestRender visible animationTimeout={1000} destroyOnClose />)
    const triggerButton = screen.getByTestId(TRIGGER_BUTTON_TESTID)

    fireEvent.click(triggerButton)
    expect(screen.getByTestId(PORTAL_CONTAINER_TESTID)).toBeInTheDocument()

    jest.runAllTimers()
    expect(screen.queryByTestId(PORTAL_CONTAINER_TESTID)).toBeNull()

    jest.useRealTimers()
  })

  test('should correct add className to container', () => {
    render(<PortalTestRender visible className='portal-test' />)

    expect(screen.getByTestId(PORTAL_CONTAINER_TESTID)).toHaveClass('portal-test')
  })

  test('should correct lock scroll', async () => {
    render(<PortalTestRender lockScroll />)
    const triggerButton = screen.getByTestId(TRIGGER_BUTTON_TESTID)

    fireEvent.click(triggerButton)
    expect(document.body).toHaveStyle('overflow: hidden')

    fireEvent.click(triggerButton)
    expect(document.body).toHaveStyle('overflow: auto')
  })

  test('should correct destroy with `destroyOnClose = true`', async () => {
    render(<PortalTestRender destroyOnClose visible />)
    const triggerButton = screen.getByTestId('button')

    fireEvent.click(triggerButton)
    const portalContainer = screen.queryByTestId(PORTAL_CONTAINER_TESTID)
    expect(portalContainer).toBeNull()
  })

  test('should create one container with `destroyOnClose = false`', async () => {
    render(<PortalTestRender destroyOnClose={false} />)
    const triggerButton = screen.getByTestId(TRIGGER_BUTTON_TESTID)

    // First open
    fireEvent.click(triggerButton)
    let containers = await screen.findAllByTestId(PORTAL_CONTAINER_TESTID)
    expect(containers.length).toBe(1)

    // Hidden
    fireEvent.click(triggerButton)
    containers = await screen.findAllByTestId(PORTAL_CONTAINER_TESTID)
    expect(containers.length).toBe(1)

    // Second Open
    fireEvent.click(triggerButton)
    containers = await screen.findAllByTestId(PORTAL_CONTAINER_TESTID)
    expect(containers.length).toBe(1)
  })

  test('container must be removed if Portal unmount', async () => {
    const { unmount } = render(<PortalTestRender visible destroyOnClose={false} />)

    expect(screen.getByTestId(PORTAL_CONTAINER_TESTID)).toBeInTheDocument()
    unmount()

    expect(screen.queryByTestId(PORTAL_CONTAINER_TESTID)).toBeNull()
  })
})
