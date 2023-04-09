import axios from 'axios'
import { login } from './login'
import { userActions } from '@/entities/User'
import { TestAsyncThunk } from '@/shared/lib/test/TestAsyncThunk'
import { createAxiosError } from '@/shared/api/errorApi'
import { LoginError } from '../types/loginSchema'

jest.mock('axios')
const mockedAxios = jest.mocked(axios, true)

describe('login service test', () => {
  test('fulfilled status', async () => {
    const userValue = { id: 2, username: 'alex' }
    mockedAxios.post.mockResolvedValue(Promise.resolve({ data: userValue }))

    const thunk = new TestAsyncThunk(login)
    const result = await thunk.callThunk({ username: 'alex', password: '12345' })

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuth(userValue))
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(userValue)
  })

  test('rejected status with incorrect user', async () => {
    mockedAxios.post.mockRejectedValue(createAxiosError({ status: 403 }))

    const thunk = new TestAsyncThunk(login)
    const result = await thunk.callThunk({ username: 'alex', password: '1234' })

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe(LoginError.INCORRECT)
  })

  test('rejected status with empty response', async () => {
    mockedAxios.post.mockResolvedValue({})

    const thunk = new TestAsyncThunk(login)
    const result = await thunk.callThunk({ username: 'alex', password: '12345' })

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(mockedAxios.post).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe(LoginError.SERVER)
  })

  test('rejected status with unknown error', async () => {
    mockedAxios.post.mockRejectedValue(new Error())

    const thunk = new TestAsyncThunk(login)
    const result = await thunk.callThunk({ username: 'alex', password: '12345' })

    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe(LoginError.UNKNOWN)
  })
})
