export function splitText(string, length) {
    const count = string?.length
    if (count > length) {
        const text = string.substring(0, length + 1).concat('...')

        return text
    } else return string
}
