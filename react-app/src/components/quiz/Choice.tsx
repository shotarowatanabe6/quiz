import React from 'react'

interface ChoiceProps {
  choices: string[]
  optionalProp?: string
}

function Choice({ choices, optionalProp }: ChoiceProps) {
  const format = (choice: string) => '-' + choice + '-'

  const handleOnClick = (c: string) => {
    alert(c)
  }

  return (
    <div>
      {choices.map((c) => (
        <button
          onClick={() => {
            handleOnClick(c)
          }}
        >
          {format(c)}
        </button>
      ))}
    </div>
  )
}

export default Choice
