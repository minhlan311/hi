import { useEffect, memo } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}

ScrollToTop.propTypes = {}

export default memo(ScrollToTop)
