/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'

const SpeechToText: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  useEffect(() => {
    const SpeechRecognition: any = {}

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()

      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('')
        setText(transcript)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      if (isListening) {
        recognition.start()
      } else {
        recognition.stop()
      }
    } else {
      console.error('SpeechRecognition is not supported in this browser.')
    }
  }, [isListening])

  const toggleListening = () => {
    setIsListening(!isListening)
  }

  return (
    <div>
      <button onClick={toggleListening}>{isListening ? 'Stop Listening' : 'Start Listening'}</button>
      <p>{text}</p>
    </div>
  )
}

export default SpeechToText
