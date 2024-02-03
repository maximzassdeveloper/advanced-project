import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/store'
import { ArticlesSchema } from '../types/articlesSchema'
import { Article, ArticleCategory, ArticleView } from '@/entities/Article'
import { getArticles } from '../services/getArticles'
import { ArticleSortBy } from '@/entities/Article/model/const'
import { generateSelectors } from '@/shared/lib/generateSelectors'

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
})

const initialState = articlesAdapter.getInitialState<ArticlesSchema>({
  isLoading: false,
  error: undefined,

  view: ArticleView.LIST,
  sortBy: ArticleSortBy.POPULAR,
  search: undefined,
  category: undefined,
  limit: 1,
  page: 1,
  first: 1,
  last: 1,

  entities: {},
  ids: [],
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setFirst: (state, action: PayloadAction<number>) => {
      state.first = action.payload
    },
    setLast: (state, action: PayloadAction<number>) => {
      state.last = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
    setSortBy: (state, action: PayloadAction<ArticleSortBy>) => {
      state.sortBy = action.payload
    },
    setCategory: (state, action: PayloadAction<ArticleCategory>) => {
      state.category = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false
        articlesAdapter.setAll(state, action.payload)
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      }),
})

export const allArticlesSelectors = generateSelectors('articles', initialState)

export const articlesSelectors = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articles ?? articlesAdapter.getInitialState()
)
export const articlesReducer = articlesSlice.reducer
export const articlesActions = articlesSlice.actions
