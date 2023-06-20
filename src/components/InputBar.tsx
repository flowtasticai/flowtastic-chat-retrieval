import { FC, FormEventHandler } from 'react'
import {
  DocumentPlusIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import { useDropzone } from 'react-dropzone'

export const InputBar: FC<{
  onFile: (file: File) => void
  onMessage: (message: string) => void
}> = ({ onFile, onMessage }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: async ([file]) => {
      onFile(file)
    },
    multiple: false,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const input = e.currentTarget.query as HTMLInputElement
    const { value: query } = input

    if (!query) {
      return
    }

    input.value = ''
    onMessage(query)
    return false
  }

  return (
    <form
      className="relative flex text-gray-900 dark:text-gray-400"
      onSubmit={handleSubmit}
    >
      <div
        {...getRootProps({
          className:
            'inline-flex items-center px-3 text-sm  bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:border-gray-600 hover:cursor-pointer',
        })}
      >
        <DocumentPlusIcon className="w-6 h-6" />
        <input {...getInputProps()} />
      </div>

      <input
        type="text"
        name="query"
        className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="What do you want to know?"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-2 flex items-center pl-3"
      >
        <PaperAirplaneIcon className="w-6 h-6" />
      </button>
    </form>
  )
}
