import { useEffect } from 'react'
import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

type MyComponentProps = {
  children: ReactElement
}
export default function ScrollTop({ children }: MyComponentProps) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return <>{children}</>
}
