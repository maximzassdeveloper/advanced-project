import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useAppDispatch } from '@/shared/hooks'
import { articlesActions } from '../slices/articlesSlice'
import { getArticles } from '../services/getArticles'

export const useArticlesActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(
    () => bindActionCreators({ ...articlesActions, getArticles }, dispatch),
    [dispatch]
  )
}
