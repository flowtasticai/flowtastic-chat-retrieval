import { api } from 'hooks/client'
import { FileMessage, SystemMessage, UserMessage } from 'types'

export const awaitRun = async (
  workflowId: string,
  inputs: Record<string, unknown>,
  outputId: string
) => {
  const {
    data: { id },
  } = await api.runs.create({
    workflowId,
    inputs,
  })

  return new Promise((resolve, reject) => {
    let tries = 0
    const interval = setInterval(async () => {
      const { data: run } = await api.runs.get(id)

      if (run.results && outputId in run.results) {
        clearInterval(interval)
        resolve((run.outputs as Record<string, string>)[outputId])
        return
      }

      if (++tries > 30) {
        clearInterval(interval)
        reject(new Error('Timed out waiting for run to complete'))
        return
      }
    }, 1000)
  })
}

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
