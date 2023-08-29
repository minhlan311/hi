import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import createRootReducer from './createRootReducer'
import rootSaga from '../sagas'
const sagaMiddleware = createSagaMiddleware()

export default function configureAppStore(preloadedState = {}) {
    const store = configureStore({
        reducer: createRootReducer(),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }).concat([
                sagaMiddleware,
            ]),
        preloadedState,
        enhancers: [],
    })
    sagaMiddleware.run(rootSaga)

    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // eslint-disable-next-line no-undef
        module.hot.accept('./createRootReducer', () =>
            store.replaceReducer(createRootReducer())
        )
    }

    return store
}
