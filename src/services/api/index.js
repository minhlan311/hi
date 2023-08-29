import axios from 'axios'
import moment from 'moment-timezone'

import { METHOD } from '../../constants/apis'
import { USER_INFO } from '../../constants/storageKeys'

import settings from '../../settings'

import { getStorage } from '../storage'

export const setHeader = () => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Timezone-Offset': moment.tz.guess(),
        Authorization: 'Bearer ',
    }
    const userInfo = getStorage(USER_INFO)

    if (!!userInfo) {
        headers.Authorization = `Bearer ${userInfo.accessToken}`
    }

    return headers
}
const instance = axios.create({
    baseURL: settings.AUTH_URL,
})

export default instance

// const exam= axios.create({ baseURL: settings.BASE_URL_3002 });

export const getData = ({
    baseURL,
    baseURL_Exam,
    url,
    isAuthenticated = true,
    responseType,
    params,
    cancelToken,
}) =>
    instance({
        method: METHOD.GET,
        headers: setHeader(),
        baseURL,
        baseURL_Exam,
        url,
        params,
        responseType,
        cancelToken,
    })

export const postData = ({
    url,
    isAuthenticated = true,
    responseType,
    contentType,
    data,
}) => {
    instance({
        method: METHOD.POST,
        headers: setHeader(),
        url,
        data,
        responseType,
    })
}

export const putData = ({
    url,
    isAuthenticated = true,
    responseType,
    contentType,
    data,
}) =>
    instance({
        method: METHOD.PUT,
        headers: setHeader(isAuthenticated, contentType),
        url,
        data,
        responseType,
    })

export const deleteData = ({ url, isAuthenticated = true }) =>
    instance({
        method: METHOD.DELETE,
        headers: setHeader(),
        url,
    })

export const patchData = ({
    url,
    isAuthenticated = true,
    responseType,
    data,
}) =>
    instance({
        method: METHOD.PATCH,
        headers: setHeader(),
        url,
        data,
        responseType,
    })
