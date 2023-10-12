/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'antd'

function DownloadButton({ fileUrl, fileName }: any) {
  const downloadFile = (url: string, name: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = name
    link.click()
  }

  return <Button onClick={() => downloadFile(fileUrl, fileName)}>Tải về</Button>
}

export default DownloadButton
