import { useState } from 'react'

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  const clear = () => setValue('')

  const setInitialValue = (value) => setValue(value)

  return {
    bind: { value, onChange },
    value,
    clear,
    setInitialValue
  }
}

export default useInput


