import { ReactNode, Component } from 'react'

export interface DomWrapperProps {
  children: ReactNode
}

/**
 * Fallback to findDomNode if origin ref do not provide any dom element
 */
export default class DomWrapper extends Component<DomWrapperProps> {
  render() {
    return this.props.children
  }
}
