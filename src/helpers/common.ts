/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (func: any, timeout = 300) => {
  let timer: any
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export function splitText(string: string, length: number) {
  const count = string?.length
  if (count > length) {
    const text = string.substring(0, length + 1).concat('...')

    return text
  } else return string
}

// format giá tiền sang VNĐ
export function formatPriceVND(giaTien: number) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
  const giaTienFormatted = formatter.format(giaTien)
  return giaTienFormatted.replace('đ', 'vnđ')
}

// format date backend trả ra về định dạng DD/MM/YYYY
export function formatDate(dateStr: Date) {
  const dateObj = new Date(dateStr)
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1
  const year = dateObj.getFullYear()

  const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`

  return formattedDate
}

// hàm đổi định dạng sang thứ trong tuần
export function formatDaysOfWeek(dayIndexes: number[]) {
  const daysOfWeek = ['Chủ nhật', '2', '3', '4', '5', '6', '7']
  const formattedDays = dayIndexes.map((dayIndex) => {
    if (dayIndex >= 0 && dayIndex <= 7) {
      return daysOfWeek[dayIndex]
    } else {
      return 'Ngày không hợp lệ!'
    }
  })

  return formattedDays
}

//  format time sang giờ phút
export function formatHour(timeString: Date) {
  const date = new Date(timeString)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

  return formattedTime
}
