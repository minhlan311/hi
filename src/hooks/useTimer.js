import { useEffect, useState } from 'react'

const useTimer = (start, time) => {
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        if (start) {
            const interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1)
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [start, time, seconds])

    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(remainingSeconds).padStart(2, '0')
    return (
        <div
            style={{ color: seconds >= (time * 90) / 100 ? 'red' : 'black' }}
        >{`${formattedMinutes} : ${formattedSeconds}`}</div>
    )
}

export default useTimer
