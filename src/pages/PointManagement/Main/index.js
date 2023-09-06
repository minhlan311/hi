import { DatePicker, Input, Space, Table } from 'antd'

import viVN from 'antd/locale/vi_VN'
import dayjs from 'dayjs'

import { useMediaQuery } from 'react-responsive'

export default function Main({
    history,
    status,
    selectedRange,
    setSelectedRange,
    setSearch,
}) {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 768 })
    const isMobile = useMediaQuery({ maxWidth: 767, minWidth: 280 })

    const columns = [
        {
            title: 'Thời gian giao dịch',
            dataIndex: 'createdAt',
            render: (_, record) => {
                const dateFormat = dayjs(record.createdAt).locale('vi')
                return dateFormat.format('DD/MM/YYYY - HH:mm')
            },

            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),

            width: '28%',
        },

        {
            title: 'Số điểm',
            dataIndex: 'value',
            render: (_, record) => (
                <div
                    style={
                        record.type === 'WITHDRAW'
                            ? { color: '#DF5534' }
                            : { color: '#50AA64' }
                    }
                >
                    {record.type === 'WITHDRAW' ? '-' : '+'}
                    {record.value} A+
                </div>
            ),
            sorter: (a, b) => a.score - b.score,
            width: '18%',
        },

        {
            title: 'Nội dung',
            dataIndex: 'message',
            render: (_, record) => <div>ahihihii</div>,
        },
    ]

    const onSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleDateChange = (dates) => {
        setSelectedRange(dates)
    }

    return (
        <div>
            <div
                className="d-space-c"
                style={{ width: '100%', margin: '15px 0 ' }}
            >
                {isMobile || isTablet ? null : <b>Lịch sử giao dịch</b>}
                <div style={isMobile ? { width: '100%' } : { display: 'flex' }}>
                    <DatePicker.RangePicker
                        format={'DD/MM/YYYY'}
                        locale={viVN.DatePicker}
                        onChange={handleDateChange}
                        value={selectedRange}
                        style={
                            isMobile
                                ? { marginBottom: 10, width: '100%' }
                                : { marginRight: 10 }
                        }
                        d
                    />
                    <Input
                        placeholder="Tìm kiếm"
                        onSelect={onSearch}
                        allowClear
                    />
                </div>
            </div>
            <Table
                locale={viVN.Table}
                columns={columns}
                dataSource={history}
                pagination={{ pageSize: 10 }}
                scroll={
                    isMobile
                        ? {
                              x: 650,
                          }
                        : null
                }
                loading={status !== 'success'}
            />
        </div>
    )
}
