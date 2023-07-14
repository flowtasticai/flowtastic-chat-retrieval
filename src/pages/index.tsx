import { Layout } from 'components/Layout'
import { useCallback, useState } from 'react'
import {
  awaitRun,
  createFileMessage,
  createSystemMessage,
  createUserMessage,
} from 'helpers'
import { Message } from 'types'
import { InputBar } from 'components/InputBar'
import { Messages } from 'components/Messages'
import { useStorage } from 'hooks/useStorage'

const WORKFLOW_ID = process.env.NEXT_PUBLIC_QUERY_WORKFLOW
const INPUT_ID = process.env.NEXT_PUBLIC_QUERY_INPUT
const OUTPUT_ID = process.env.NEXT_PUBLIC_QUERY_OUTPUT
const WITH_MEMORY = process.env.NEXT_PUBLIC_QUERY_WITH_MEMORY === 'true'
const USER_ID = process.env.NEXT_PUBLIC_QUERY_USER_INPUT

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

      const inputs = { [INPUT_ID]: message }

      if (WITH_MEMORY && userId) {
        inputs[USER_ID] = userId
      }

      const output = await awaitRun(WORKFLOW_ID, inputs, OUTPUT_ID)

      setWaiting(false)
      setMessages((messages) => [
        ...messages,
        createSystemMessage(String(output)),
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
