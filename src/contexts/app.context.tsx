/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from 'react'
import { CodeState } from '@/interface/code'
import { CoursesState } from '@/interface/coursesData'
import { UserState } from '@/interface/user'
import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth'
import {
  getCode,
  getFavorite,
  getOrder,
  getWhiteList,
  setCodeFromLS,
  setFavoriteFromLS,
  setOrderFromLS,
  setWhiteListFromLS
} from '@/utils/cart'

interface AppContextInterface {
  isAuthenticated: boolean
  scaleScreen: boolean
  setScaleScreen: React.Dispatch<React.SetStateAction<boolean>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: UserState
  setProfile: React.Dispatch<React.SetStateAction<UserState>>
  order: CoursesState[]
  setOrder: React.Dispatch<React.SetStateAction<CoursesState[]>>
  whiteList: CoursesState[]
  setWhiteList: React.Dispatch<React.SetStateAction<CoursesState[]>>
  favorite: CoursesState[]
  setFavorite: React.Dispatch<React.SetStateAction<CoursesState[]>>
  code: CodeState[]
  setCode: React.Dispatch<React.SetStateAction<any>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  scaleScreen: false,
  setScaleScreen: () => {},
  setIsAuthenticated: () => {},
  profile: getProfileFromLS(),
  setProfile: () => {},
  order: getOrder(),
  setOrder: () => {},
  whiteList: getWhiteList(),
  setWhiteList: () => {},
  favorite: getFavorite(),
  setFavorite: () => {},
  code: getCode(),
  setCode: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<UserState>(initialAppContext.profile)
  const [order, setOrder] = useState<CoursesState[]>(initialAppContext.order)
  const [whiteList, setWhiteList] = useState<CoursesState[]>(initialAppContext.whiteList)
  const [favorite, setFavorite] = useState<CoursesState[]>(initialAppContext.favorite)
  const [code, setCode] = useState<CodeState[]>(initialAppContext.code)
  const [scaleScreen, setScaleScreen] = useState<boolean>(initialAppContext.scaleScreen)

  const addItemToStateArray = (
    setStateFunction: React.Dispatch<React.SetStateAction<any>>,
    item: any,
    setLocalFunction: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setStateFunction((prevState: any) => {
      const newArr = Array.isArray(prevState) ? [...prevState, ...item] : item
      setLocalFunction(newArr)
      return newArr
    })
  }

  return (
    <AppContext.Provider
      value={{
        scaleScreen,
        setScaleScreen,
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        order,
        setOrder: (item) => addItemToStateArray(setOrder, item, setOrderFromLS),
        whiteList,
        setWhiteList: (item) => addItemToStateArray(setWhiteList, item, setWhiteListFromLS),
        favorite,
        setFavorite: (item) => addItemToStateArray(setFavorite, item, setFavoriteFromLS),
        code,
        setCode: (item) => addItemToStateArray(setCode, item, setCodeFromLS)
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
