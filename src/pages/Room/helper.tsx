export const getIceServer = () => {
  return {
    iceServers: [
      {
        urls: ['stun:103.90.228.54:3478']
      },
      {
        username: 'hiblue',
        credential: 'Zxcv!',
        urls: ['turn:103.90.228.54:3478?transport=udp']
      }
    ]
  }
}
