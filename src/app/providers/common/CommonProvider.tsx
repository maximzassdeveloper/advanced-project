import { FC, useState } from 'react'
import {
  CommonContext,
  CommonContextValue,
  SIDEBAR_lOCAL_STORAGE_KEY,
} from './CommonContext'

const sidebarFromStorage =
  localStorage.getItem(SIDEBAR_lOCAL_STORAGE_KEY) === 'true'

export const CommonProvider: FC = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(sidebarFromStorage)

  const defaultValue: CommonContextValue = {
    sidebarCollapsed,
    setSidebarCollapsed,
  }

  return (
    <CommonContext.Provider value={defaultValue}>
      {children}
    </CommonContext.Provider>
  )
}
