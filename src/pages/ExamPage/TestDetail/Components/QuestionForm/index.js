import { Button, Radio, Row, Col, Checkbox, Modal, Space } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { submitExamDataRequest } from '../../../../../slices/exam'
import './styles.scss'
import {
    COUNT_DOWN_EXAM,
    COUNT_DOWN_OPEN_SUBMIT,
} from '../../../../../constants'
import { setStatusGlobal } from '../../../../../constants/component'

const QuestionForm = (props) => {
    const { questions, idTest, setTestResult, pauseTimer } = props
    const [open, setOpen] = useState(false)
    const [isLocked, setIsLocked] = useState(true)
    const [dataChoose, setDataChoose] = useState([])
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
        if (questions && questions.length > 0) {
            setDataChoose(
                questions?.map((e) => ({
                    _id: e._id,
                    choices: e.choices.map((e) => ({ ...e, isChosen: false })),
                }))
            )
            const numCountDown = questions.length * COUNT_DOWN_EXAM
            setTimeout(() => {
                setIsSubmit(true)
            }, numCountDown * 1000)

            setTimeout(() => {
                setIsLocked(false)
            }, questions.length * COUNT_DOWN_OPEN_SUBMIT * 1000)
        }
    }, [questions])

    useEffect(() => {
        if (dataChoose.length > 0 && isSubmit) {
            handleSubmit()
        }
    }, [dataChoose, isSubmit])

    const dispatch = useDispatch()

    const showModal = () => {
        setOpen(true)
    }

    const handleOk = () => {
        setOpen(false)
    }
    const handleCancel = () => {
        setOpen(false)
    }
    const handleSubmit = () => {
        setOpen(false)
        dispatch(
            submitExamDataRequest({
                id: idTest,
                requestData: { questions: dataChoose },
            })
        )
        pauseTimer()
        setTestResult(true)
    }

    const renderOptions = (step, question, span, index, type) => {
        const cols = []
        const renderStep =
            question?.choices?.length - index > step
                ? step
                : question?.choices?.length - index

        for (let idx = 0; idx < renderStep; idx++) {
            cols.push(
                <Col span={span}>
                    {type === 'MULTIPLE CHOICE' ? (
                        <Checkbox
                            key={index + idx}
                            value={index + idx}
                            className="mb-15"
                        >
                            {question?.choices[index + idx].answer}
                        </Checkbox>
                    ) : (
                        <Radio value={index + idx} className="mb-15">
                            {question?.choices[index + idx].answer}
                        </Radio>
                    )}
                </Col>
            )
        }
        return cols
    }

    const onChangeRadio = (e) => {
        const change = dataChoose.find((data) => data._id === e.target.name)
        change.choices.forEach((choice, index) => {
            if (index === e.target.value) {
                choice.isChosen = true
            } else {
                choice.isChosen = false
            }
        })
    }

    const onChangeCheckbox = (checkedValues, id) => {
        const change = dataChoose.find((data) => data._id === id)
        change.choices.forEach((choice, index) => {
            if (checkedValues.some((e) => e === index)) {
                choice.isChosen = true
            } else {
                choice.isChosen = false
            }
        })
    }

    const renderOptionWithoutAttachment = (question, index) => {
        let step = parseInt(question?.choices?.length / 2)
        step = step === 1 ? 2 : step
        step = step > 3 ? 3 : step
        const span = parseInt(24 / step)
        let questionContent = `Câu ${index}`
        if (question?.question) {
            questionContent = question?.question.replace(
                /<p>/g,
                `<p>Câu ${index + 1}: `
            )
        }

        if (!questionContent.includes('Câu')) {
            questionContent = `Câu ${index + 1}: ${questionContent}`
        }
        return (
            <>
                <div className="list-question">
                    <div className="question-box">
                        <div
                            className="question-info mb-15"
                            style={{
                                display: 'block',
                            }}
                            dangerouslySetInnerHTML={{
                                __html: questionContent,
                            }}
                        ></div>
                    </div>
                </div>

                {question?.type === 'MULTIPLE CHOICE' ? (
                    <Checkbox.Group
                        style={{ width: '100%', display: 'block' }}
                        onChange={(checkedValues) =>
                            onChangeCheckbox(checkedValues, question._id)
                        }
                        name={question._id}
                    >
                        {question?.choices?.map((_, index) => {
                            if (index % step === 0) {
                                return (
                                    <Row style={{ width: '100%' }}>
                                        {renderOptions(
                                            step,
                                            question,
                                            span,
                                            index,
                                            question.type
                                        )}
                                    </Row>
                                )
                            }
                        })}
                    </Checkbox.Group>
                ) : (
                    <Radio.Group
                        style={{ width: '100%', display: 'block' }}
                        onChange={onChangeRadio}
                        name={question._id}
                    >
                        {question?.choices?.map((_, index) => {
                            if (index % step === 0) {
                                return (
                                    <Row style={{ width: '100%' }}>
                                        {renderOptions(
                                            step,
                                            question,
                                            span,
                                            index,
                                            question.type
                                        )}
                                    </Row>
                                )
                            }
                        })}
                    </Radio.Group>
                )}
            </>
        )
    }

    return (
        <>
            <div className="d-col-center">
                <Space>
                    <Button
                        onClick={() => {
                            setStatusGlobal('')
                            window.history.back()
                        }}
                    >
                        Thoát
                    </Button>

                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                        disabled={isLocked}
                    >
                        Nộp bài
                    </Button>
                </Space>
            </div>
            <div id="scrollableDiv" className="test-detail">
                {questions &&
                    questions.map((question, index) =>
                        // có attachment
                        renderOptionWithoutAttachment(question, index)
                    )}
            </div>

            <Modal
                title="Nộp bài"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button
                        className="mr-10"
                        key="submit"
                        onClick={handleCancel}
                    >
                        Trở lại
                    </Button>,
                    <Button
                        className="ml-10"
                        type="primary"
                        onClick={handleSubmit}
                    >
                        Nộp bài
                    </Button>,
                ]}
            >
                <p>Bạn có chắc chắn muốn nộp bài test ngay bây giờ không?</p>
            </Modal>
        </>
    )
}

export default memo(QuestionForm)
