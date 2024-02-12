import axios from 'axios'
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit'
import { StateSchema, ThunkConfig, ThunkExtraArg } from '@/app/providers/store'

type ActionCreatorType<Returned, Arg, RejectValue> = (
  arg: Arg
) => AsyncThunkAction<Returned, Arg, ThunkConfig<RejectValue>>

jest.mock('axios')
const mockedAxios = jest.mocked(axios)

export class TestAsyncThunk<Returned, Arg, RejectValue> {
  dispatch: Dispatch
  getState: () => StateSchema
  extraArg: ThunkExtraArg
  actionCreator: ActionCreatorType<Returned, Arg, RejectValue>

  constructor(actionCreattor: ActionCreatorType<Returned, Arg, RejectValue>) {
    this.actionCreator = actionCreattor
    this.dispatch = jest.fn()
    this.getState = jest.fn()
    this.extraArg = { api: mockedAxios }
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg)
    const result = await action(this.dispatch, this.getState, this.extraArg)

    return result
  }
}
