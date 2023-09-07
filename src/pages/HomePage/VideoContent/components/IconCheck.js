import React from 'react'
import { BsCheckLg } from 'react-icons/bs'
import './IconCheck.scss'

export default function IconCheck({ marginTop }) {
    return (
        <div>
            <div className="iconTopBox" style={{ marginTop: marginTop }}>
                <BsCheckLg className="icons-steps iconTop" />
            </div>
        </div>
    )
}
