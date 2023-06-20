export type UserMessage = {
  id: string
  type: 'user'
  content: string
  date: Date
}

export type SystemMessage = {
  id: string
  type: 'system'
  content: string
  date: Date
}

export type FileMessage = {
  id: string
  type: 'file'
  content: File
  date: Date
}

export type Message = UserMessage | SystemMessage | FileMessage
