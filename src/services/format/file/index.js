export const formatFileSize = (bytes, decimalPoint = 0) => {
    if (bytes === 0 || bytes === '0') {
        return '0 Bytes'
    }

    const k = 1000
    const dm = decimalPoint
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

export const arrayBufferToBase64 = (buffer) => {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength

    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }

    return window.btoa(binary)
}

export const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)

    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }

    return bytes.buffer
}

export const onValidateLengthFileType = ({
    files = [],
    type = 'video',
    maxLength = 1,
}) => {
    if (files && files.length) {
        const validationFailure = files.filter(
            (file) =>
                file?.type?.includes(type) ||
                // file already exists
                file?.extension?.includes(type)
        )
        if (validationFailure.length > maxLength) {
            return false
        }
    }

    return true
}

export const onValidateFiles = ({
    files = [],
    maxLength = 10,
    maxSize = 2097152,
    maxLengthFileType = null,
}) => {
    if (files && files.length) {
        // check length of files
        if (files.length > maxLength) {
            return false
        }
        // check the length of each file type
        if (
            maxLengthFileType &&
            !onValidateLengthFileType({
                files,
                ...maxLengthFileType,
            })
        ) {
            return false
        }
        // check size of file
        if (files.some((file) => file.size > maxSize)) {
            return false
        }
    }

    return true
}

export const downloadAttachments = ({ url, name }) => {
    fetch(url).then((response) => {
        response.blob().then((blob) => {
            const urlObj = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = urlObj
            a.download = name
            a.click()
        })
    })
}
