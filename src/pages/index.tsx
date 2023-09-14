import { Layout } from 'components/Layout'
import { useCallback, useState } from 'react'
import {
  createFileMessage,
  createSystemMessage,
  createUserMessage,
} from 'helpers'
import { Message } from 'types'
import { InputBar } from 'components/InputBar'
import { Messages } from 'components/Messages'
import { useStorage } from 'hooks/useStorage'
import { api } from 'hooks/client'

const useMemory = process.env.NEXT_PUBLIC_QUERY_WITH_MEMORY === 'true'

export default function IndexPage() {
  const [messages, setMessages] = useState<Message[]>([
    createSystemMessage('Welcome, human. What can i help you with?'),
  ])
  const [waiting, setWaiting] = useState(false)
  const [userId] = useStorage<string>(
    'userId',
    // Yes, this is a very naive random string implementation. Use something
    // like cuid2 for production usage.
    String((Math.random() * Date.now()).toFixed())
  )

  const handleAddFile = useCallback((file: File) => {
    setMessages((messages) => [...messages, createFileMessage(file)])
  }, [])

  const handleAddMessage = useCallback(
    async (message: string) => {
      setMessages((messages) => [...messages, createUserMessage(message)])
      setWaiting(true)

      const inputs: Record<string, unknown> = { question: { text: message } }

      if (useMemory && userId) {
        inputs.user = { text: userId }
      }

      const { data: result } = await api.runs.create({
        workflowId: process.env.NEXT_PUBLIC_QUERY_WORKFLOW,
        mode: 'sync',
        inputs,
      })

      setWaiting(false)
      setMessages((messages) => [
        ...messages,
        createSystemMessage(String(result.results.answer.text)),
      ])
    },
    [userId]
  )

  return (
    <Layout
      footer={<InputBar onFile={handleAddFile} onMessage={handleAddMessage} />}
    >
      <Messages messages={messages} waiting={waiting} />
    </Layout>
  )
}
