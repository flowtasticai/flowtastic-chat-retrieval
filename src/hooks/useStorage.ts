import { useCallback, useEffect, useState } from 'react'

export const useStorage = <T>(
  key: string,
  defaufaultValue?: T
): [T | undefined, (value?: T) => void, { isLoading: boolean }] => {
  const [value, setValue] = useState<T>()
  const [isLoading, setIsLoading] = useState(true)

  const storeValue = useCallback(
    (value?: T) => {
      if (typeof localStorage === 'undefined') return
      if (value == undefined) {
        localStorage.removeItem(key)
        setValue(undefined)
      } else {
        localStorage.setItem(key, JSON.stringify(value))
        setValue(value)
      }
    },
    [key]
  )

  useEffect(() => {
    const storedValue = localStorage.getItem(key)
    if (storedValue != null) {
      setValue(JSON.parse(storedValue))
    } else if (defaufaultValue != undefined) {
      storeValue(defaufaultValue)
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, storeValue])

  return [value, storeValue, { isLoading }]
}
