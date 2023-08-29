import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { cloneDeep } from 'lodash'
import styles from '../styles/index.module.scss'
import Intro from './Intro'
import QuizBotItem from './QuizBotItem'
import Input from './Input'

const cx = classNames.bind(styles)

export default function Ready(props) {
    const { listQuiz, lesson } = props

    const [isStart, setIsStart] = useState(false)

    const [totalQuestion, setTotalQuestion] = useState(1)
    const [scroll, setScroll] = useState(0)
    const [arrayQuestion, setArrayQuestion] = useState()

    //scrollBottom
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    useEffect(() => {
        scrollToBottom()
    }, [totalQuestion, scroll])

    const handlePlusTotalQuestion = (valueQuestion) => {
        const nextQuiz = listQuiz[valueQuestion - 1]
        // const cloneArray = cloneDeep(arrayQuestion);
        const cloneArray = JSON.parse(JSON.stringify(arrayQuestion))

        if (nextQuiz) {
            cloneArray.push(nextQuiz)
        }
        setArrayQuestion(cloneArray)
        setTotalQuestion(valueQuestion)
    }

    useEffect(() => {
        setArrayQuestion(listQuiz?.slice(0, totalQuestion))
    }, [listQuiz])

    const handleRenderItem = () => {
        return arrayQuestion?.map((item, index) => {
            return (
                <QuizBotItem
                    key={index}
                    data={item}
                    handlePlusTotalQuestion={handlePlusTotalQuestion}
                    totalQuestion={totalQuestion}
                    arrayQuestion={arrayQuestion}
                    arrayTotalQuestion={listQuiz}
                    setScroll={setScroll}
                    scroll={scroll}
                />
            )
        })
    }

    return (
        <div className={cx('todo-wrap')}>
            <div className={cx('todo-content')}>
                <Intro
                    isStart={isStart}
                    setIsStart={setIsStart}
                    lesson={lesson}
                />
                {isStart && handleRenderItem()}
                <div ref={messagesEndRef} />
            </div>
            <Input />
        </div>
    )
}
