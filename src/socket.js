import { io } from 'socket.io-client'
import settings from './settings'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : settings.API_URL

// export const socket = io(URL);
export const socket = io(URL, {
    autoConnect: true,
})
