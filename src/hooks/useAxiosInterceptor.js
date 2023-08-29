/* eslint-disable consistent-return */
import { useCallback, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { STATUS_CODE } from '../constants/statusCodes'
import { WHITE_LIST_API } from '../constants/whiteListAPI'
import { METHOD } from '../constants/apis'
import { setError } from '../slices/error'
import {
    clearLoadingRequest,
    finishLoadingRequest,
    sendLoadingRequest,
} from '../slices/loading'

const useAxiosInterceptor = (instance) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const onSetError = useCallback((error) => {
        dispatch(setError(error))
        history.push('/error-page')
    }, [])

    // Add a request interceptor
    const reqInterceptor = instance.interceptors.request.use(
        (config) => {
            if (config.url) {
                dispatch(sendLoadingRequest())
            }
            return config
        },
        (error) => {
            dispatch(finishLoadingRequest())
            return Promise.reject(error)
        }
    )

    // Add a response interceptor
    const resInterceptor = instance.interceptors.response.use(
        (response) => {
            if (response.config.url) {
                dispatch(finishLoadingRequest())
            }
            return response
        },
        (error) => {
            // Cancel request
            if (axios.isCancel(error)) {
                return
            }

            const {
                status = 500,
                config = {},
                data = {},
            } = error?.response || {}
            switch (status) {
                case STATUS_CODE.UNAUTHORIZED:
                    history.push('/login')
                    break
                case STATUS_CODE.NOT_FOUND: {
                    let NOT_FOUND_PATH = '/not-found'

                    if (data?.Data?.[0]?.Message) {
                        NOT_FOUND_PATH = `${NOT_FOUND_PATH}?messageError=${data.Data[0].Message}`
                    }

                    history.push(NOT_FOUND_PATH)
                    break
                }
                case STATUS_CODE.BAD_REQUEST:
                case STATUS_CODE.METHOD_NOT_ALLOWED:
                    config.method === METHOD.GET && onSetError(error)
                    break
                case STATUS_CODE.FORBIDDEN:
                case STATUS_CODE.SERVER_ERROR:
                default: {
                    const url = error?.config?.url || ''
                    let whiteListIndex = WHITE_LIST_API.length - 1

                    for (; whiteListIndex >= 0; whiteListIndex--) {
                        if (url.includes(WHITE_LIST_API[whiteListIndex])) {
                            break
                        }
                    }

                    const inValidWhiteList = whiteListIndex === -1
                    inValidWhiteList && onSetError(error)
                    dispatch(clearLoadingRequest())
                    break
                }
            }
            dispatch(finishLoadingRequest())
            return Promise.reject(error)
        }
    )

    useEffect(
        () => () => {
            instance.interceptors.request.eject(reqInterceptor)
            instance.interceptors.response.eject(resInterceptor)
        },
        [
            instance.interceptors.request,
            instance.interceptors.response,
            reqInterceptor,
            resInterceptor,
        ]
    )
}

export default useAxiosInterceptor
