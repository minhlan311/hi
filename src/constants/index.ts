export const enum SocketModule {
  LIVE = 'live',
}
interface PrototypeStream {
  video: boolean
  audio: boolean
}
export const streamFull = { video: true, audio: true }
export const streamAudio = { video: false, audio: true }

export const getStream = async (prototype: PrototypeStream) => {
  const stream = await navigator.mediaDevices.getUserMedia(prototype)

  return stream
}

export interface DataRoom {
  socketId: string
  name: string
}

export const FORM_TYPE = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
}

export enum TypeLessonEnum {
  VIDEO_LESSON = 'VIDEO',
  EXAM = 'TEST',
  LIVE_LESSON = 'LIVE',
  DOCUMENT_LESSON = 'DOCUMENT',
}
