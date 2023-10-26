import { useEffect, useState } from 'react'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    function checkIsMobile() {
      const userAgent = navigator.userAgent
      setIsMobile(/android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(userAgent))
    }

    checkIsMobile()
  }, [])

  return isMobile
}
