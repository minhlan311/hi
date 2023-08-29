import React from 'react'
import classNames from 'classnames/bind'
import styles from '../styles/index.module.scss'

const cx = classNames.bind(styles)

export default function QuizUserItem(props) {
    const { content } = props
    return (
        <div className="row">
            <div className="col-md-12">
                <div className={cx('user')}>
                    <div className={cx('user-wrapper')}>
                        {content !== '' && (
                            <div className={cx('user-content')}>{content}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
