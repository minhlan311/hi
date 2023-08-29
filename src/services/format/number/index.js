import {
    NA,
    NEGATIVE_TYPE,
    NOT_VALID_NUMBER,
    NUMBER_NOT_AVAILABLE,
} from '../../../constants/number'

export const isNullOrUndefined = (value) =>
    value === null || value === undefined || value === ''

export const isValidNumber = (number, regex = /^[-]?\d{1,18}(\.\d{1,8})?$/) => {
    if (number === '' || regex.test(number)) {
        return true
    }
    return false
}

export const checkNumber = (number) => {
    if (isNullOrUndefined(number)) {
        return NA
    }

    return number
}

export const toPositiveNumber = (number) => number * -1
export const isPositiveNumber = (number) => number > 0
export const isNegativeNumber = (number) => number < 0

export const cleanNumberArr = (numbers = []) => {
    const arrUpdated = numbers.filter(
        (elem) => !NOT_VALID_NUMBER.includes(elem)
    )

    return arrUpdated
}

/* eslint-disable no-param-reassign */
export const fraToDec = (num = 0) => {
    if (NOT_VALID_NUMBER.includes(num)) {
        return NUMBER_NOT_AVAILABLE
    }

    const test = (String(num).split('.')[1] || []).length
    num *= 10 ** Number(test)
    const den = 10 ** Number(test)
    function reduce(numerator, denominator) {
        let gcd = function gcd(a, b) {
            return b ? gcd(b, a % b) : a
        }
        gcd = gcd(numerator, denominator)
        return [numerator / gcd, denominator / gcd]
    }
    return `${reduce(num, den)[0]}/${reduce(num, den)[1]}`
}

export const getMinMax = (arr) => {
    const arrayUpdated = cleanNumberArr(arr)
    let min = null
    let max = null

    if (arrayUpdated.length > 0) {
        min = Math.min(...arrayUpdated)
        max = Math.max(...arrayUpdated)
    }

    return [min, max]
}

export const countDecimals = (num) => {
    if (num.toString().split('.')[1]) {
        return num.toString().split('.')[1].length
    }

    return 0
}

export const toFixedNumber = (num, roundedDigit = 0) => {
    if (roundedDigit && countDecimals(num) < roundedDigit) {
        return num.toFixed(roundedDigit)
    }

    return num.toFixed(roundedDigit)
}

export const numberWithCommas = (number, roundedDigit) => {
    if (NOT_VALID_NUMBER.includes(number)) {
        return NUMBER_NOT_AVAILABLE
    }

    let updatedNumber = number
    if (isNegativeNumber(number)) {
        updatedNumber = toPositiveNumber(number)
    }

    updatedNumber = toFixedNumber(Number(updatedNumber), roundedDigit)
    const splittedNumber = updatedNumber.toString().split('.')
    updatedNumber =
        splittedNumber[0].replace(/.(?=(?:.{3})+$)/g, '$&,') +
        (splittedNumber.length === 2 ? `.${splittedNumber[1]}` : '')

    return isNegativeNumber(number) ? `-${updatedNumber}` : updatedNumber
}

export const addBracketsForNumber = ({
    number,
    roundedDigit,
    negativeType,
    notAvailableType = NUMBER_NOT_AVAILABLE,
}) => {
    if (NOT_VALID_NUMBER.includes(number)) {
        return notAvailableType
    }
    if (!isValidNumber(number)) {
        return number
    }
    if (number < 0 && negativeType === NEGATIVE_TYPE.BRACKET) {
        return `(${numberWithCommas(toPositiveNumber(number), roundedDigit)})`
    }

    return numberWithCommas(number, roundedDigit)
}

export const toFormatBytes = (bytes, decimals) => {
    if (bytes === 0 || bytes === '0') return '0 Bytes'
    const k = 1024
    const dm = decimals || 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}
