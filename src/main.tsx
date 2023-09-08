import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'
import { AppProvider } from './contexts/app.context.tsx'
import GlobalStyles from './components/GlobalStyles/globalStyles.tsx'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/ja_JP'
import ScrollTop from './components/ScrollTop/ScrollTop.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <GlobalStyles>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#1C1D1F',
                    colorPrimaryActive: '#1C1D1F',
                    colorPrimaryBorder: '#1C1D1F',
                    colorPrimaryHover: '#3e4143',
                    colorPrimaryBg: '#1C1D1F',
                    colorInfo: '#1EA69A',
                    colorBorder: '#1C1D1F',
                    colorLink: '#1C1D1F',
                    colorLinkActive: '#401b9c',
                    colorLinkHover: '#401b9c',
                    borderRadius: 0,
                    borderRadiusLG: 0,
                    borderRadiusOuter: 0,
                    borderRadiusSM: 0,
                    borderRadiusXS: 0,
                    paddingContentHorizontal: 23,
                    controlHeight: 40,
                    controlOutlineWidth: 1,
                    colorSplit: '#c1c1c1',
                    colorBorderSecondary: '#6a6f73'
                  }
                }}
                locale={viVN}
              >
                {' '}
                <ScrollTop>
                  <App />
                </ScrollTop>
              </ConfigProvider>
            </GlobalStyles>
          </AppProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
)
