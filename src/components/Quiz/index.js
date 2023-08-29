import React, { useEffect, useState, useRef, memo } from 'react'
import imageBot from './images/bot1.png'
import imageBotTyping from './images/typing.gif'
import audioCorrect from './audio/correct-choice-43861.mp3'
import audioWrong from './audio/failfare-86009.mp3'
import audioSucess from './audio/success.mp3'
import { RIGHT_ANSWERS, WRONG_ANSWERS } from './BotSentence'
import './style.scss'
import { getStorage } from '../../services/storage'
import { USER_INFO } from '../../constants/storageKeys'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { cloneDeep } from 'lodash'

import { Button, Card } from 'antd'
import { SoundOutlined } from '@ant-design/icons'
import { setSoundGlobal } from '../../constants/component'
import Vimeo from '@u-wave/react-vimeo'
import settings from '../../settings'
import noAvt from '../../assets/images/navigation/No-avt.jpg'

const Quiz = (prop) => {
    const { listQuiz, handelUpdateProgression } = prop

    const user = getStorage(USER_INFO)
    const quizRef = useRef(null)
    const [arrayQuiz, setArrayQuiz] = useState(listQuiz)
    const [indexQuiz, setIndexQuiz] = useState(null)
    const [choiceUser, setChoiceUser] = useState([])
    const [robotIsTyping, setRobotIsTyping] = useState(false)
    const [messageList, setMessageList] = useState([])
    const [countUserChoice, setCountUserChoice] = useState(0)
    const [isCorrect, setIsCorrect] = useState(false)
    const [onSound, setOnSound] = useState(setSoundGlobal() === '1')
    const scrollToMyRef = () => {
        const scroll =
            quizRef.current.scrollHeight + quizRef.current.clientHeight
        quizRef.current.scrollTo(quizRef.current.clientHeight, scroll)
    }
    const playAudio = (isCorrect, success = null) => {
        if (onSound) {
            if (!success) {
                const url = isCorrect ? audioCorrect : audioWrong
                const audioObject = new Audio(url)
                audioObject.play()
            } else {
                const audioObject = new Audio(audioSucess)
                audioObject.play()
            }
        }
    }

    const handelUserChoice = (answer, e) => {
        const isCorrect = answer.isCorrect
        setIsCorrect(isCorrect)
        if (answer.isCorrect) {
            setCountUserChoice(0)
            pushMessageTrue(answer)
            setTimeout(() => {
                changeQuiz()
            }, 3000)
        } else {
            setCountUserChoice((countUserChoice) => countUserChoice + 1)
            pushMessageFalse(answer)
        }
    }
    const removeChoice = (answer) => {
        const newChoices = cloneDeep(choiceUser)
        const index = newChoices.findIndex(
            (item) => item.answer === answer.answer
        )
        newChoices.splice(index, 1)
        setChoiceUser(newChoices)
    }
    useEffect(() => {
        if (choiceUser) {
            if (arrayQuiz[indexQuiz]) {
                setMessageList([
                    ...(messageList.length > 0 ? messageList : []),
                    {
                        robot: {
                            title: arrayQuiz[indexQuiz]?.question,
                            media: arrayQuiz[indexQuiz]?.question?.attachment
                                ?.url,
                            typeMedia:
                                arrayQuiz[indexQuiz]?.question?.attachment
                                    ?.type,
                            isTyping: false,
                            choices: choiceUser,
                            disabled: false,
                            isShow: true,
                        },
                    },
                ])
            } else {
                setMessageList([
                    {
                        robot: {
                            title: 'Bắt đầu bài kiểm tra',
                            media: arrayQuiz[indexQuiz]?.question?.attachment
                                ?.url,
                            typeMedia:
                                arrayQuiz[indexQuiz]?.question?.attachment
                                    ?.type,
                            isTyping: false,
                            choices: [],
                            disabled: false,
                            isShow: true,
                        },
                    },
                ])
            }
        }
    }, [choiceUser])

    const pushMessageTrue = (answer) => {
        setIsCorrect(true)
        setMessageList([
            ...messageList,
            {
                user: {
                    message: answer.answer,
                    isShow: true,
                },
            },
            {
                robot: {
                    message:
                        RIGHT_ANSWERS[
                            Math.floor(Math.random() * RIGHT_ANSWERS.length)
                        ],
                    isTyping: true,
                    isShow: true,
                },
            },
            arrayQuiz[indexQuiz]?.explanation
                ? {
                      robot: {
                          explanation: arrayQuiz[indexQuiz]?.explanation,
                          isTyping: true,
                          isShow: true,
                      },
                  }
                : {
                      robot: {
                          message: '👍',
                          isTyping: true,
                          isShow: true,
                      },
                  },
        ])
        setTimeout(() => {
            setRobotIsTyping(true)
            playAudio(answer.isCorrect)
        }, 1000)
        setTimeout(() => {
            setRobotIsTyping(false)
        }, 2500)
    }
    const changeQuiz = () => {
        const newArrayQuiz = cloneDeep(arrayQuiz)

        newArrayQuiz.splice(indexQuiz, 1)
        setArrayQuiz(newArrayQuiz)
    }
    useEffect(() => {
        const newIndexQuiz =
            arrayQuiz.length > 1
                ? Math.floor(Math.random() * arrayQuiz.length)
                : 0
        setIndexQuiz(newIndexQuiz)
        const newChoices = cloneDeep(arrayQuiz[newIndexQuiz]?.choices)
        setChoiceUser(newChoices)
        if (arrayQuiz.length === 0) {
            playAudio(null, true)
            setTimeout(() => {
                handelUpdateProgression()
            }, 1500)
        }
    }, [arrayQuiz])

    const pushMessageFalse = (answer) => {
        const hint = arrayQuiz[indexQuiz]?.hint
        if (countUserChoice >= 1) {
            setMessageList([
                ...messageList,
                {
                    user: {
                        message: answer.answer,
                        isShow: true,
                    },
                },
                {
                    robot: {
                        message:
                            WRONG_ANSWERS[
                                Math.floor(Math.random() * WRONG_ANSWERS.length)
                            ],
                        isTyping: false,
                        isShow: true,
                    },
                },
                {
                    robot: {
                        hint: hint,
                        isTyping: true,
                        isShow: true,
                    },
                },
            ])
            setTimeout(() => {
                removeChoice(answer)
            }, 3000)
        } else {
            setMessageList([
                ...messageList,
                {
                    user: {
                        message: answer.answer,
                        isTyping: false,
                        isShow: true,
                        image: '',
                    },
                },
                {
                    robot: {
                        message:
                            WRONG_ANSWERS[
                                Math.floor(Math.random() * WRONG_ANSWERS.length)
                            ],
                        isTyping: true,
                        isShow: true,
                    },
                },
            ])
            setTimeout(() => {
                removeChoice(answer)
            }, 3000)
        }
        setTimeout(() => {
            setRobotIsTyping(true)
            playAudio(answer.isCorrect)
        }, 1000)
        setTimeout(() => {
            setRobotIsTyping(false)
        }, 2500)
    }
    useEffect(() => {
        if (robotIsTyping) {
            const newMessageList = cloneDeep(messageList)
            if (isCorrect) {
                newMessageList[newMessageList.length - 2].robot.isShow = true
                newMessageList[newMessageList.length - 2].robot.isTyping = false
            } else {
                if (countUserChoice > 1) {
                    newMessageList[
                        newMessageList.length - 4
                    ].robot.disabled = true

                    setTimeout(() => {
                        newMessageList[
                            newMessageList.length - 2
                        ].robot.isShow = true
                        newMessageList[
                            newMessageList.length - 2
                        ].robot.isTyping = false
                        newMessageList[
                            newMessageList.length - 1
                        ].robot.isShow = true
                        newMessageList[
                            newMessageList.length - 1
                        ].robot.isTyping = false
                    }, 1000)
                } else {
                    newMessageList[
                        newMessageList.length - 3
                    ].robot.disabled = true
                }
            }
            newMessageList[newMessageList.length - 1].robot.isTyping = false
            setMessageList(newMessageList)
        }
    }, [countUserChoice, isCorrect, messageList, robotIsTyping])
    useEffect(() => {
        scrollToMyRef()
    }, [messageList])

    const renderMessageUser = (messageUser) => {
        return (
            <div className="quiz_user__answer">
                <div className="quiz_user__answer__content">
                    <div className="quiz_user__answer__content__text">
                        {messageUser?.message}
                    </div>
                    <img
                        src={user?.avatarUrl ? user.avatarUrl : noAvt}
                        alt={user?.fullname}
                        id="avatar-robot"
                    />
                </div>
            </div>
        )
    }
    const renderMedia = (type = 'iamge', url = '') => {
        if (type === 'image' && url) {
            return (
                <Zoom>
                    <img
                        src={settings.FILE_URL + '/' + url}
                        alt="media"
                        className="quiz_robot__media"
                    />
                </Zoom>
            )
        } else if (type === 'video') {
            return <Vimeo responsive={true} video={url} />
        } else {
            return null
        }
    }
    const renderMessageRobot = (messageRobot) => {
        return (
            <>
                {messageRobot?.isShow ? (
                    <div className="quiz_robot__answer">
                        <div className="quiz_robot__answer__content">
                            <img
                                src={imageBot}
                                alt="robot"
                                id="avatar-robot"
                                className="avatar"
                            />
                            {messageRobot?.isTyping ? (
                                <div className="quiz_robot__typing">
                                    {' '}
                                    <img
                                        src={imageBotTyping}
                                        id="typing"
                                        alt="robot"
                                    />{' '}
                                </div>
                            ) : null}
                            {!messageRobot?.isTyping &&
                            messageRobot?.title &&
                            messageRobot?.choices ? (
                                <div className="quiz_robot__answer__content__text">
                                    <div className="question">
                                        <div style={{ width: '100%' }}>
                                            {messageRobot?.title && (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${messageRobot?.title}`,
                                                    }}
                                                ></div>
                                            )}
                                        </div>

                                        {renderMedia(
                                            messageRobot.typeMedia,
                                            messageRobot.media
                                        )}
                                    </div>
                                    <div className="quiz_robot__answer__content__text__image">
                                        {renderChoice(
                                            messageRobot.choices,
                                            messageRobot.disabled
                                        )}
                                    </div>
                                </div>
                            ) : null}
                            {!messageRobot?.isTyping && messageRobot?.icon ? (
                                <img src={messageRobot?.icon} alt="robot" />
                            ) : null}

                            {/* render message  */}

                            {!messageRobot?.isTyping &&
                            messageRobot?.message ? (
                                <div className="quiz_robot__answer__content__text">
                                    <div style={{ padding: '5px 10px' }}>
                                        {messageRobot?.message && (
                                            <div>{messageRobot?.message}</div>
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            {/* render hint */}

                            {!messageRobot?.isTyping && messageRobot?.hint ? (
                                <div className="quiz_robot__answer__content__text">
                                    <div className="question">
                                        {messageRobot?.hint && (
                                            <>
                                                <span
                                                    style={{
                                                        color: 'red',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    Gợi ý dành cho bạn:{' '}
                                                </span>
                                                <div
                                                    style={{ padding: '10px' }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${messageRobot?.hint}`,
                                                    }}
                                                ></div>
                                            </>
                                        )}
                                        {renderMedia(
                                            messageRobot?.hint?.attachment
                                                ?.type,
                                            messageRobot?.hint?.attachment?.url
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            {!messageRobot?.isTyping &&
                            messageRobot?.explanation ? (
                                <div className="quiz_robot__answer__content__text">
                                    <div className="question">
                                        {messageRobot?.explanation && (
                                            <>
                                                <span
                                                    style={{
                                                        color: 'blue',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    Giải thích:{' '}
                                                </span>
                                                <div
                                                    style={{ padding: '10px' }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${messageRobot?.explanation}`,
                                                    }}
                                                ></div>
                                            </>
                                        )}
                                        {renderMedia(
                                            messageRobot?.explanation
                                                ?.attachment?.type,
                                            messageRobot?.explanation
                                                ?.attachment?.url
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </>
        )
    }
    const renderMessage = (message) => {
        return message?.length > 0
            ? message.map((item, index) => {
                  return (
                      <div className="quiz_message" key={index}>
                          {item?.user?.message && (
                              <div className="quiz_message__user">
                                  {renderMessageUser(item.user)}
                              </div>
                          )}
                          {item?.robot && (
                              <div className="quiz_message__robot">
                                  {renderMessageRobot(item.robot)}
                              </div>
                          )}
                      </div>
                  )
              })
            : null
    }

    const renderChoice = (choices, disabled = null) => {
        return choices.map((choice, index) => {
            return (
                <div className="quiz_robot__choice" key={index}>
                    <div className="quiz_robot__choice__content">
                        <div className="quiz_robot__choice__content__text">
                            <input
                                type="radio"
                                name={`choice`}
                                onChange={(e) => handelUserChoice(choice, e)}
                                disabled={disabled}
                            />
                            <label htmlFor={`choice-${index}`}>
                                {choice.answer}
                            </label>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <Card
            title="Bài Quiz"
            extra={
                <>
                    <Button
                        style={
                            onSound ? { color: '#1890ff' } : { color: '#ccc' }
                        }
                        icon={<SoundOutlined />}
                        type={!onSound ? 'primary' : 'default'}
                        onClick={() => {
                            setOnSound((onSound) => !onSound)
                            setSoundGlobal(onSound ? '0' : '1')
                        }}
                    >
                        {onSound ? 'Tắt âm' : 'Bật âm'}
                    </Button>
                </>
            }
        >
            <div className="quiz_wrap" ref={quizRef}>
                <>{messageList.length > 0 && renderMessage(messageList)}</>
            </div>
        </Card>
    )
}
export default memo(Quiz)
