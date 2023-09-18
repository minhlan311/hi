import React, { createContext, useContext, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
}
type Props = {
  children: React.ReactNode
}
const SocketContext = createContext<SocketContextType>({ socket: null })

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SERVICE_ENDPOINT)
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = (): Socket | null => {
  const { socket } = useContext(SocketContext)

  if (socket === null) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return socket
}
