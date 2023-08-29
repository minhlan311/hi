import React from 'react'
import classNames from 'classnames/bind'
import styles from '../styles/index.module.scss'

const cx = classNames.bind(styles)

export default function Intro(props) {
    const { lesson, isStart, setIsStart } = props

    return (
        <div className="row">
            <div className="col-md-12">
                <div className={cx('bot')}>
                    <div className={cx('bot-wrapper')}>
                        <div className={cx('bot-avt')}>
                            <img
                                src={require('../images/question.png')}
                                alt="avatar"
                            />
                        </div>
                        <div className={cx('bot-right')}>
                            <div className={cx('bot-content', 'intro')}>
                                <img
                                    alt="img"
                                    src={require('../images/content.png')}
                                />
                                <div className={cx('bot-title')}>
                                    {lesson?.name}
                                </div>
                                <p className={cx('bot-desc')}>
                                    {lesson?.description}
                                </p>
                                <p
                                    onClick={() => {
                                        setIsStart(true)
                                    }}
                                    className={cx('bot-desc', 'start')}
                                >
                                    Bắt đầu
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isStart && (
                <div className="col-md-12">
                    <div className={cx('user')}>
                        <div className={cx('user-wrapper')}>
                            <div className={cx('user-content')}>Bắt đầu</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
