import { UserState } from '@/interface/user'
import { Configs } from '@/types/configs.type'
import { getAccessTokenFromLS, getConfigFromLS, getProfileFromLS } from '@/utils/auth'
import { getQuestionsList } from '@/utils/questons'
import { createContext, useState } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */

interface AppContextInterface {
  isAuthenticated: boolean
  volume: number
  start: boolean
  setVolume: React.Dispatch<React.SetStateAction<number>>
  scaleScreen: boolean
  setScaleScreen: React.Dispatch<React.SetStateAction<boolean>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: UserState
  configs: Configs
  setConfigs: React.Dispatch<React.SetStateAction<Configs>>
  setProfile: React.Dispatch<React.SetStateAction<UserState>>
  questionList: { _id: string; data: string[] }[]
  setQuestionList: React.Dispatch<React.SetStateAction<{ _id: string; data: string[] }[]>>
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  volume: 50,
  start: false,
  configs: getConfigFromLS(),
  scaleScreen: false,
  setScaleScreen: () => {},
  setIsAuthenticated: () => {},
  setVolume: () => {},
  profile: getProfileFromLS(),
  setProfile: () => {},
  setConfigs: () => {},
  questionList: getQuestionsList(),
  setQuestionList: () => {},
  setStart: () => {},
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<UserState>(initialAppContext.profile)
  const [questionList, setQuestionList] = useState<{ _id: string; data: string[] }[]>(initialAppContext.questionList)
  const [scaleScreen, setScaleScreen] = useState<boolean>(initialAppContext.scaleScreen)
  const [configs, setConfigs] = useState<Configs>(initialAppContext.configs)
  const [volume, setVolume] = useState<number>(initialAppContext.volume)
  const [start, setStart] = useState<boolean>(initialAppContext.start)

  return (
    <AppContext.Provider
      value={{
        setConfigs,
        volume,
        setVolume,
        start,
        setStart,
        configs,
        scaleScreen,
        setScaleScreen,
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        questionList,
        setQuestionList,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
