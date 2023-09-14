/* eslint-disable react-hooks/exhaustive-deps */
import { Select } from 'antd'
import { useState, useEffect } from 'react'

type Props = {
  levels: (data: string) => void
}

export default function LevelComponent({ levels }: Props) {
  const [educationType, setEducationType] = useState<string>('')

  useEffect(() => {
    levels(educationType)
  }, [educationType])

  const handleChange = (value: string) => {
    setEducationType(value)
  }

  return (
    <div>
      <h3>Trình độ đào tạo</h3>
      <Select
        placeholder={'Chọn trình độ đào tạo'}
        style={{ width: 180 }}
        onChange={handleChange}
        options={[
          { value: 'Dưới đại học', label: 'Dưới đại học' },
          { value: 'Đại học', label: 'Đại học' }
        ]}
      />
    </div>
  )
}
