import { FC, ReactNode } from 'react'
import cx from 'classnames'
import { Spinner } from 'components/Spinner'
import { SystemAvatar } from './SystemAvatar'
import { UserAvatar } from './UserAvatar'
import type { Message } from 'types'
import { UserMessageContent } from './UserMessageContent'
import { SystemMessageContent } from './SystemMessageContent'
import { FileMessageContent } from './FileMessageContent'

export const Messages: FC<{ messages: Message[]; waiting: boolean }> = ({
  messages,
  waiting,
}) => {
  return (
    <div className="h-full">
      <div className="absolute top-0 left-0 right-0 bottom-20 p-4 flex flex-col gap-8 overflow-auto">
        {messages.map((message) => (
          <DefaultMessage key={message.id} {...message} />
        ))}
        {waiting && (
          <MessageContainer avatar={<SystemAvatar />} orientation="left">
            <Spinner size="sm" />
          </MessageContainer>
        )}
      </div>
    </div>
  )
}

export const MessageContainer: FC<{
  avatar: ReactNode
  children: ReactNode
  orientation: 'left' | 'right'
}> = ({ avatar, children, orientation }) => {
  return (
    <div
      className={cx('flex gap-2 max-w-2xl items-end', {
        'self-end flex-row-reverse': orientation === 'right',
      })}
    >
      {avatar}
      <div className="lock max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
        {children}
      </div>
    </div>
  )
}

export const DefaultMessage: FC<Message> = (message) => {
  const orientation = message.type === 'system' ? 'left' : 'right'

  return (
    <MessageContainer
      avatar={message.type === 'system' ? <SystemAvatar /> : <UserAvatar />}
      orientation={orientation}
    >
      {message.type === 'user' ? (
        <UserMessageContent {...message} />
      ) : message.type === 'system' ? (
        <SystemMessageContent {...message} />
      ) : (
        <FileMessageContent {...message} />
      )}
    </MessageContainer>
  )
}
