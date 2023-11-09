import React, { useState, ChangeEvent } from 'react'

// Define the type for the props expected by the component
type PageFillTestProps = {
  template: string
}

// Define the type for each part in the state
type Part = {
  text: string
  editable: boolean
  id: number
}

const PageFillTest: React.FC<PageFillTestProps> = ({ template }) => {
  // Initial state setup with TypeScript type inference
  const [parts, setParts] = useState<Part[]>(
    template.split(/(______)/g).map((part, index) => ({
      text: part,
      editable: part === '______',
      id: index,
    })),
  )
  // const [resultText, setResultText] = useState<string>('')

  // Handle input change with TypeScript for event type
  const handleInputChange = (text: string, id: number) => {
    setParts(parts.map((part) => (part.id === id ? { ...part, text } : part)))
  }

  // Uncommented and updated handleSubmit function
  // const handleSubmit = () => {
  //   const userFilledText = parts.map((part) => part.text).join('')
  //   setResultText(userFilledText) // Save the filled-in string into state

  // Code to send userFilledText to the backend would go here
  // axios.post('/api/submit', { answer: userFilledText })
  //   .then(response => {
  //     // Handle the server response here
  //   })
  //   .catch(error => {
  //     // Handle errors here
  //   });
  // }
  // console.log(resultText, 'resultText')

  return (
    <div>
      {parts.map((part, index) =>
        part.editable ? (
          <input
            key={index}
            type='text'
            value={part.text.replace(/______/g, '')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, part.id)}
            style={{ width: '100px', height: '30px', fontWeight: 700, fontSize: '16px' }}
          />
        ) : (
          <span key={index} style={{ margin: '0 2px', fontSize: '16px' }}>
            {part.text}
          </span>
        ),
      )}
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </div>
  )
}

export default PageFillTest
