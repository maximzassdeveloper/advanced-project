import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { userActions } from '../slice/userSlice'

const actions = { ...userActions }

export const useUserActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}
