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

const WORKFLOW_ID = process.env.NEXT_PUBLIC_QUERY_WORKFLOW
const INPUT_ID = process.env.NEXT_PUBLIC_QUERY_INPUT
const OUTPUT_ID = process.env.NEXT_PUBLIC_QUERY_OUTPUT

export default function IndexPage() {
  const [messages, setMessages] = useState<Message[]>([
    createSystemMessage('Welcome, human. What can i help you with?'),
  ])
  const [waiting, setWaiting] = useState(false)

  const handleAddFile = useCallback((file: File) => {
    setMessages((messages) => [...messages, createFileMessage(file)])
  }, [])

  const handleAddMessage = useCallback(async (message: string) => {
    setMessages((messages) => [...messages, createUserMessage(message)])
    setWaiting(true)

    const output = await awaitRun(
      WORKFLOW_ID,
      { [INPUT_ID]: message },
      OUTPUT_ID
    )

    setWaiting(false)
    setMessages((messages) => [
      ...messages,
      createSystemMessage(String(output)),
    ])
  }, [])

  return (
    <Layout
      footer={<InputBar onFile={handleAddFile} onMessage={handleAddMessage} />}
    >
      <Messages messages={messages} waiting={waiting} />
    </Layout>
  )
}
