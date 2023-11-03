/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from 'react'
import css from './style.module.scss'
import { Space, Spin } from 'antd'
import Logo from '../Logo/Logo'

const SuspenseWrapper = ({ children }: any) => {
  return (
    <Suspense
      fallback={
        <div className={`${css.preloader}`}>
          <Space className={css.logo}>
            <Logo
              style={{
                marginRight: '10px',
              }}
            />
            {<Spin delay={200} />}
          </Space>
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default SuspenseWrapper
