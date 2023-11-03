import { Configs } from '@/types/configs.type'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const getConfigFromLS = () => {
  const result = localStorage.getItem('configs')
  return result ? JSON.parse(result) : null
}

export const setConfigFromLS = (configs: Configs) => {
  localStorage.setItem('configs', JSON.stringify(configs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setProfileToLS = (profile: any) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
