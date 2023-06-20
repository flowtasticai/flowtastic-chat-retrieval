import axios from 'axios'
import { api } from './client.js'
import { FileDto } from '@revery/api-client'
import { useCallback, useState } from 'react'

export const useUpload = () => {
  const [fetching, setFetching] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = useCallback(async (file: File): Promise<FileDto> => {
    setFetching(true)
    setProgress(0)

    try {
      const { data: upload } = await api.uploads.create({
        name: file.name,
        size: file.size,
        type: file.type,
      })

      await axios.put(upload.url, file, {
        onUploadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
          )
          setProgress(percentCompleted)
        },
      })

      const res = await api.files.create({ upload: upload.id })
      return res.data
    } finally {
      setFetching(false)
    }
  }, [])

  return [{ fetching, progress }, upload] as const
}
