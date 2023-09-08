import { CoursesState } from '~/interface/coursesData'

// type ItemType = {
//   _id?: string
// }

export const handleLocalAction = (
  setData: React.Dispatch<React.SetStateAction<CoursesState[]>>,
  id: string,
  type: 'update' | 'remove',
  localKey?: string
) => {
  setData((prevData: any) => {
    if (type === 'update') {
      const updatedData = prevData.map((item: any) => (item.id === id ? { ...item } : item))
      if (localKey) localStorage.setItem(localKey, JSON.stringify(updatedData))
      return updatedData
    } else if (type === 'remove') {
      const filteredData = prevData.filter((item: any) => item._id !== id)

      if (localKey) localStorage.setItem(localKey, JSON.stringify(filteredData))
      return filteredData
    }
  })
}

export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'm'
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k'
  } else {
    return number ? number.toString() : 0
  }
}

export const isEmoji = (text: string) => {
  const iconRegex = /^[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FEFF}\u{1F900}-\u{1F9FF}]+$/u
  const singleIconRegex = /^\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FEFF}\u{1F900}-\u{1F9FF}$/u

  if (iconRegex.test(text)) {
    return true
  } else if (singleIconRegex.test(text)) {
    return true
  }
  return false
}

// export const separatedByTime = (dataArr, index, timeItem, setTime) => {
//   const previousMessageTime = (index) => {
//     if (index === 0) return null
//     return new Date(dataArr[index - 1].createdAt)
//   }

//   const currentTimestamp = new Date(timeItem)
//   const prevTimestamp = previousMessageTime(index)

//   if (!prevTimestamp || currentTimestamp - prevTimestamp > setTime) {
//     return true
//   }

//   return false
// }
