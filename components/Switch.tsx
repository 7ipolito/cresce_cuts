import React, { useEffect, useState } from 'react'

// import { Container } from './styles';

type SwitchProps = {
  onClick?: (checked: boolean) => any
  role?: string
  control?: 'activeAll' | 'desactiveAll' | ''
  checked?: boolean
}

const Switch = ({
  onClick,
  control = '',
  role,
  checked = false,
}: SwitchProps) => {
  const [checkedState, setCheckedState] = useState(checked)

  useEffect(() => {
    if (control == 'activeAll') {
      setCheckedState(false)
    } else if (control == 'desactiveAll') {
      setCheckedState(true)
    }
  }, [control])

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        role={role}
        type="checkbox"
        className="peer sr-only"
        checked={checkedState}
        onClick={onClick ? onClick(checkedState) : {}}
        onChange={() => setCheckedState(!checkedState)}
      />
      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
    </label>
  )
}

export default Switch
