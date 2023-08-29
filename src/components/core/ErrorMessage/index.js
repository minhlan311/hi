import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

import { GiPadlock, GiStopSign } from 'react-icons/gi'
import { FaGhost } from 'react-icons/fa'
import { BiErrorAlt } from 'react-icons/bi'
import { IoSadOutline, IoSettingsSharp } from 'react-icons/io5'

import { STATUS_CODE } from '../../../constants/statusCodes'

import './styles.scss'

const ErrorMessage = ({ code, message, onClearError }) => {
    const history = useHistory()

    let iconTitleElement
    let iconCodeElement
    let updatedMessage
    let title
    const codeStr = code?.toString()

    switch (code) {
        case STATUS_CODE.NOT_FOUND:
            iconTitleElement = <IoSadOutline size={180} />
            iconCodeElement = (
                <>
                    <span>4</span>
                    <FaGhost size={64} />
                    <span>4</span>
                </>
            )
            title = 'OOPS! PAGE NOT BE FOUND'
            updatedMessage =
                message ||
                'Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unvaliable.'
            break
        case STATUS_CODE.FORBIDDEN:
            iconTitleElement = <GiStopSign size={180} />
            iconCodeElement = (
                <>
                    <span>4</span>
                    <GiPadlock size={64} />
                    <span>3</span>
                </>
            )
            title = 'OOPS! FORBIDEN'
            updatedMessage =
                'You do not have permission to access the document or program that you requested.'
            break
        case STATUS_CODE.SERVER_ERROR:
        case STATUS_CODE.BAD_REQUEST:
        case STATUS_CODE.METHOD_NOT_ALLOWED:
            iconTitleElement = <IoSettingsSharp size={180} />
            iconCodeElement = (
                <>
                    <span>{code === STATUS_CODE.SERVER_ERROR ? 5 : 4}</span>
                    <BiErrorAlt size={64} />
                    <span>{codeStr.slice(codeStr.length - 1)}</span>
                </>
            )
            title = 'OOPS! UNEXPECTED ERROR'
            updatedMessage = message || 'Some thing errors!'
            break
        default:
            return <div />
    }

    return (
        <div className="mtz-error-message">
            <div className="mtz-error-message__icon">{iconTitleElement}</div>
            <div className="mtz-error-message__content">
                <div className="mtz-error-message__code">{iconCodeElement}</div>
                <div className="mtz-error-message__title">{title}</div>
                <div className="mtz-error-message__description">
                    {updatedMessage}
                </div>
                <Button
                    className="mtz-error-message__btn-back"
                    variant="custom-primary"
                    onClick={() => {
                        if (onClearError) {
                            onClearError()
                        }
                        history.push('/')
                    }}
                >
                    Go back home
                </Button>
            </div>
        </div>
    )
}

ErrorMessage.propTypes = {
    code: PropTypes.number,
    message: PropTypes.string,
    onClearError: PropTypes.func,
}

ErrorMessage.defaultProps = {
    code: 0,
    message: '',
    onClearError() {},
}

export default memo(ErrorMessage)
