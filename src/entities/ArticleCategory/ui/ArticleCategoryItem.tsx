import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Row, Text, Title } from '@/shared/ui'
import { routePaths } from '@/shared/config/routeConfig'
import { ArticleCategory } from '../model/types'
import { cutNumber } from '@/shared/lib/cutNumber'

interface ArticleCategoryItemProps {
  category: ArticleCategory
}

export const ArticleCategoryItem: FC<ArticleCategoryItemProps> = (props) => {
  const { name, slug, authours_count, publications_count } = props.category
  const { t } = useTranslation(['articles'])

  return (
    <div>
      <Title level='h4' size='m' weight='800' className='mb-4 hover-underline'>
        <Link className='full-width d-block' to={routePaths.articles()}>
          {name}
        </Link>
      </Title>
      <Row gap={4}>
        <Text size='xxs'>
          {cutNumber(publications_count)}{' '}
          {t('articles:publications', { count: publications_count })}
        </Text>
        <Text size='xxs'>
          {cutNumber(authours_count)} {t('articles:authors', { count: authours_count })}
        </Text>
      </Row>
    </div>
  )
}
