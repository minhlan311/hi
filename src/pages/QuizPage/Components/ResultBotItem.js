import React from 'react'
import classNames from 'classnames/bind'
import VideoComponent from '../../../components/VideoComponent'
import { GET_FILE_URL } from '../../../config/BASE_URL'
import { showModalImage } from '../../../redux/actions/uiActions/uiActions'
import { viewFileImg } from '../../../services/authServices/AuthServices'
import { RIGHT_ANSWERS, WRONG_ANSWERS } from './BotSentence'
import styles from '../styles/index.module.scss'

const cx = classNames.bind(styles)

function ResultBotItem(props) {
    const { status, explaination, hint, attachments, dispatch, countFail } =
        props

    const renderExplanation = (attachment) => {
        return attachment.map((item, index) => {
            if (item.type === 'EXPLAINATION') {
                switch (item.fileType) {
                    case 'IMAGE': {
                        return (
                            <img
                                key={index}
                                className="cursor-pointer"
                                onClick={() => {
                                    dispatch(showModalImage(item.fileUrl))
                                }}
                                src={viewFileImg(item.fileUrl)}
                                alt={'question'}
                            />
                        )
                    }
                    case 'VIDEO': {
                        return (
                            <VideoComponent
                                key={index}
                                videoUrl={item.fileUrl}
                            />
                        )
                    }
                    case 'AUDIO': {
                        return (
                            <audio controls key={index}>
                                <source
                                    src={`${GET_FILE_URL}/audio/${item.fileUrl}`}
                                    type="audio/mpeg"
                                />
                            </audio>
                        )
                    }
                    default: {
                    }
                }
            }
        })
    }

    return (
        <>
            {(status === 'true' || status === 'false') && (
                <div className={`row`}>
                    <div className="col-md-12 mb-3">
                        <div className={cx('bot')}>
                            <div className={cx('bot-wrapper')}>
                                <div className={cx('bot-avt')}>
                                    <img
                                        src={require('../images/bot1.png')}
                                        alt="avatar"
                                    />
                                </div>

                                <div className={cx('result-right')}>
                                    <img
                                        src={require(status === ' true'
                                            ? '../images/true.png'
                                            : '../images/false.png')}
                                        alt="result"
                                    />
                                    {status === 'true' ? (
                                        <>
                                            <div
                                                className={cx('result-content')}
                                            >
                                                <p>
                                                    {
                                                        RIGHT_ANSWERS[
                                                            Math.floor(
                                                                Math.random() *
                                                                    RIGHT_ANSWERS.length
                                                            )
                                                        ]
                                                    }
                                                </p>
                                            </div>

                                            {explaination && (
                                                <div
                                                    className={cx(
                                                        'result-content'
                                                    )}
                                                >
                                                    <p className="mb-0">
                                                        Giải thích:{' '}
                                                        {explaination}
                                                    </p>
                                                    <p className="mb-0">
                                                        <p>
                                                            {renderExplanation(
                                                                attachments
                                                            )}
                                                        </p>
                                                    </p>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className={cx('result-content')}
                                            >
                                                {
                                                    WRONG_ANSWERS[
                                                        Math.floor(
                                                            Math.random() *
                                                                WRONG_ANSWERS.length
                                                        )
                                                    ]
                                                }
                                            </div>{' '}
                                            {countFail >= 2 ? (
                                                <div
                                                    className={cx(
                                                        'result-content'
                                                    )}
                                                >
                                                    <p className="mb-0">
                                                        Gợi ý: {hint}
                                                    </p>
                                                </div>
                                            ) : null}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default React.memo(ResultBotItem)
