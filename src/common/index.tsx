/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const localAction = (
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  id: string,
  type: 'update' | 'remove',
  localKey?: string,
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

export const stateAction = (
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  id: string | null,
  dataUpdate: any | null,
  actionType: 'update' | 'remove' | 'edit' | 'add',
  setLocalFunction?: React.Dispatch<React.SetStateAction<any>>,
  key?: string,
) => {
  setData((prevData: any[]) => {
    let newData = [...prevData]

    switch (actionType) {
      case 'update':
        const updatedData = newData.map((item) => (item._id === id ? { ...item, ...dataUpdate } : item))

        return updatedData

      case 'remove':
        newData = newData.filter((data) => (key ? data?.[key] !== id : data._id !== id))

        setLocalFunction && setLocalFunction(newData)

        return newData

      case 'edit':
        const editedData = newData.map((item) => {
          if (item._id === id) {
            const updatedItem = { ...item }
            updatedItem[key as string] = dataUpdate

            return updatedItem
          }

          return item
        })

        return editedData

      case 'add':
        if (newData) {
          if (Array.isArray(dataUpdate)) {
            dataUpdate.forEach((i) => {
              if (newData.includes(i)) {
                newData = newData.filter((data) => data !== i)
              } else {
                newData.push(i)
              }
            })
          } else {
            if (newData.includes(dataUpdate)) {
              newData = newData.filter((data) => data !== dataUpdate)
            } else {
              newData.push(dataUpdate)
            }
          }

          setLocalFunction && setLocalFunction(newData)

          return newData
        } else {
          if (Array.isArray(dataUpdate)) {
            setLocalFunction && setLocalFunction(dataUpdate)

            return dataUpdate
          }

          setLocalFunction && setLocalFunction([dataUpdate])

          return [dataUpdate]
        }

      default:
        return prevData
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
