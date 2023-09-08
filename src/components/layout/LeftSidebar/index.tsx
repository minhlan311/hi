import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { BiChevronLeft } from 'react-icons/bi'

import './styles.scss'

const LeftSidebar = () => {
    const [isSideBarExpand, setSideBarExpand] = useState(false)

    const history = useHistory()

    return (
        <div
            className={`mtz-left-sidebar mtz-left-sidebar--${
                isSideBarExpand ? 'expand' : 'default'
            }`}
        >
            <header className="mtz-left-sidebar__header">
                <div
                    aria-hidden
                    className="mtz-left-sidebar__logo"
                    onClick={() => {
                        history.push('/')
                    }}
                >
                    {/* <img
            className="mtz-left-sidebar__logo-mark"
            alt="Log mark"
            src={LogoMark}
          />
          <img
            className="mtz-left-sidebar__word-mark"
            alt="Word mark"
            src={WordMark}
          /> */}
                    LOGO
                </div>
                <div
                    className="mtz-left-sidebar__btn-expand"
                    aria-hidden
                    onClick={() => setSideBarExpand(!isSideBarExpand)}
                >
                    <BiChevronLeft color="#50A4B9" />
                </div>
            </header>
            <section className="mtz-left-sidebar__content">
                {/* <OPUMenu
          isSideBarExpand={isSideBarExpand}
          opus={opus}
          opuActivated={opuActivated}
          onSetOPUActivated={onSetOPUActivated}
        /> */}
            </section>
        </div>
    )
}

LeftSidebar.propTypes = {}

LeftSidebar.defaultProps = {}

export default memo(LeftSidebar)
