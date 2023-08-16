import { api } from 'hooks/client'
import { FileMessage, SystemMessage, UserMessage } from 'types'

import { HttpResponse } from '@flowtastic/api-client';

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
  });

  return new Promise((resolve, reject) => {
    let tries = 0;
    const interval = setInterval(async () => {
      const responseResults: HttpResponse<Record<string, any>> = await api.runs.getResults(id);
      const results = responseResults.data;

      if (results.hasOwnProperty(outputId)) {
        const answer = results[outputId];

        if (answer !== undefined || answer !== null) {
          clearInterval(interval);
          resolve(answer);
          return;
        }
      }

      if (++tries > 60) {
        clearInterval(interval);
        reject(new Error('Timed out waiting for run to complete'));
        return;
      }
    }, 1000);
  });
};

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
