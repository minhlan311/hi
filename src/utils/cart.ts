import { CodeState } from '@/interface/code'
import { CoursesState } from '@/interface/coursesData'

export const LocalStorageEventTarget = new EventTarget()

export const remoteOrder = () => {
  localStorage.removeItem('order')
  const remoteOrderEvent = new Event('remoteOrder')
  LocalStorageEventTarget.dispatchEvent(remoteOrderEvent)
}

export const getOrder = () => {
  const result = localStorage.getItem('order')

  return result ? JSON.parse(result) : null
}

export const setOrderFromLS = (order: CoursesState[]) => {
  localStorage.setItem('order', JSON.stringify(order))
}

export const remoteWhiteList = () => {
  localStorage.removeItem('whiteList')
  const remoteWhiteListEvent = new Event('remoteWhiteList')
  LocalStorageEventTarget.dispatchEvent(remoteWhiteListEvent)
}

export const getWhiteList = () => {
  const result = localStorage.getItem('whiteList')
  return result ? JSON.parse(result) : null
}

export const setWhiteListFromLS = (whiteList: CoursesState[]) => {
  localStorage.setItem('whiteList', JSON.stringify(whiteList))
}

export const remoteFavorite = () => {
  localStorage.removeItem('favorite')
  const remoteFavoriteEvent = new Event('remoteFavorite')
  LocalStorageEventTarget.dispatchEvent(remoteFavoriteEvent)
}

export const getFavorite = () => {
  const result = localStorage.getItem('favorite')
  return result ? JSON.parse(result) : null
}

export const setFavoriteFromLS = (favorite: CoursesState[]) => {
  localStorage.setItem('favorite', JSON.stringify(favorite))
}

export const remoteCode = () => {
  localStorage.removeItem('code')
  const remoteFavoriteEvent = new Event('remoteCode')
  LocalStorageEventTarget.dispatchEvent(remoteFavoriteEvent)
}

export const getCode = () => {
  const result = localStorage.getItem('code')
  return result ? JSON.parse(result) : null
}

export const setCodeFromLS = (code: CodeState[]) => {
  localStorage.setItem('code', JSON.stringify(code))
}
