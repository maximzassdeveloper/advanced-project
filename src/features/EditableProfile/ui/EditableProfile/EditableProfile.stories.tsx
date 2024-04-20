import { Meta, StoryObj } from '@storybook/react'
import { EditableProfile } from './EditableProfile'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { profileReducer } from '../../model/slice/profileSlice'
import { Profile, ProfileError } from '../../model/types/profile'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

const meta: Meta<typeof EditableProfile> = {
  title: 'features/EditableProfile',
  component: EditableProfile,
}

export default meta
type Story = StoryObj<typeof EditableProfile>

const defaultData: Profile = {
  id: '1',
  username: 'alexmac',
  fullName: 'Alex',
  birthday: '',
  country: Country.RUSSIA,
  currency: Currency.RUB,
  // eslint-disable-next-line
  avatar: `https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1008`,
}

export const Default: Story = {
  render: () => <EditableProfile profileId='' />,
  decorators: [
    (...args) =>
      StoreDecorator(...args)(
        {
          profile: { data: defaultData, isReadonly: true, isLoading: false },
        },
        { profile: profileReducer }
      ),
  ],
}

export const OwnerPreview: Story = {
  render: () => <EditableProfile profileId='' />,
  decorators: [
    (...args) =>
      StoreDecorator(...args)(
        {
          profile: { data: defaultData, isReadonly: true, isLoading: false },
          user: { auth: { id: '1', username: '' } },
        },
        { profile: profileReducer }
      ),
  ],
}

export const OwnerEdit: Story = {
  render: () => <EditableProfile profileId='' />,
  decorators: [
    (...args) =>
      StoreDecorator(...args)(
        {
          profile: { data: defaultData, isReadonly: false, isLoading: false },
          user: { auth: { id: '1', username: '' } },
        },
        { profile: profileReducer }
      ),
  ],
}

export const WithLoading: Story = {
  render: () => <EditableProfile profileId='' />,
  decorators: [
    (...args) =>
      StoreDecorator(...args)(
        { profile: { data: defaultData, isReadonly: true, isLoading: true } },
        { profile: profileReducer }
      ),
  ],
}

export const WithError: Story = {
  render: () => <EditableProfile profileId='' />,
  decorators: [
    (...args) =>
      StoreDecorator(...args)(
        {
          profile: {
            data: defaultData,
            isReadonly: false,
            isLoading: false,
            error: ProfileError.UNKNOWN,
          },
        },
        { profile: profileReducer }
      ),
  ],
}
