export const setStorage = ({ key, val }: any) => {
  localStorage.setItem(key, JSON.stringify(val))
}

export const getStorage = (key: any) => {
  const stored = localStorage.getItem(key)
  return stored === null ? undefined : JSON.parse(stored)
}

export const removeStorage = (key: any) => {
  localStorage.removeItem(key)
}
