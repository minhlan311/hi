import sweetAlert from 'sweetalert2'
import { getStorage, setStorage } from '../services/storage'
import { USER_INFO } from './storageKeys'

export const confirmButtonAlert = (icon, title, text, confirm) => {
    sweetAlert
        .fire({
            icon: icon,
            title: title,
            text: text,
            confirmButtonText: confirm,
        })
        .then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/login'
            }
        })
}

export const confirmCancelWarning = (icon, title, text, confirm) => {
    sweetAlert
        .fire({
            icon: icon,
            title: title,
            text: text,
            confirmButtonText: confirm,
            cancelButtonText: 'Đóng',
        })
        .then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/register'
            } else {
                window.location.href = '/login'
            }
        })
}

export const setSoundGlobal= (state = null) => {
    if(state !== null){
        window.localStorage.setItem('onSound', state)
        return state
    } else {
        const getSound = window.localStorage.getItem('onSound') === undefined ? '1' : window.localStorage.getItem('onSound')
        return getSound
    }
}

export const setStatusGlobal= (state = null) => {
    const user = getStorage(USER_INFO)
    if(state !== null){
        user.state = state
        setStorage({
            key: USER_INFO,
            val: user,
        })
        return state
    } else {
        const getStatus = user.state === undefined ? '' : user.state
        return getStatus
    }
}
