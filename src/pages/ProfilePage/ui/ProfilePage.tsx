import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { EditableProfile } from '@/features/EditableProfile'

const ProfilePage: FC = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div>not found</div>
  }

  return <EditableProfile profileId={id} />
}

export default ProfilePage
