import { localStorageKeys } from '../utils/common'
import { debounce } from './common'

export let reducers: any = {}
export let persist: any = {}
let emitChange: any = null

export const register = (name: any, reducer: any, persistKeys: any) => {
  if (persistKeys) persist[name] = persistKeys
  reducers = { ...reducers, [name]: reducer }
  if (emitChange) {
    emitChange(reducers)
  }
}

export const setChangeListener = (listener: any) => {
  emitChange = listener
}

export const syncInitialState = ({ name, initialState, persistKeys }: any) => {
  const data = getStoragePersistData()[name]
  if (!data) {
    return initialState
  }

  if (!persistKeys) {
    persistKeys = Object.keys(initialState)
  }

  return persistKeys.reduce(
    (prev: any, curr: any) => (data.hasOwnProperty(curr) ? { ...prev, [curr]: data[curr] } : prev),
    { ...initialState }
  )
}

export const getStatePersistData = (state: any) => {
  return Object.keys(persist).reduce(
    (data, key) => ({
      ...data,
      [key]: persist[key].reduce(
        (sliceData: any, sliceKey: any) => ({
          ...sliceData,
          [sliceKey]: state[key][sliceKey]
        }),
        {}
      )
    }),
    {}
  )
}

export const getStoragePersistData = () => {
  return JSON.parse(localStorage.getItem(localStorageKeys.KEY_PERSIST_STORE) as string) || {}
}

export const setStoragePersistData = (data: any) => {
  localStorage.setItem(localStorageKeys.KEY_PERSIST_STORE, JSON.stringify(data))
}

export const debounceSetStoragePersistData = debounce((store: any) => {
  const stateData = getStatePersistData(store.getState())
  const storageData = getStoragePersistData()
  setStoragePersistData({ ...storageData, ...stateData })
}, 500)
