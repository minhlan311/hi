/* eslint-disable @typescript-eslint/no-explicit-any */

export const localAction = (
  localKey: string = 'default',
  updateData?: any | any[] | null,
  type?: 'add' | 'update' | 'updateSwitch' | 'remove' | 'delete',
  checkKey?: any,
  updateKey?: any,
  setContextData?: React.Dispatch<React.SetStateAction<any>>,
): any => {
  let localData: any = localStorage.getItem(localKey)

  if (!localData) {
    localData = []
  } else {
    localData = JSON.parse(localData)
  }

  if (type && updateData) {
    if (type === 'add') {
      if (localData && typeof Array.isArray(localData)) localData.push(updateData)
      else localStorage.setItem(localKey, JSON.stringify(localData))
    } else {
      // local data type: string
      if (typeof localData === 'string') {
        if (type === 'update') {
          localData = updateData
        } else if (type === 'remove') {
          localStorage.removeItem(localKey)
        }
      }
      // local data type: arr | obj
      else {
        if (type === 'update' || type === 'updateSwitch') {
          // local data type: arr
          if (Array.isArray(localData)) {
            if (typeof updateData === 'string') {
              const existingIndex = localData.findIndex((item: any) => item === updateData)

              if (existingIndex !== -1) {
                localData[existingIndex] = updateData
              } else {
                localData.push(updateData)
              }
            } else if (typeof updateData === 'object') {
              const filteredData = localData.find((item: any) =>
                checkKey ? item?.[checkKey] === updateData?.[checkKey] : item._id === updateData._id,
              )

              if (filteredData) {
                if (type === 'updateSwitch') {
                  const dataArr = updateData?.[updateKey]
                  updateData?.[updateKey].forEach((_: any, id: number) => {
                    if (filteredData?.[updateKey].includes(dataArr[id])) {
                      filteredData[updateKey] = filteredData[updateKey].filter((data: any) => data !== dataArr[id])
                    } else {
                      filteredData?.[updateKey].push(dataArr[id])
                    }
                  })
                } else {
                  const dataArr = updateData?.[updateKey]

                  filteredData[updateKey] = dataArr
                }
              } else {
                localData.push(updateData)
              }
            }
          }
          // local data type: obj
          else {
            if (typeof updateData === 'string') {
              console.log('required updateKey')
            } else {
              localData[updateKey] = updateData
            }
          }
        } else if (type === 'remove') {
          if (typeof updateData === 'string') {
            if (checkKey) {
              localData = localData.filter((item: any) => item[checkKey] !== updateData)
            } else {
              localData = localData.filter((item: any) => item !== updateData)
            }
          } else if (typeof updateData === 'object' && checkKey) {
            localData = localData.filter((item: any) => item[checkKey] !== updateData[checkKey])
          }
        } else if (type === 'delete') {
          if (checkKey) {
            localData = localData.filter((item: any) =>
              checkKey ? item?.[checkKey] !== updateData : item._id === updateData,
            )
          } else localStorage.removeItem(localKey)
        }
      }

      setContextData && setContextData(localData)

      localStorage.setItem(localKey, JSON.stringify(localData))
    }
  }

  return localData
}

export const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}

export const stateAction = (
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  id: string | null,
  dataUpdate: any | any[] | null,
  actionType: 'update' | 'remove' | 'add' | 'switch',
  setLocalFunction?: React.Dispatch<React.SetStateAction<any>> | null,
  key?: string,
) => {
  setData((prevData: any[]) => {
    let newData = [...prevData]

    switch (actionType) {
      case 'update':
        if (newData) {
          if (typeof dataUpdate === 'string') {
            if (newData.includes(id)) {
              const updatedData = newData.map((item) => (item._id === id ? { ...item, dataUpdate } : item))

              return updatedData
            } else {
              newData.push(dataUpdate)
            }
          }

          if (Array.isArray(dataUpdate as unknown as any[])) {
            const itemIndex = newData.findIndex((item) => (key ? item?.[key] === id : item._id === id))

            dataUpdate?.forEach((item: any) => {
              if (itemIndex) {
                const updatedData = newData.map((item) =>
                  key
                    ? item?.[key] === dataUpdate?.[key as unknown as any]
                    : item._id === dataUpdate?._id
                    ? { ...item, ...dataUpdate }
                    : item,
                )

                return updatedData
              } else {
                newData.push(item)
              }
            })
          } else {
            if (newData.some((item) => (key ? item?.[key] === id : item._id === id))) {
              const updatedData = newData.map((item) =>
                key
                  ? item?.[key] === dataUpdate?.[key]
                  : item._id === dataUpdate._id
                  ? { ...item, ...dataUpdate }
                  : item,
              )

              return updatedData
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

      case 'remove':
        newData = newData.filter((data) => (key ? data?.[key] !== id : data._id !== id))

        setLocalFunction && setLocalFunction(newData)

        return newData

      case 'add':
        if (newData) {
          if (typeof dataUpdate === 'string') {
            if (newData.includes(dataUpdate)) {
              return newData
            } else {
              newData.push(dataUpdate)
            }
          }

          if (Array.isArray(dataUpdate as unknown as any[])) {
            const itemIndex = newData.findIndex((item) =>
              key ? item?.[key] === dataUpdate?.[key] : item._id === dataUpdate?._id,
            )
            dataUpdate?.forEach((item: any) => {
              if (itemIndex === -1) {
                return newData
              } else {
                newData.push(item)
              }
            })
          } else {
            if (newData.find((item) => (key ? item?.[key] === dataUpdate?.[key] : item._id === dataUpdate._id))) {
              return newData
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

      case 'switch':
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
