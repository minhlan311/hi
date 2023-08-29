import {
    CreditCardOutlined,
    PlusCircleOutlined,
    WalletOutlined,
} from '@ant-design/icons'
import { Button, Card, List, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import './styles.scss'
import ModalPoint from './ModalPoint'
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxis,
    BarChart,
    Legend,
    Bar,
} from 'recharts'
import moment from 'moment-timezone'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from 'react-redux'
import { userDetailRequest, userDetailSelector } from '../../../slices/user'
import { getStorage } from '../../../services/storage'
import { USER_INFO } from '../../../constants/storageKeys'

export default function Point({ history }) {
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isDesktop = useMediaQuery({ minWidth: 1920 })

    const user = getStorage(USER_INFO)
    const dispatch = useDispatch()
    const userDetail = useSelector(userDetailSelector)

    useEffect(() => {
        dispatch(userDetailRequest(user._id))
    }, [])

    const [open, setOpen] = useState(false)
    const [type, setType] = useState('')
    const [typeDate, setTypeDate] = useState('week')

    const onClose = () => {
        setOpen(false)
    }

    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        const filteredByWeek = history.filter((item) =>
            moment(item.createdAt).isSame(moment(), 'week')
        )

        const filteredByMonth = history.filter((item) =>
            moment(item.createdAt).isSame(moment(), 'month')
        )
        const filteredByQuarter = history.filter((item) =>
            moment(item.createdAt).isSame(moment(), 'quarter')
        )

        const SumByArr = (arr, name) => {
            const deposit = arr
                .filter((item) => item.type === 'DEPOSIT')
                .reduce((a, b) => a + b.value, 0)
            const withdraw = arr
                .filter((item) => item.type === 'WITHDRAW')
                .reduce((a, b) => a + b.value, 0)

            return [{ deposit: deposit, withdraw: withdraw, name: name }]
        }

        switch (typeDate) {
            case 'week':
                setFilteredData(SumByArr(filteredByWeek, 'Điểm A+'))
                break

            case 'month':
                setFilteredData(SumByArr(filteredByMonth, 'Điểm A+'))
                break

            case 'quarter':
                setFilteredData(SumByArr(filteredByQuarter, 'Điểm A+'))
                break

            default:
                setFilteredData(SumByArr(filteredByWeek, 'Điểm A+'))
                break
        }
    }, [typeDate, history])

    const totalScore = userDetail?.data?.wallet?.total

    return (
        <Card className="score" style={{ marginTop: 35 }}>
            <List>
                <List.Item style={{ paddingTop: 0 }} key="1">
                    <div>
                        <h3>Ví của bạn</h3>

                        {/* <Space className="score-item">
                            <Space style={{ color: 'gray' }}>
                       
                                <div>Điểm trong ví:</div>
                            </Space>
                            <b>3500 A+</b>
                        </Space>
                        <Space className="score-item">
                            <Space style={{ color: 'gray' }}>
                                <StarOutlined />
                                <div>Điểm thưởng:</div>
                            </Space>

                            <ArrowUpOutlined style={{ color: 'green' }} />
                            <b>625 A+</b>
                        </Space> */}
                        <Space className="score-item">
                            <Space style={{ color: 'gray' }}>
                                <WalletOutlined />

                                <div>Số dư:</div>
                            </Space>

                            <b>{totalScore ? totalScore : 0} A+</b>
                        </Space>
                    </div>
                </List.Item>
                <List.Item key="2">
                    <div style={{ width: '100%' }}>
                        <h3>Giao dịch</h3>

                        <div className="d-flex">
                            <Button
                                icon={<PlusCircleOutlined />}
                                onClick={() => {
                                    setOpen(true)
                                    setType('add')
                                }}
                                type="primary"
                                size={isMobile ? 'small' : 'middle'}
                            >
                                Thêm điểm
                            </Button>
                            <Button
                                icon={<CreditCardOutlined />}
                                onClick={() => {
                                    setOpen(true)
                                    setType('minus')
                                }}
                                size={isMobile ? 'small' : 'middle'}
                                style={{ marginLeft: 10 }}
                            >
                                Rút điểm
                            </Button>
                        </div>
                    </div>
                </List.Item>
                <List.Item key="3">
                    <div style={{ width: '100%' }}>
                        <h3>Biểu đồ</h3>

                        <Select
                            onChange={(value) => setTypeDate(value)}
                            defaultValue={'week'}
                            style={{ marginBottom: 15 }}
                        >
                            <Select.Option value="week">Tuần</Select.Option>
                            <Select.Option value="month">Tháng</Select.Option>
                            <Select.Option value="quarter">Quý</Select.Option>
                        </Select>
                        {filteredData.deposit === 0 &&
                        filteredData.quarter === 0 ? (
                            <p style={{ textAlign: 'center' }}>
                                Hiện không có giao dịch nào trong{' '}
                                {(typeDate === 'week' && 'Tuần') ||
                                    (typeDate === 'month' && 'Tháng') ||
                                    (typeDate === 'quarter' && 'Quý')}
                            </p>
                        ) : (
                            <div
                                className="d-col-center"
                                style={isTablet ? { padding: '5%' } : null}
                            >
                                <ResponsiveContainer
                                    width={isDesktop ? '118%' : '125%'}
                                    minHeight={220}
                                    maxHeight={380}
                                >
                                    <BarChart data={filteredData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />

                                        <Bar
                                            dataKey="deposit"
                                            fill="#50AA64"
                                            name="Điểm thêm"
                                        />
                                        <Bar
                                            dataKey="withdraw"
                                            fill="#DF5534"
                                            name="Điểm rút"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </List.Item>
            </List>

            <ModalPoint type={type} open={open} onClose={onClose} />
        </Card>
    )
}
