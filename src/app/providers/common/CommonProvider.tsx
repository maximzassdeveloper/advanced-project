import { ReactNode, useMemo, useState } from 'react'
import { CommonContext, CommonContextValue, SIDEBAR_lOCAL_STORAGE_KEY } from './CommonContext'

const sidebarFromStorage = localStorage.getItem(SIDEBAR_lOCAL_STORAGE_KEY) === 'true'

export const CommonProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(sidebarFromStorage)

  const defaultValue: CommonContextValue = useMemo(
    () => ({
      sidebarCollapsed,
      setSidebarCollapsed,
    }),
    [sidebarCollapsed]
  )

  return <CommonContext.Provider value={defaultValue}>{children}</CommonContext.Provider>
}

