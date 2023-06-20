import { FC } from 'react'
import { UserIcon } from '@heroicons/react/24/outline'

export const UserAvatar: FC = () => {
  return (
    <div className="p-2.5 rounded-full bg-gray-700">
      <UserIcon className="w-8 h-8" />
    </div>
  )
}
