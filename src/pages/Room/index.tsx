import { FC, useRef, useState, useEffect } from 'react'
import { useSocket } from '@/lib/providers/socket'
import { SocketModule } from '@/constants'
import './index.scss'
import { getIceServer } from './helper'
// import { getIceServer }

const Room: FC = () => {
  console.log('a')

  const [pc, setPc] = useState<Array<string | object>>([])
  // const [screen, setScreen] = useState<object | null>(null)
  const [socketId, setSocketId] = useState<string>('')

  const execute = (data) => {
    console.log('data', data)

    switch (data.name) {
      case 'newUser':
        console.log('new user')

        setSocketId(data.data.socketId)
        setPc((current) => [...current, data.data.socketId])
        setPc((current) => [...current, { [data.data.socketId]: new RTCPeerConnection(getIceServer()) }])
    }
  }

  const socket = useSocket()

  useEffect(() => {
    socket?.on('connect', () => {
      console.log('connect')
    })
  }, [socket])

  useEffect(() => {
    const index = pc.indexOf(socketId)
    console.log(index)
    console.log(pc)
  }, [pc, socketId])

  const videoBlock = useRef<HTMLDivElement>(null)

  return (
    <div id='room'>
      <div id='room__video' ref={videoBlock}></div>
    </div>
  )
}

export default Room
