import { useState, useEffect } from 'react'

const useDebounce = (term, delay) => {
  const [value, setValue] = useState(term)
  const [debouncedValue, setDebouncedValue] = useState(term)

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(debounce)
    }
  }, [value, delay])

  return [debouncedValue, setValue, value]
}

export default useDebounce