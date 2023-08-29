import { createContext } from 'react'

const ToastContext = createContext({
    isShowToast: '',
    toast: {},
})

export default ToastContext
