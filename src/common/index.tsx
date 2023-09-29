/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const stateAction = (
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  id: string,
  dataUpdate: object | null,
  actionType: 'update' | 'remove' | 'edit' | 'add',
  key?: string,
) => {
  setData((prevData: any[]) => {
    const newData = [...prevData]

    switch (actionType) {
      case 'update':
        const updatedData = newData.map((item) => (item._id === id ? { ...item, ...dataUpdate } : item))

        return updatedData

      case 'remove':
        const filteredData = newData.filter((item) => item._id !== id)

        return filteredData

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
        if (!newData.some((item) => item.id === id)) {
          newData.push(dataUpdate)
        }

        return newData

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
