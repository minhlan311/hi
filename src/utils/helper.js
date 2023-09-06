export function splitText(string, length) {
    const count = string?.length
    if (count > length) {
        const text = string.substring(0, length + 1).concat('...')

        return text
    } else return string
}

export function formatPriceVND(giaTien) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
    const giaTienFormatted = formatter.format(giaTien)
    return giaTienFormatted.replace('đ', 'vnđ')
}

export function formatDate(dateStr) {
    const dateObj = new Date(dateStr)
    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1
    const year = dateObj.getFullYear()

    const formattedDate = `${day < 10 ? '0' + day : day}-${
        month < 10 ? '0' + month : month
    }-${year}`

    return formattedDate
}

export function formatDaysOfWeek(dayIndexes) {
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

export function formatHour(timeString) {
    const date = new Date(timeString)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`

    return formattedTime
}
