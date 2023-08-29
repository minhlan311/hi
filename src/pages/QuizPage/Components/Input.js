import React from 'react'
import classNames from 'classnames/bind'
import styles from '../styles/index.module.scss'
import { viewFileImg } from '../../../services/authServices/AuthServices'
import { getUserDetail } from '../../../config/storage'
import { Icon } from '@iconify/react'

const cx = classNames.bind(styles)

export default function Input() {
    const { avatarUrl } = getUserDetail()

    return (
        <div className={cx('todo-input')}>
            <img src={viewFileImg(avatarUrl)} alt="avatar" />
            <input disabled type="text" placeholder="Message" />
            <div className={cx('icon')}>
                <Icon icon="bi:send" color="#d9d9d9" width="30" height="30" />
            </div>
        </div>
    )
}
