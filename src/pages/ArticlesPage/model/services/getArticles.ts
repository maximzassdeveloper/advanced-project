import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/store'
import { Article } from '@/entities/Article'
import { ArticleSortBy } from '@/entities/Article/model/const'
import { STANDART_API_ERRORS } from '@/shared/api/apiError'
import { allArticlesSelectors, articlesActions } from '../slices/articlesSlice'
import { getPaginationFirstLast } from '../utils/getPaginationData'

export const getArticles = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'articles/getArticles',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    const page = allArticlesSelectors.getPageSelector(state)
    const sortBy = allArticlesSelectors.getSortBySelector(state)
    const limit = allArticlesSelectors.getLimitSelector(state)
    const search = allArticlesSelectors.getSearchSelector(state)
    const category = allArticlesSelectors.getCategorySelector(state)

    try {
      const response = await thunkAPI.extra.api.get('/articles', {
        params: {
          _page: page,
          _sort: sortBy === ArticleSortBy.POPULAR ? 'views' : 'created_at',
          _order: sortBy ? 'asc' : undefined,
          _limit: limit,
          q: search,
          category,
        },
      })

      if (!response.data) {
        return thunkAPI.rejectWithValue(STANDART_API_ERRORS.SERVER)
      }

      const { first, last } = getPaginationFirstLast(response.headers.link)
      thunkAPI.dispatch(articlesActions.setFirst(first))
      thunkAPI.dispatch(articlesActions.setLast(last))

      return response.data
    } catch {
      return thunkAPI.rejectWithValue(STANDART_API_ERRORS.UNKNOWN)
    }
  }
)
