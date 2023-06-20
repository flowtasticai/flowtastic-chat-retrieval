import { FC } from 'react'
import { UserMessage } from 'types'

export const UserMessageContent: FC<UserMessage> = ({ content }) => {
  return <span>{content}</span>
}
