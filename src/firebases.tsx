import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyCAoFLFJ6BCPfn1iowOSmmEIbpx6RMVuJ4',
  authDomain: 'mentorz-version-2.firebaseapp.com',
  projectId: 'mentorz-version-2',
  storageBucket: 'mentorz-version-2.appspot.com',
  messagingSenderId: '704426530434',
  appId: '1:704426530434:web:feaff9cda4d4b22dcdc69b',
  measurementId: 'G-29G518TCNF'
}

export const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)
export const auth = getAuth(app)

export const fetchToken = async () => {
  let token = undefined
  try {
    token = await getToken(messaging, {
      vapidKey: 'BPmt6dC8Nj-_YcZ-usK2mJ15vSol_jQUvl8H9-mPydvn080fc1MGWfg8YkUtijrWDTbaLVJAOP9-3RuuYBbSbGk'
    })
  } catch (error) {
    console.log(error)
    token = undefined
  }

  return token
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload: unknown) => {
      resolve(payload)
    })
  })
