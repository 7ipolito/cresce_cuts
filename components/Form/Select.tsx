/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SelectHTMLAttributes } from 'react'

// import { Container } from './styles';
interface Option extends SelectHTMLAttributes<HTMLSelectElement> {
  text: string
  value: string
  isSelected?: boolean
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  onChange: (e: any) => void
  options: Option[]
}
const Select = ({ name, onChange, options, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      name={name}
      id={name}
      onChange={(e) => onChange(e)}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  )
}

export default Select
