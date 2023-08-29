import React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import App from './app'

import configureAppStore from './store/configureAppStore'

import registerServiceWorker from './registerServiceWorker'

const container = document.getElementById('root')
const root = createRoot(container)
const store = configureAppStore()

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
)

registerServiceWorker()
