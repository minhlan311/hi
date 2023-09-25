import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx'
import GlobalStyles from './components/GlobalStyles/globalStyles.tsx'
import ScrollTop from './components/ScrollTop/ScrollTop.tsx'
import { AppProvider } from './contexts/app.context.tsx'
import { SocketProvider } from './lib/providers/socket.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <SocketProvider>
            <GlobalStyles>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#D72831',
                    colorPrimaryActive: '#FF636F',
                    colorPrimaryBorder: '#D72831',
                    colorPrimaryHover: '#FF636F',
                    // colorPrimaryBg: '#D72831',
                    colorInfo: '#1EA69A',
                    colorBorder: '#E7E7E7',
                    colorLink: '#1C1D1F',
                    colorLinkActive: '#D72831',
                    colorLinkHover: '#FF636F',
                    borderRadius: 12,
                    borderRadiusLG: 12,
                    borderRadiusOuter: 12,
                    borderRadiusSM: 12,
                    borderRadiusXS: 12,
                    paddingContentHorizontal: 14,
                    controlHeight: 40,
                    controlOutlineWidth: 1,
                    colorSplit: '#E7E7E7',
                    colorBorderSecondary: '#E7E7E7',
                  },
                }}
                locale={viVN}
              >
                <ScrollTop>
                  <App />
                </ScrollTop>
              </ConfigProvider>
            </GlobalStyles>
          </SocketProvider>
        </AppProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </BrowserRouter>,
)
