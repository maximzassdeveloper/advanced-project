import { Typography } from '.'

export default {
  title: 'shared/Typography',
  component: Typography,
}

export const TextSizes = () => (
  <div>
    <Typography.Text size='xl'>Text XL</Typography.Text>
    <Typography.Text size='l'>Text L</Typography.Text>
    <Typography.Text size='m'>Text M</Typography.Text>
    <Typography.Text size='s'>Text S</Typography.Text>
    <Typography.Text size='xs'>Text XS</Typography.Text>
    <Typography.Text size='xxs'>Text XXS</Typography.Text>
  </div>
)

export const TextWeights = () => (
  <div>
    <Typography.Text size='l' weight='800'>
      Text ExtraBold (800)
    </Typography.Text>
    <Typography.Text size='l' weight='700'>
      Text Bold (700)
    </Typography.Text>
    <Typography.Text size='l' weight='600'>
      Text SemiBold (600)
    </Typography.Text>
    <Typography.Text size='l' weight='500'>
      Text Medium (500)
    </Typography.Text>
    <Typography.Text size='l' weight='400'>
      Text Regular (400)
    </Typography.Text>
  </div>
)

export const TitleLevels = () => (
  <div>
    <Typography.Title level='h1'>Title H1</Typography.Title>
    <Typography.Title level='h2'>Title H2</Typography.Title>
    <Typography.Title level='h3'>Title H3</Typography.Title>
    <Typography.Title level='h4'>Title H4</Typography.Title>
    <Typography.Title level='h5'>Title H5</Typography.Title>
    <Typography.Title level='h6'>Title H6</Typography.Title>
  </div>
)

export const Themes = () => (
  <div>
    <Typography.Text theme='default'>Default</Typography.Text>
    <Typography.Text theme='success'>Success</Typography.Text>
    <Typography.Text theme='error'>Error</Typography.Text>
  </div>
)
