import axios, { AxiosError } from 'axios'
import { STATUS_CODE } from '../constants/statusCodes'
import { USER_INFO } from '../constants/storageKeys'
import { getStorage, removeStorage } from '../services/storage'
import { confirmButtonAlert } from '../constants/component'
import settings from '../settings'
import moment from 'moment-timezone'
import { setStorage } from '../services/storage'

const axiosInstance = axios.create({})
const requestToken = async (prevRequest) => {
    const user = getStorage(USER_INFO)
    if (!!user) {
        removeStorage(USER_INFO)
    } else {
        try {
            const headers = {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Timezone-Offset': moment.tz.guess(),
                Authorization: 'Bearer ',
            }

            if (!!user) {
                headers.Authorization = `Bearer ${user.refreshToken}`
            }

            const response = await axios({
                baseURL: settings.AUTH_URL,
                url: '/auth/refresh-token',
                headers: headers,
                method: 'GET',
            })

            setStorage({
                key: USER_INFO,
                val: response.data,
            })
            prevRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
            return axiosInstance(prevRequest)
        } catch (e) {
            removeStorage(USER_INFO)
            confirmButtonAlert(
                'error',
                'Phiên đăng nhập hết hạn',
                'Phiên đăng nhập của bạn đã hết hạn',
                'Đăng nhập lại'
            )
            return e
        }
    }
}

axiosInstance.interceptors.request.use((config) => {
    const user = getStorage(USER_INFO)
    if (user) config.headers.Authorization = `Bearer ${user.accessToken}`
    return config
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (
            error instanceof AxiosError &&
            error.response?.status === STATUS_CODE.UNAUTHORIZED
        ) {
            const prevRequest = error?.config
            return requestToken(prevRequest)
        } else if (error.response?.status === STATUS_CODE.SERVER_ERROR) {
            confirmButtonAlert(
                'error',
                'Lỗi hệ thống',
                'Đã xảy ra lỗi hệ thống, vui lòng liên hệ support@mentorz.vn',
                'Đăng xuất'
            )
            removeStorage(USER_INFO)
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
