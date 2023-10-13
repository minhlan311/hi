/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from '@/helpers/common'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Form } from 'antd'
import { useEffect, useState } from 'react'
import './styles.scss'
type Props = {
  name: string
  data: any | null
  label?: string
  required?: boolean
}

const TextAreaCustom = (props: Props) => {
  const { name, data, label, required = false } = props

  const [editorContent, setEditorContent] = useState<string>('<p></p>')

  const handleEditorChange = (_: any, editor: any) => {
    const newContent = editor.getData()
    setEditorContent(newContent)
  }

  useEffect(() => {
    if (!data) setEditorContent('<p></p>')
    if (data?.[name]) setEditorContent(data?.[name])
  }, [data])

  return (
    <Form.Item
      name={name}
      label={label}
      initialValue={editorContent}
      rules={
        required
          ? [
              {
                required: required,
                validator: (_, value) => {
                  if (!value || value === '<p></p>') {
                    return Promise.reject(`Vui lòng nhập ${label ? label : 'nội dung!'}`)
                  }

                  return Promise.resolve()
                },
              },
            ]
          : []
      }
      getValueFromEvent={(_event, editor) => {
        const data = editor.getData()
        setEditorContent(data)

        return data
      }}
      className='ck-custom'
    >
      {/* {editorContent.length === 0 && <div className='ck-placeholder'>{placeholder}</div>} */}
      <CKEditor
        // name={name}
        editor={ClassicEditor}
        data={editorContent}
        // config={{
        //   ckfinder: {
        //     uploadCkUrl: uploadCkUrl,
        //   },
        // }}
        onChange={debounce(handleEditorChange, 500)}
        // placeholder={placeholder}
      ></CKEditor>
    </Form.Item>
  )
}

export default TextAreaCustom
