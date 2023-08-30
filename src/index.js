import React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import App from './app'
import configureAppStore from './store/configureAppStore'
import registerServiceWorker from './registerServiceWorker'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'

const container = document.getElementById('root')
const root = createRoot(container)
const store = configureAppStore()

root.render(
    <Provider store={store}>
        <Router>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#F2184F',
                        colorPrimaryActive: '#1C1D1F',
                        colorPrimaryBorder: '#F2184F',
                        colorPrimaryHover: '#ff6088',
                        colorPrimaryBg: '#fff',
                        colorInfo: '#1EA69A',
                        colorBorder: '#1C1D1F',
                        colorLink: '#000',
                        colorLinkActive: '#F2184F',
                        colorLinkHover: '#ff6088',
                        borderRadius: 12,
                        borderRadiusLG: 12,
                        borderRadiusOuter: 12,
                        borderRadiusSM: 12,
                        borderRadiusXS: 12,
                        paddingContentHorizontal: 14,
                        controlHeight: 40,
                        controlOutlineWidth: 1,
                        colorSplit: '#c1c1c1',
                        colorBorderSecondary: '#6a6f73',
                    },
                }}
                locale={viVN}
            >
                <App />
            </ConfigProvider>
        </Router>
    </Provider>
)

registerServiceWorker()
