import { UserState } from '@/interface/user'
import { Configs } from '@/types/configs.type'
import { getAccessTokenFromLS, getConfigFromLS, getProfileFromLS } from '@/utils/auth'
import { getQuestionsList } from '@/utils/questons'
import { createContext, useState } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */

interface AppContextInterface {
  configs: Configs
  isAuthenticated: boolean
  profile: UserState
  questionList: { _id: string; data: string[] }[]
  scaleScreen: boolean
  start: boolean
  volume: number
  overView: { index: number; _id: string; anwser: any; anwserDetail: any }[]
  setConfigs: React.Dispatch<React.SetStateAction<Configs>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setProfile: React.Dispatch<React.SetStateAction<UserState>>
  setQuestionList: React.Dispatch<React.SetStateAction<{ _id: string; data: string[] }[]>>
  setScaleScreen: React.Dispatch<React.SetStateAction<boolean>>
  setStart: React.Dispatch<React.SetStateAction<boolean>>
  setVolume: React.Dispatch<React.SetStateAction<number>>
  setOverView: React.Dispatch<React.SetStateAction<{ index: number; _id: string; anwser: any; anwserDetail: any }[]>>
}

const initialAppContext: AppContextInterface = {
  configs: getConfigFromLS(),
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  profile: getProfileFromLS(),
  questionList: getQuestionsList(),
  scaleScreen: false,
  start: false,
  volume: 50,
  overView: [],
  setConfigs: () => {},
  setIsAuthenticated: () => {},
  setProfile: () => {},
  setQuestionList: () => {},
  setScaleScreen: () => {},
  setStart: () => {},
  setVolume: () => {},
  setOverView: () => {},
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [configs, setConfigs] = useState<Configs>(initialAppContext.configs)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<UserState>(initialAppContext.profile)
  const [questionList, setQuestionList] = useState<{ _id: string; data: string[] }[]>(initialAppContext.questionList)
  const [scaleScreen, setScaleScreen] = useState<boolean>(initialAppContext.scaleScreen)
  const [start, setStart] = useState<boolean>(initialAppContext.start)
  const [volume, setVolume] = useState<number>(initialAppContext.volume)
  const [overView, setOverView] = useState<{ index: number; _id: string; anwser: any; anwserDetail: any }[]>(
    initialAppContext.overView,
  )

  return (
    <AppContext.Provider
      value={{
        configs,
        isAuthenticated,
        profile,
        questionList,
        scaleScreen,
        start,
        volume,
        overView,
        setConfigs,
        setIsAuthenticated,
        setProfile,
        setQuestionList,
        setScaleScreen,
        setStart,
        setVolume,
        setOverView,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
