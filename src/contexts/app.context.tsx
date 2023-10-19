import { UserState } from '@/interface/user'
import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth'
import { getQuestionsList } from '@/utils/questons'
import { createContext, useState } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */

interface AppContextInterface {
  isAuthenticated: boolean
  scaleScreen: boolean
  setScaleScreen: React.Dispatch<React.SetStateAction<boolean>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: UserState
  setProfile: React.Dispatch<React.SetStateAction<UserState>>
  questionList: string[]
  setQuestionList: React.Dispatch<React.SetStateAction<string[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  scaleScreen: false,
  setScaleScreen: () => {},
  setIsAuthenticated: () => {},
  profile: getProfileFromLS(),
  setProfile: () => {},
  questionList: getQuestionsList(),
  setQuestionList: () => {},
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<UserState>(initialAppContext.profile)
  const [questionList, setQuestionList] = useState<string[]>(initialAppContext.questionList)
  const [scaleScreen, setScaleScreen] = useState<boolean>(initialAppContext.scaleScreen)

  return (
    <AppContext.Provider
      value={{
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
