import React, { useEffect, useState } from 'react'
import {
    Button,
    Col,
    Drawer,
    Form,
    Input,
    Row,
    Select,
    Space,
    message,
} from 'antd'
import {
    educationsSelector,
    getEducationsRequest,
} from '../../../../../slices/education'
import { useDispatch, useSelector } from 'react-redux'
import {
    createExamDataRequest,
    createExamDataSelector,
    examDetailSelector,
    getExamDetailRequest,
    updateExamDataRequest,
    updateExamDataSelector,
} from '../../../../../slices/exam'
import ActiveCode from '../Modal/ActiveCode'
import {
    findSubjectRequest,
    subjectsSelector,
} from '../../../../../slices/subjects'

const DrawerExam = (props) => {
    const { open, setOpenExamDrawer, refreshPage, testId } = props
    const dispatch = useDispatch()
    const subjects = useSelector(subjectsSelector)
    const educations = useSelector(educationsSelector)
    const createExam = useSelector(createExamDataSelector)
    const updateExam = useSelector(updateExamDataSelector)
    const examDetail = useSelector(examDetailSelector)
    const [action, setAction] = useState('create')
    const [form] = Form.useForm()
    const [educationType, setEducationType] = useState('UNIVERSITY')
    const [isModalActiveCode, setIsModalActiveCode] = useState(false)
    const [typePlan, setTypePlan] = useState('FREE')

    useEffect(() => {
        if (testId) {
            dispatch(getExamDetailRequest(testId))
            setAction('update')
        } else {
            setAction('create')
            form.resetFields()
        }
    }, [testId])

    useEffect(() => {
        const body = {
            filterQuery: {
                educationType: educationType,
            },
            options: {
                pagination: false,
            },
        }
        dispatch(getEducationsRequest(body))
        dispatch(findSubjectRequest(body))
    }, [educationType])

    const onCloseDrawer = () => {
        setOpenExamDrawer(false)
        setEducationType('UNIVERSITY')
        setTypePlan('FREE')
    }
    const dataSubject = []
    subjects.data &&
        subjects.data.forEach((item, key) => {
            dataSubject.push({
                value: item._id,
                label: item.name,
                educationType: item.educationType,
                key: key,
            })
        })

    const dataSchool = [{ value: 'ALL', label: 'Tất cả', key: 'ALL' }]
    educations.data &&
        educations.data.forEach((item, key) => {
            dataSchool.push({
                value: item._id,
                label: item.name,
                key: key,
            })
        })

    useEffect(() => {
        form.setFieldsValue(examDetail.data)
        setTypePlan(examDetail.data.plan)
    }, [examDetail.data, form])

    useEffect(() => {
        if (createExam.status === 'success') {
            refreshPage()
            setOpenExamDrawer(false)
            form.resetFields()
            setEducationType('UNIVERSITY')
            setTypePlan('FREE')
            message.success('Thêm bài thi thành công')
        }
        if (updateExam.status === 'success') {
            refreshPage()
            setOpenExamDrawer(false)
            form.resetFields()
            setTypePlan('FREE')
            setEducationType('UNIVERSITY')
        }
    }, [createExam, updateExam])

    const onFinish = (values) => {
        if (values.educations.some((e) => e === 'ALL')) {
            values.educations = educations?.data?.map((e) => e._id)
        }
        if (values.cost) {
            values.cost = parseInt(values.cost)
        }

        if (action === 'create') {
            dispatch(createExamDataRequest(values))
            setOpenExamDrawer(false)
        } else {
            dispatch(updateExamDataRequest({ id: testId, requestData: values }))
            message.success('Sửa bộ đề thành công')
            setOpenExamDrawer(false)
        }
    }

    return (
        <div>
            <Drawer
                title={action === 'create' ? 'Thêm mới' : 'Chỉnh sửa'}
                width={'50%'}
                onClose={onCloseDrawer}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button
                            onClick={() => {
                                setOpenExamDrawer(false)
                                form.resetFields()
                            }}
                        >
                            Hủy
                        </Button>
                        <Button onClick={() => form.submit()} type="primary">
                            Tiếp tục
                        </Button>
                    </Space>
                }
            >
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    form={form}
                    initialValues={{
                        plan: 'FREE',
                        educationType: 'UNIVERSITY',
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={['name']}
                                label="Tiêu đề bài thi"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập tiêu đề bài thi',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên bộ đề" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['type']}
                                label="Tiêu đề bài thi"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập tiêu đề bài thi',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn loại bộ đề"
                                    options={[
                                        {
                                            value: 'QUIZ',
                                            label: 'Bài Quiz',
                                        },
                                        {
                                            value: 'TEST',
                                            label: 'Bài thi thử',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={['plan']}
                                label="Mô hình bộ đề"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng chọn kiểu bộ đề để tiếp tục!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn phí"
                                    onChange={(value) => {
                                        setTypePlan(value)
                                        form.setFieldValue('cost')
                                    }}
                                    options={[
                                        {
                                            value: 'FREE',
                                            label: 'Miễn phí',
                                        },
                                        {
                                            value: 'PREMIUM',
                                            label: 'Trả phí',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="cost"
                                label={'Số điểm'}
                                rules={[
                                    {
                                        required: typePlan === 'PREMIUM',
                                        message: `Vui lòng nhập số điểm`,
                                    },
                                    {
                                        validator: (
                                            rule,
                                            value,
                                            callback,
                                            source,
                                            options
                                        ) => {
                                            if (value && parseInt(value) < 1) {
                                                callback(
                                                    'Số điểm phải lớn hơn 0'
                                                )
                                            } else {
                                                callback()
                                            }
                                        },
                                    },
                                ]}
                            >
                                <Input
                                    disabled={typePlan !== 'PREMIUM'}
                                    type={'number'}
                                    placeholder={'Nhập số điểm'}
                                ></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name={['educationType']}
                                label="Khối trường"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng chọn khối trường tiếp tục!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn khối trường"
                                    onChange={(value) => {
                                        setEducationType(value)
                                        form.setFieldValue('subjectId')
                                        form.setFieldValue('educations')
                                    }}
                                    options={[
                                        {
                                            value: 'UNIVERSITY',
                                            label: 'Đại học',
                                        },
                                        {
                                            value: 'HIGH SCHOOL',
                                            label: 'THPT',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name={['subjectId']}
                                label="Chọn môn học"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng chọn môn học để tiếp tục!',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn môn học"
                                    allowClear
                                    style={{ width: '100%' }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '')
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={dataSubject}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            {action === 'update' ? (
                                <Form.Item
                                    name={['educations']}
                                    label="Chọn trường học"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng chọn trường để tiếp tục!',
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        maxTagCount={'responsive'}
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Vui lòng chọn trường học"
                                        options={dataSchool}
                                    />
                                </Form.Item>
                            ) : (
                                educationType !== '' && (
                                    <Form.Item
                                        name={['educations']}
                                        label="Chọn trường học"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng chọn trường để tiếp tục!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Vui lòng chọn trường học"
                                            options={dataSchool}
                                        />
                                    </Form.Item>
                                )
                            )}
                        </Col>
                        <Col span={12}></Col>
                    </Row>
                </Form>
            </Drawer>
            <ActiveCode
                open={isModalActiveCode}
                setIsModalActiveCode={setIsModalActiveCode}
                examData={createExam.data}
                refreshPage={refreshPage}
            />
        </div>
    )
}
export default DrawerExam
