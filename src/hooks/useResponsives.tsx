import { useState, useEffect } from 'react'

interface ResponsiveSizes {
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  xxl: boolean
}

const useResponsives = () => {
  const [windowSize, setWindowSize] = useState<ResponsiveSizes>({
    xs: window.innerWidth < 576,
    sm: window.innerWidth >= 576 && window.innerWidth < 768,
    md: window.innerWidth >= 768 && window.innerWidth < 992,
    lg: window.innerWidth >= 992 && window.innerWidth < 1200,
    xl: window.innerWidth >= 1200 && window.innerWidth < 1600,
    xxl: window.innerWidth >= 1600
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        xs: window.innerWidth < 576,
        sm: window.innerWidth >= 576 && window.innerWidth < 768,
        md: window.innerWidth >= 768 && window.innerWidth < 992,
        lg: window.innerWidth >= 992 && window.innerWidth < 1200,
        xl: window.innerWidth >= 1200 && window.innerWidth < 1600,
        xxl: window.innerWidth >= 1600
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}
export default useResponsives
