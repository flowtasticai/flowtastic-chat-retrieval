import { api } from 'hooks/client'
import { FileMessage, SystemMessage, UserMessage } from 'types'

export const makeIdGenerator = (): (() => string) => {
  let seq = 0
  return () => String(seq++)
}

const createId = makeIdGenerator()

export const createUserMessage = (content: string): UserMessage => ({
  id: createId(),
  type: 'user',
  content,
  date: new Date(),
})

export const createFileMessage = (content: File): FileMessage => ({
  id: createId(),
  type: 'file',
  content,
  date: new Date(),
})

export const createSystemMessage = (content: string): SystemMessage => ({
  id: createId(),
  type: 'system',
  content,
  date: new Date(),
})
