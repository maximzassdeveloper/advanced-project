import { Typography } from '.'

export default {
  title: 'shared/Typography',
  component: Typography,
}

export const TextSizes = () => (
  <div>
    <Typography.Text size='s'>Text S</Typography.Text>
    <Typography.Text size='m'>Text M</Typography.Text>
    <Typography.Text size='l'>Text L</Typography.Text>
  </div>
)

export const TitleSizes = () => (
  <div>
    <Typography.Title size='s'>Title S</Typography.Title>
    <Typography.Title size='m'>Title M</Typography.Title>
    <Typography.Title size='l'>Title L</Typography.Title>
    <Typography.Title size='xl'>Title XL</Typography.Title>
  </div>
)

export const TitleLevels = () => (
  <div>
    <Typography.Title level='h1'>Title h1</Typography.Title>
    <Typography.Title level='h2'>Title h2</Typography.Title>
    <Typography.Title level='h3'>Title h3</Typography.Title>
    <Typography.Title level='h4'>Title h4</Typography.Title>
    <Typography.Title level='h5'>Title h5</Typography.Title>
  </div>
)

export const Themes = () => (
  <div>
    <Typography.Text theme='default'>Default</Typography.Text>
    <Typography.Text theme='success'>Success</Typography.Text>
    <Typography.Text theme='error'>Error</Typography.Text>
  </div>
)
