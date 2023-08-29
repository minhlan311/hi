export const gettingNameInitials = (name) => {
    if (name) {
        const flags = 'gu'
        const rgx = new RegExp(/(\p{L}{1})\p{L}+/, flags)

        let initials = [...name.matchAll(rgx)] || []

        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase()

        return initials
    }
    return null
}

export const trimText = (limit, text = '') => {
    const updatedDate =
        text.length > limit ? `${text.substring(0, limit)}...` : text

    return updatedDate
}

export const getFrequencyName = (freNumb, listFrequency) => {
    if (!freNumb) {
        return ''
    }

    return `${listFrequency.find((x) => x.value === freNumb).label} Analysis`
}

export const uuid = () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    )

export const convertStringToBase64 = (str = '') => {
    if (str) {
        return window.btoa(encodeURIComponent(str))
    }

    return ''
}

export const convertBase64ToString = (str = '') => {
    if (str) {
        return decodeURIComponent(window.atob(str))
    }

    return ''
}
