import { useState } from 'react'

import style from './FloatInput.module.scss'

const FloatLabel = (props: any) => {
  const [focus, setFocus] = useState(false)
  const { children, label, check } = props

  const labelClass = focus || (check && check.length !== 0) ? `${style.label} ${style.labelFloat}` : `${style.label}`

  return (
    <div className={style.floatLabel} onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  )
}

export default FloatLabel
