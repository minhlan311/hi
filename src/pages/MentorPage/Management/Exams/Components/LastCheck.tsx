/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyCustom from '@/components/EmptyCustom/EmptyCustom'
import { ExamState, Skill } from '@/interface/exam'
import { Descriptions, List, Space } from 'antd'

type Props = {
  examData: ExamState
  skillData: Skill[]
}

const LastCheck = (props: Props) => {
  const { examData, skillData } = props
  if (examData)
    return (
      <Space direction='vertical' className='sp100'>
        <Descriptions column={1}>
          <Descriptions.Item label='Tiêu đề'>
            <b>{examData.name}</b>
          </Descriptions.Item>
          <Descriptions.Item label='Chú thích'>
            <div
              className={'dangerHTML'}
              dangerouslySetInnerHTML={{
                __html: examData.description === '<p></p>' ? 'Không có chú thích' : examData.description,
              }}
            ></div>
          </Descriptions.Item>
        </Descriptions>
        <h3>Kỹ năng</h3>
        {skillData && skillData?.length > 0 ? (
          <List
            dataSource={skillData}
            renderItem={(skill) => (
              <List.Item key={skill._id}>
                <Descriptions column={3} key={skill._id}>
                  <Descriptions.Item label='Kỹ năng'>
                    <b>
                      {(skill.skill === 'READING' && 'Đọc') ||
                        (skill.skill === 'LISTENING' && 'Nghe') ||
                        (skill.skill === 'WRITING' && 'Viết') ||
                        (skill.skill === 'SPEAKING' && 'Nói')}
                    </b>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      'Nội dung bài ' +
                      ((skill.skill === 'READING' && 'đọc') ||
                        (skill.skill === 'LISTENING' && 'nghe') ||
                        (skill.skill === 'WRITING' && 'viết') ||
                        (skill.skill === 'SPEAKING' && 'nói'))
                    }
                  >
                    <b>{skill.title}</b>
                  </Descriptions.Item>
                  <Descriptions.Item label='Số câu hỏi'>
                    <b>{skill.countQuestions}</b>
                  </Descriptions.Item>
                </Descriptions>
              </List.Item>
            )}
          ></List>
        ) : (
          <EmptyCustom description='Không có skill nào'></EmptyCustom>
        )}
      </Space>
    )
}

export default LastCheck
