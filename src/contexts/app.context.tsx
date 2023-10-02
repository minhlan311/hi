import { CodeState } from '@/interface/code'
import { CoursesState } from '@/interface/coursesData'
import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth'
import { QuestionState } from '@/interface/question'
import { UserState } from '@/interface/user'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCode, getFavorite, getOrder, setCodeFromLS, setFavoriteFromLS, setOrderFromLS } from '@/utils/cart'
import { getQuestionsList, setQuestionsListFromLS } from '@/utils/questons'

interface AppContextInterface {
  isAuthenticated: boolean
  scaleScreen: boolean
  setScaleScreen: React.Dispatch<React.SetStateAction<boolean>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: UserState
  setProfile: React.Dispatch<React.SetStateAction<UserState>>
  order: CoursesState[]
  setOrder: React.Dispatch<React.SetStateAction<CoursesState[]>>
  questionList: QuestionState[]
  setQuestionList: React.Dispatch<React.SetStateAction<QuestionState[]>>
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
  questionList: getQuestionsList(),
  setQuestionList: () => {},
  favorite: getFavorite(),
  setFavorite: () => {},
  code: getCode(),
  setCode: () => {},
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<UserState>(initialAppContext.profile)
  const [order, setOrder] = useState<CoursesState[]>(initialAppContext.order)
  const [questionList, setQuestionList] = useState<QuestionState[]>(initialAppContext.questionList)
  const [favorite, setFavorite] = useState<CoursesState[]>(initialAppContext.favorite)
  const [code, setCode] = useState<CodeState[]>(initialAppContext.code)
  const [scaleScreen, setScaleScreen] = useState<boolean>(initialAppContext.scaleScreen)

  const addItemToStateArray = (
    setStateFunction: React.Dispatch<React.SetStateAction<any>>,
    item: any,
    setLocalFunction: React.Dispatch<React.SetStateAction<any>>,
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
        questionList,
        setQuestionList: (item) => addItemToStateArray(setQuestionList, item, setQuestionsListFromLS),
        favorite,
        setFavorite: (item) => addItemToStateArray(setFavorite, item, setFavoriteFromLS),
        code,
        setCode: (item) => addItemToStateArray(setCode, item, setCodeFromLS),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
