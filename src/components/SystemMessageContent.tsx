import { FC } from 'react'
import { SystemMessage } from 'types'

export const SystemMessageContent: FC<SystemMessage> = ({ content }) => {
  return <span>{content}</span>
}
