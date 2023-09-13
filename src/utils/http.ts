import { ENDPOINT } from '@/constants/endpoint'
import HttpStatusCode from '@/constants/httpStatusCode.enum'
import axios, { AxiosError, type AxiosInstance } from 'axios'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_SERVICE_ENDPOINT,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === ENDPOINT.LOGIN || url === ENDPOINT.REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.accessToken
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data)
        } else if (url === ENDPOINT.LOGOUT) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          console.log(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
