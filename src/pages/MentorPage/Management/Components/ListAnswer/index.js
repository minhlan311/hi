import React, { memo, useCallback } from 'react'
import { Avatar, Button, Image, List, Row, Skeleton, Space } from 'antd'
import { useEffect, useState } from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import Vimeo from '@u-wave/react-vimeo'
const ListAnswer = ({ data }) => {
    const [numToShow, setNumToShow] = useState(4)
    const [loading, setLoading] = useState(false)

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    )
    const renderVideoPlayer = useCallback((attachment) => {
        if (attachment.url) {
            return <Vimeo responsive={true} video={attachment.url} />
        }
    }, [])

    const handleLoadMore = () => {
        setLoading(true)
        setTimeout(() => {
            setNumToShow(numToShow + 4)
            setLoading(false)
        }, 1000)
    }

    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data && data.slice(0, numToShow)}
                renderItem={(item) => (
                    <List.Item
                        key={item.answer}
                        actions={[
                            <IconText
                                icon={StarOutlined}
                                text="156"
                                key="list-vertical-star-o"
                            />,
                            <IconText
                                icon={LikeOutlined}
                                text="156"
                                key="list-vertical-like-o"
                            />,
                            <IconText
                                icon={MessageOutlined}
                                text="156"
                                key="list-vertical-message"
                            />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item?.userId?.avatarUrl} />}
                            title={item?.userId?.fullName}
                        />

                        <div style={{ display: 'block' }}>
                            <p>{item?.answer}</p>
                            <div>
                                <Image.PreviewGroup>
                                    {item?.attachment.map((media, i) =>
                                        media?.type === 'image' ? (
                                            <Image
                                                key={i}
                                                width={150}
                                                src={media?.url}
                                            />
                                        ) : (
                                            renderVideoPlayer(media)
                                        )
                                    )}
                                </Image.PreviewGroup>
                            </div>
                        </div>
                    </List.Item>
                )}
            />

            {numToShow < data.length && (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button
                        onClick={handleLoadMore}
                        loading={loading}
                        type="text"
                    >
                        Xem thêm
                    </Button>
                </div>
            )}
        </div>
    )
}

export default memo(ListAnswer)
