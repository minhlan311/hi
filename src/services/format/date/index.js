import moment from 'moment'
import momentTimezone from 'moment-timezone'

import {
    DAILY,
    DATETIME_LOCAL_MS,
    MONTHLY,
    MONTH_TO_DATE,
    QUARTERLY,
    QUARTERLY_TO_DATE,
    WEEKLY,
    YEARLY,
    YEAR_END_PROJECTION,
    YEAR_TO_DATE,
    YEAR_TO_DATE_DAILY,
} from 'constants/dateTime'

export const getCurrentDateTime = () => {
    const timeZone = momentTimezone.tz.guess()
    const formatTimestamp = momentTimezone(new Date().toUTCString())
        .tz(timeZone)
        .format(DATETIME_LOCAL_MS)

    return formatTimestamp
}

export const getYearInDate = (date) => {
    if (!date) {
        return ''
    }

    return moment(date).year()
}

export const getMonthInDate = (date) => {
    const INDEX_START_MONTH = 1
    if (!date) {
        return ''
    }

    return moment(date).month() + INDEX_START_MONTH
}

export const getQuarterInDate = (date) => {
    if (!date) {
        return ''
    }

    return moment(date).quarter()
}

export const getWeekInDate = (date) => {
    if (!date) {
        return ''
    }

    return moment(date).week()
}

export const getDayInDate = (date) => {
    if (!date) {
        return ''
    }

    return moment(date).date()
}

export const getLastTimeUpdated = (lastTime) => {
    if (lastTime) {
        const now = moment(moment().format()) // todays date
        const end = moment(lastTime) // another date
        const duration = moment.duration(now.diff(end))

        if (duration.days() >= 1) {
            return `${duration.days()} days ago`
        }
        if (duration.hours() >= 1) {
            return `${duration.hours()} hours ago`
        }
        if (duration.minutes() >= 1) {
            return `${duration.minutes()} mins ago`
        }
        if (duration.seconds() >= 1 || duration.seconds() === 0) {
            return '1 mins ago'
        }
    }

    return null
}

export const getGreetingTime = (date) => {
    const now = date || moment() // the different date or current date
    const currentHour = now.hour()
    const splitAfternoon = 12 // 24hr time to split the afternoon
    const splitEvening = 17 // 24hr time to split the evening

    if (currentHour >= splitAfternoon && currentHour < splitEvening) {
        // Between 12 PM and 5PM
        return 'afternoon'
    }
    if (currentHour >= splitEvening) {
        // Between 5PM and Midnight
        return 'evening'
    }
    // Between dawn and noon
    return 'morning'
}

export const formatDate = (date, styleFormat = DATETIME_LOCAL_MS) =>
    moment(date).format(styleFormat)

export const getQuarterlyAndYear = (textQuarterLy) => {
    const array = textQuarterLy.split(' ')

    if (array?.length === 3) {
        return {
            quarter: array[1],
            year: array[2],
        }
    }

    return null
}

export const onGetDateRangeByFrequency = ({
    isUpdatedFrequency = false,
    frequency,
    date,
}) => {
    if (frequency?.value && date) {
        const dateTodayOrUpdate = isUpdatedFrequency ? moment() : date
        let newStartDate = date
        let newEndDate = null

        switch (frequency.value) {
            case DAILY:
            case MONTH_TO_DATE:
            case QUARTERLY_TO_DATE:
            case YEAR_TO_DATE_DAILY:
                newStartDate = dateTodayOrUpdate
                newEndDate = dateTodayOrUpdate
                break
            case WEEKLY:
                newStartDate = moment(dateTodayOrUpdate).startOf('week')
                newEndDate = moment(dateTodayOrUpdate).endOf('week')
                break
            case MONTHLY:
            case YEAR_TO_DATE:
                newStartDate = moment(date).startOf('month')
                newEndDate = moment(date).endOf('month')
                break
            case QUARTERLY:
                newStartDate = moment(date).startOf('quarter')
                newEndDate = moment(date).endOf('quarter')
                break
            case YEAR_END_PROJECTION:
            case YEARLY:
                newStartDate = moment(dateTodayOrUpdate).startOf('year')
                newEndDate = moment(dateTodayOrUpdate).endOf('year')
                break
            default:
                break
        }

        return {
            startDate: newStartDate,
            endDate: newEndDate,
        }
    }

    return null
}
