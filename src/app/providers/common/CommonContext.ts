import { createContext, Dispatch, SetStateAction } from 'react'

export interface CommonContextValue {
  sidebarCollapsed: boolean
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>
}

export const CommonContext = createContext({} as CommonContextValue)

export const SIDEBAR_lOCAL_STORAGE_KEY = 'sidebar'
