import { FC } from 'react'
import { useParams, redirect } from 'react-router-dom'
import { EditableProfile } from '@/features/EditableProfile'
import { routePaths } from '@/shared/config/routeConfig'

const ProfilePage: FC = () => {
  const { id } = useParams<{ id: string }>()

  if (id === undefined) {
    redirect(routePaths.notFound())
    return null
  }

  return <EditableProfile profileId={id} />
}

export default ProfilePage
