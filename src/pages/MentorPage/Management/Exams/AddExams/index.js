import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Descriptions, Form, Input, Modal, Radio, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCategoriesRequest,
    categoriesSelector,
} from '../../../../../slices/category'

import { getStorage } from '../../../../../services/storage'
import { USER_INFO } from '../../../../../constants/storageKeys'
import Questions from './Questions'
import {
    findSubjectRequest,
    subjectsSelector,
} from '../../../../../slices/subjects'
export default function AddExams(props) {
    const { openAdd, setOpenAdd } = props
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const handleSubmit = (values) => {}

    const sights = (fields, { add, remove }) => {
        return (
            <>
                {fields.map((field) => (
                    <Questions field={field} key={field.key} remove={remove} />
                ))}

                <Form.Item>
                    <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                    >
                        Thêm câu hỏi
                    </Button>
                </Form.Item>
            </>
        )
    }

    const handleChange = (value) => {
        if (user?.educationType) {
            const body = {
                filterQuery: {
                    educationType: [user?.educationType, ''],
                    educationId: user?.educationId,
                    onModel: 'EXAM',
                    testType: value,
                },
                options: {
                    pagination: false,
                    sort: { position: 1 },
                },
            }
            dispatch(getCategoriesRequest(body))
        }
        const payload = {
            filterQuery: {
                educationType: 'UNIVERSITY',
                status: 'ACTIVE',
            },
            options: {
                pagination: false,
                sort: { position: 1 },
            },
        }
        dispatch(findSubjectRequest(payload))
    }
    const user = getStorage(USER_INFO)
    const categories = useSelector(categoriesSelector)

    const categoryOptions = []
    categories?.data?.forEach((cate) => {
        return categoryOptions.push({ value: cate._id, label: cate.name })
    })

    const subjects = useSelector(subjectsSelector)
    const subject = []
    subjects?.data?.forEach((sub) => {
        return subject.push({ value: sub._id, label: sub.name })
    })

    return (
        <div>
            {' '}
            <Button type="primary" onClick={() => setOpenAdd(true)}>
                Thêm bộ đề
            </Button>
            <Modal
                title="Title"
                open={openAdd}
                onOk={() => form.submit()}
                onCancel={() => setOpenAdd(!openAdd)}
                width={'80%'}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="plan"
                        label="Loại phí"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên bộ đề',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={'FREE'}>Miễn phí</Radio>
                            <Radio value={'PAY'}>Trả phí</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="examName"
                        label="Tên bộ đề"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên bộ đề',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên bộ đề" />
                    </Form.Item>
                    <Descriptions>
                        <Descriptions.Item>
                            <Form.Item
                                style={{ width: '98%' }}
                                name="type"
                                label="Loại bộ đề"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập thể loại',
                                    },
                                ]}
                            >
                                <Select
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: 'TEST',
                                            label: 'Bài Test',
                                        },
                                        {
                                            value: 'QUIZ',
                                            label: 'Bài Quiz',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {' '}
                            <Form.Item
                                style={{ width: '98%' }}
                                name="categories"
                                label="Thể loại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập thể loại',
                                    },
                                ]}
                            >
                                <Select
                                    options={categoryOptions}
                                    disabled={
                                        categoryOptions?.length > 0
                                            ? false
                                            : true
                                    }
                                />
                            </Form.Item>
                        </Descriptions.Item>
                        <Descriptions.Item>
                            {' '}
                            <Form.Item
                                style={{ width: '100%' }}
                                name="subject"
                                label="Môn học"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên bộ đề',
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Nhập tên môn học"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').includes(input)
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare(
                                                (
                                                    optionB?.label ?? ''
                                                ).toLowerCase()
                                            )
                                    }
                                    options={subject}
                                    disabled={
                                        subject?.length > 0 ? false : true
                                    }
                                />
                            </Form.Item>
                        </Descriptions.Item>
                    </Descriptions>
                    <Form.List name="sights">{sights}</Form.List>
                </Form>
            </Modal>
        </div>
    )
}
