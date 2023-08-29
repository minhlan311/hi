import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

import { MdOutlineClose } from 'react-icons/md'

import './styles.scss'

const ToastNotification = ({ show, position, title, description, onHide }) => (
    <ToastContainer
        className="p-3 position-fixed"
        position={position}
        style={{ zIndex: 9999999 }}
    >
        <Toast show={show} className="mtz-toast">
            <Toast.Header closeButton={false}>
                <p className="me-auto mtz-toast__title">{title}</p>
                <button
                    type="button"
                    className="mtz-toast__btn-close"
                    onClick={() => onHide(false)}
                >
                    <MdOutlineClose />
                </button>
            </Toast.Header>
            <Toast.Body>
                <p className="mtz-toast__description">{description}</p>
                <button
                    type="button"
                    className="mtz-toast__btn-okay"
                    onClick={() => onHide(false)}
                >
                    Okay
                </button>
            </Toast.Body>
        </Toast>
    </ToastContainer>
)

ToastNotification.propTypes = {
    show: PropTypes.bool,
    position: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    onHide: PropTypes.func,
}

ToastNotification.defaultProps = {
    show: false,
    position: 'bottom-end',
    title: '',
    description: '',
    onHide() {},
}

export default memo(ToastNotification)
