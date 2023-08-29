import { Button, Form, Radio, Row, Col, Checkbox, Modal } from 'antd'
import React, { useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const CheckFormQuestion = (props) => {
    const { examDataSubmit } = props
    const history = useHistory()
    const data = []
    const questions = examDataSubmit.data.questions
    examDataSubmit.data.questions.forEach((questions, i) =>
        data.push(questions.choices)
    )

    const [open, setOpen] = useState(false)
    const [openConfirmQuit, setOpenConfirmQuit] = useState(false)
    const showModal = () => {
        setOpen(true)
    }
    const onPressQuit = () => {
        history.push('/')
    }
    const showModalQuit = () => {
        setOpenConfirmQuit(true)
    }
    const cancelModalQuit = () => {
        setOpenConfirmQuit(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }
    const handleSubmit = () => {
        window.history.back()
        setOpen(false)
    }

    const renderOptions = (step, question, span, index, type, choose) => {
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
                            className="mb-15"
                            value={question?.choices[index + idx].isChosen}
                        >
                            {question?.choices[index + idx].isChosen ? (
                                question?.choices[index + idx].isCorrect ? (
                                    <span
                                        style={{
                                            color: 'green',
                                        }}
                                    >
                                        {question?.choices[index + idx].answer}
                                    </span>
                                ) : (
                                    <span>
                                        {question?.choices[index + idx].answer}
                                    </span>
                                )
                            ) : question?.choices[index + idx].isCorrect ? (
                                <span
                                    style={{
                                        color: 'red',
                                    }}
                                >
                                    {question?.choices[index + idx].answer}
                                </span>
                            ) : (
                                <span>
                                    {question?.choices[index + idx].answer}
                                </span>
                            )}
                        </Checkbox>
                    ) : (
                        <Radio
                            className="mb-15"
                            value={question?.choices[index + idx].isChosen}
                        >
                            {question?.choices[index + idx].isChosen ? (
                                question?.choices[index + idx].isCorrect ? (
                                    <span
                                        style={{
                                            color: 'green',
                                        }}
                                    >
                                        {question?.choices[index + idx].answer}
                                    </span>
                                ) : (
                                    <span>
                                        {question?.choices[index + idx].answer}
                                    </span>
                                )
                            ) : question?.choices[index + idx].isCorrect ? (
                                <span
                                    style={{
                                        color: 'red',
                                    }}
                                >
                                    {question?.choices[index + idx].answer}
                                </span>
                            ) : (
                                <span>
                                    {question?.choices[index + idx].answer}
                                </span>
                            )}
                        </Radio>
                    )}
                </Col>
            )
        }
        return cols
    }
    const renderOptionWithoutAttachment = (question, index) => {
        let step = parseInt(question?.choices?.length / 2)
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
                        defaultValue={[true]}
                        disabled={true}
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
                                            question.type,
                                            question?.choices
                                        )}
                                    </Row>
                                )
                            }
                        })}
                    </Checkbox.Group>
                ) : (
                    <Radio.Group
                        style={{ width: '100%', display: 'block' }}
                        value={true}
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
                                            question.type,
                                            question?.choices
                                        )}
                                    </Row>
                                )
                            }
                        })}
                    </Radio.Group>
                )}
                <div className="explain">
                    <div className="head-title ">
                        <QuestionCircleOutlined />{' '}
                        <span
                            style={{
                                textDecorationLine: 'underline',
                            }}
                        >
                            Giải thích:
                        </span>
                        <div
                            className="explain-content"
                            style={{
                                display: 'block',
                                marginLeft: 5,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: `${
                                    question?.explanation === undefined
                                        ? 'Không có lời giải thích'
                                        : question?.explanation
                                }`,
                            }}
                        ></div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Form labelWrap={true}>
                <Row className="mtz-test-action-group">
                    <Button className="mt-15 mr-15" onClick={showModalQuit}>
                        Trở về trang chủ
                    </Button>

                    <Button
                        className="mt-15 ml-15"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        Xong
                    </Button>
                </Row>
                <div
                    id="scrollableDiv"
                    style={{
                        height: 600,
                        marginTop: 20,
                        overflow: 'auto',
                        padding: '10px 16px 0px 16px',
                        background: '#F8FBFF',
                    }}
                >
                    {questions &&
                        questions.length >= 1 &&
                        questions.map((question, index) =>
                            renderOptionWithoutAttachment(question, index)
                        )}
                </div>
            </Form>
            <Modal
                open={openConfirmQuit}
                closeIcon={() => null}
                onOk={onPressQuit}
                onCancel={cancelModalQuit}
                footer={[
                    <Button
                        className="mr-10"
                        key="submit"
                        onClick={cancelModalQuit}
                    >
                        Trở lại
                    </Button>,
                    <Button
                        className="ml-10"
                        type="primary"
                        onClick={onPressQuit}
                    >
                        Thoát
                    </Button>,
                ]}
            >
                <p>Bạn có chắc chắn muốn trở về trang chủ?</p>
            </Modal>
            <Modal
                open={open}
                closeIcon={() => null}
                onOk={handleSubmit}
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
                        Chắc chắn
                    </Button>,
                ]}
            >
                <p>Bạn có chắc chắn thực hiện thao tác này?</p>
            </Modal>
        </>
    )
}

export default CheckFormQuestion
