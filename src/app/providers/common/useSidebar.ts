import { useCallback, useContext } from 'react'
import { CommonContext, SIDEBAR_lOCAL_STORAGE_KEY } from './CommonContext'

interface UseSidebarResult {
  collapsed: boolean
  toggleSidebar: () => void
}

export const useSidebar = (): UseSidebarResult => {
  const { sidebarCollapsed, setSidebarCollapsed } = useContext(CommonContext)

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      localStorage.setItem(SIDEBAR_lOCAL_STORAGE_KEY, String(!prev))
      return !prev
    })
  }, [setSidebarCollapsed])

  return {
    collapsed: sidebarCollapsed,
    toggleSidebar,
  }
}
