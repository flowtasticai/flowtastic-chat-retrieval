import { FC, useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useUpload } from 'hooks/useUpload'
import { Spinner } from 'components/Spinner'
import { FileMessage } from 'types'
import { awaitRun } from 'helpers'

export const FileMessageContent: FC<FileMessage> = ({ content }) => {
  const [{ fetching, progress }, uploadFile] = useUpload()
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setFinished(false)
    uploadFile(content).then(async (file) => {
      await awaitRun(
        process.env.NEXT_PUBLIC_INGEST_WORKFLOW,
        { [process.env.NEXT_PUBLIC_INGEST_INPUT]: { id: file.id } },
        process.env.NEXT_PUBLIC_INGEST_OUTPUT
      )

      setFinished(true)
    })
  }, [content])

  return (
    <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
      <li className="flex items-center">
        {fetching ? (
          <Spinner className="mr-1.5" size="xs" />
        ) : (
          <CheckIcon className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" />
        )}
        <span className="flex gap-1">
          Uploading
          <span className="font-semibold max-w-[12rem] text-ellipsis overflow-hidden">
            {content.name}
          </span>
          {fetching && `${progress.toFixed()}%`}
        </span>
      </li>
      {!fetching && (
        <li className="flex items-center">
          {!finished ? (
            <Spinner className="mr-1.5" size="xs" />
          ) : (
            <CheckIcon className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" />
          )}
          Ingesting ...
        </li>
      )}
    </ul>
  )
}
