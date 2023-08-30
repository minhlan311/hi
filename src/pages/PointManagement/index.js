import React, { useEffect, useState } from 'react'
import Navigation from '../../components/layout/Navigation'
import Footer from '../../components/layout/Footer'
import { useMediaQuery } from 'react-responsive'
import Main from './Main'
import Point from './Point'
import { useDispatch, useSelector } from 'react-redux'
import {
    findTransactionRequest,
    transactionSelector,
} from '../../slices/transactions'
import { getStorage } from '../../services/storage'
import { USER_INFO } from '../../constants/storageKeys'
import { userDetailSelector } from '../../slices/user'

export default function PointManagement() {
    const isTablet = useMediaQuery({ maxWidth: 1024, minWidth: 769 })
    const isMobile = useMediaQuery({ maxWidth: 768, minWidth: 280 })
    const dispatch = useDispatch()
    const transactions = useSelector(transactionSelector)
    const userDetail = useSelector(userDetailSelector)

    const user = getStorage(USER_INFO)
    const [selectedRange, setSelectedRange] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        if ((selectedRange && selectedRange.length > 0) || search) {
            const [start, end] = selectedRange
            const payload = {
                filterQuery: {
                    startDate: start?.$d || '',
                    endDate: end?.$d || '',
                    search: search || '',
                    walletId: user.walletId,
                    status: 'SUCCESS',
                },
                options: {
                    sort: {
                        createdAt: -1,
                    },
                    pagination: false,
                },
            }
            dispatch(findTransactionRequest(payload))
        } else {
            const payload = {
                filterQuery: {
                    walletId: user.walletId,
                    status: 'SUCCESS',
                },
                options: {
                    sort: {
                        createdAt: -1,
                    },
                    pagination: false,
                },
            }
            dispatch(findTransactionRequest(payload))
        }
    }, [selectedRange, search])

    const history = transactions.data

    const [chartsData, setChartsData] = useState([])

    useEffect(() => {
        setChartsData(history)
    }, [userDetail])

    return (
        <>
            <Navigation />
            <div
                className={`${
                    isMobile || isTablet ? 'uc-container-m' : 'uc-container'
                } mtz-profilepage`}
                style={{ margin: '100px auto 30px' }}
            >
                <h2>Quản lý điểm A+</h2>
                <div
                    style={
                        isMobile
                            ? null
                            : {
                                  display: 'flex',
                                  justifyContent: 'space-between',
                              }
                    }
                >
                    {isMobile ? (
                        <>
                            <Point
                                history={history.length > 0 ? history : []}
                                status={transactions?.status}
                            />
                            <div style={{ marginTop: 30 }}>
                                <b>Lịch sử giao dịch</b>
                                <Main
                                    history={history.length > 0 ? history : []}
                                    status={transactions?.status}
                                    selectedRange={selectedRange}
                                    setSelectedRange={setSelectedRange}
                                    setSearch={setSearch}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ width: '70%' }}>
                                <Main
                                    history={history.length > 0 ? history : []}
                                    status={transactions?.status}
                                    selectedRange={selectedRange}
                                    setSelectedRange={setSelectedRange}
                                    setSearch={setSearch}
                                />
                            </div>
                            <div style={{ width: '28%', marginTop: -20 }}>
                                <Point
                                    history={
                                        chartsData.length > 0 ? chartsData : []
                                    }
                                    status={transactions?.status}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}
