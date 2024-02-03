import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/store'
import { Article } from '@/entities/Article'
import { ArticleSortBy } from '@/entities/Article/model/const'
import { STANDART_API_ERRORS } from '@/shared/api/apiError'
import { allArticlesSelectors, articlesActions } from '../slices/articlesSlice'

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

      const paginationData = response.headers.link as string | undefined
      if (paginationData) {
        const matches = paginationData.split(',')
        matches.forEach((i) => {
          const matchResult = i.match(/((?<=rel=").+(?="))|((?<=_page=)\d+)/gi)
          if (matchResult?.length !== 2) return
          const [pageNum, name] = matchResult

          console.log(name, pageNum)

          if (name === 'first') {
            thunkAPI.dispatch(articlesActions.setFirst(+pageNum))
          } else if (name === 'last') {
            thunkAPI.dispatch(articlesActions.setLast(+pageNum))
          }
        })
      }

      return response.data
    } catch {
      return thunkAPI.rejectWithValue(STANDART_API_ERRORS.UNKNOWN)
    }
  }
)
