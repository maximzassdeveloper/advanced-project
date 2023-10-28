import { SkeletonButton } from './SkeletonButton'
import { SkeletonText } from './SkeletonText'
import { SkeletonAvatar } from './SkeletonAvatar'
import { SkeletonBlock } from './SkeletonBlock'

type SkeletonType = {
  Button: typeof SkeletonButton
  Typography: typeof SkeletonText
  Avatar: typeof SkeletonAvatar
  Block: typeof SkeletonBlock
}

const Skeleton = {} as SkeletonType

Skeleton.Button = SkeletonButton
Skeleton.Typography = SkeletonText
Skeleton.Avatar = SkeletonAvatar
Skeleton.Block = SkeletonBlock

export default Skeleton
