import { Component, ErrorInfo, ReactNode } from 'react'
import { PageError } from '@/widgets/pageError'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError?: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return <PageError />
    }

    return children
  }
}

export default ErrorBoundary
