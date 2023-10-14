import { ComponentStory, ComponentMeta } from '@storybook/react'
import { EditableProfile } from './EditableProfile'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { profileReducer } from '../../model/slice/profileSlice'
import { Profile, ProfileError } from '../../model/types/profile'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

export default {
  title: 'features/EditableProfile',
  component: EditableProfile,
} as ComponentMeta<typeof EditableProfile>

const Template: ComponentStory<typeof EditableProfile> = (args) => <EditableProfile {...args} />

const defaultData: Profile = {
  id: 1,
  username: 'alexmac',
  firstname: 'Alex',
  lastname: 'Mac',
  age: 23,
  city: 'Moscow',
  country: Country.RUSSIA,
  currency: Currency.RUB,
  // eslint-disable-next-line
  avatar: `https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1008`,
}

export const Default = Template.bind({})
Default.decorators = [
  StoreDecorator(
    { profile: { data: defaultData, isReadonly: true, isLoading: false } },
    { profile: profileReducer }
  ),
]

export const WithLoading = Template.bind({})
WithLoading.decorators = [
  StoreDecorator(
    { profile: { data: defaultData, isReadonly: true, isLoading: true } },
    { profile: profileReducer }
  ),
]

export const WithError = Template.bind({})
WithLoading.decorators = [
  StoreDecorator(
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
]
