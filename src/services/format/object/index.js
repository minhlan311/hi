export const isEmptyObj = (obj) => {
    if (!obj) {
        return true
    }

    return !Object.values(obj).some((element) => element !== null)
}
