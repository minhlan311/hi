import { UserState } from '@/interface/user'
import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth'
import { getQuestionsList, setQuestionsListFromLS } from '@/utils/questons'
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

  const addItemToStateArray = (
    item: string | string[],
    setStateFunction: React.Dispatch<React.SetStateAction<any>>,
    setLocalFunction: React.Dispatch<React.SetStateAction<any>>,
  ) => {
    // setStateFunction((prevData: string[]) => {
    //   if (prevData) {
    //     const check = prevData.includes(item)

    //     if (check) {
    //       const newData = prevData.filter((data) => data !== item)
    //       setLocalFunction(newData)

    //       return newData
    //     } else {
    //       const newData = [...prevData, item]

    //       setLocalFunction(newData)

    //       return newData
    //     }
    //   } else {
    //     setLocalFunction([item])

    //     return [item]
    //   }
    // })
    setStateFunction((prevData: string[]) => {
      if (prevData) {
        let newData: string[] = [...prevData]

        if (Array.isArray(item)) {
          item.forEach((i) => {
            if (newData.includes(i)) {
              newData = newData.filter((data) => data !== i)
            } else {
              newData.push(i)
            }
          })
        } else {
          if (newData.includes(item)) {
            newData = newData.filter((data) => data !== item)
          } else {
            newData.push(item)
          }
        }

        setLocalFunction(newData)

        return newData
      } else {
        if (Array.isArray(item)) {
          setLocalFunction(item)

          return item
        }

        setLocalFunction([item])

        return [item]
      }
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
        questionList,
        setQuestionList: (item) =>
          addItemToStateArray(item as unknown as string, setQuestionList, setQuestionsListFromLS),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
