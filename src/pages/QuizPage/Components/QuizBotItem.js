import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import { renderAttachments } from '../../../config/Const'

import { createProgression } from '../../../services/Progress/progressService'

import ModalShowImage from '../../../components/ModalShowImage/ModalShowImage'
import QuizUserItem from './QuizUserItem'
import ResultBotItem from './ResultBotItem'

import styles from '../styles/index.module.scss'

const cx = classNames.bind(styles)

const time = 1

export default function QuizBotItem(props) {
    const dispatch = useDispatch()

    const {
        data,
        totalQuestion,
        arrayQuestion,
        arrayTotalQuestion,
        scroll,
        setScroll,
        handlePlusTotalQuestion,
    } = props
    const [content, setContent] = useState('')
    const [status, setStatus] = useState('')
    const [countFail, setCountFail] = useState(0)

    const [event, setEvent] = useState('unset')
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShow(true)
            setScroll(scroll + 1)
        }, time * 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    const handleChange = (event, choiceItem, questionData) => {
        const { title, value } = event.target
        setContent(title)
        setStatus(value)

        if (value === 'true') {
            const result = totalQuestion + 1
            handlePlusTotalQuestion(result)
            setEvent('none')
            setCountFail(0)
        } else {
            // const cloneArrayQues = cloneDeep(arrayQuestion);
            const cloneArrayQues = JSON.parse(JSON.stringify(arrayQuestion))
            const lengthItem =
                cloneArrayQues.filter((f) => f._id === questionData._id)
                    .length - 1

            const result = cloneArrayQues.filter(
                (f) => f._id === questionData._id
            )[lengthItem]

            cloneArrayQues.filter((f) => f._id === questionData._id)[
                lengthItem
            ].choices = result.choices.filter((f) => f._id !== choiceItem._id)

            arrayQuestion.push(
                cloneArrayQues.filter((f) => f._id === questionData._id)[
                    lengthItem
                ]
            )

            setCountFail(lengthItem + 1)
            setScroll(scroll + 1)
        }
    }
    useEffect(() => {}, [status])

    return (
        <React.Fragment>
            <ModalShowImage />
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
                            {isShow ? (
                                <div
                                    style={{ pointerEvents: `${event}` }}
                                    className={cx('bot-right')}
                                >
                                    <div className={cx('bot-content')}>
                                        <div className={cx('bot-question')}>
                                            {data?.attachments &&
                                                renderAttachments(
                                                    data?.attachments,
                                                    dispatch
                                                )}
                                            <div
                                                className={cx('bot-main-ques')}
                                            >
                                                <p
                                                    className={cx(
                                                        'bot-title',
                                                        'quiz'
                                                    )}
                                                >
                                                    {data?.question}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('bot-answer')}>
                                        {data?.choices.map((item, index) => {
                                            return (
                                                <label
                                                    key={index}
                                                    className={cx('item')}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        padding: '8px 16px',
                                                    }}
                                                >
                                                    <input
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e,
                                                                item,
                                                                data
                                                            )
                                                        }
                                                        type="radio"
                                                        name={data.id}
                                                        id={item._id}
                                                        value={
                                                            item.isCorrectAnswer
                                                        }
                                                        title={item.answer}
                                                    />
                                                    <div
                                                        style={{
                                                            paddingLeft: '16px',
                                                            flex: 1,
                                                        }}
                                                    >
                                                        {item.answer}
                                                    </div>
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <img
                                    src={require('../images/typing.gif')}
                                    alt="Loading"
                                    className={cx('gif')}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <QuizUserItem content={content} />
            {
                <ResultBotItem
                    dispatch={dispatch}
                    attachments={data?.attachments}
                    explaination={data?.explaination}
                    hint={data?.hint}
                    status={status}
                    totalQuestion={totalQuestion}
                    arrayQuestion={arrayQuestion}
                    arrayTotalQuestion={arrayTotalQuestion}
                    time={time}
                    countFail={countFail}
                />
            }
        </React.Fragment>
    )
}
