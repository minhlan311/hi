import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from 'ckeditor5-custom-build'
import settings from '../settings'
import { UPLOAD_ATTACHMENT } from '../constants/paths'

export default function Editor({ handleChange, options, value }) {
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData()
                    loader.file.then((file) => {
                        body.append('attachment', file)
                        fetch(`${settings.FILE_URL}${UPLOAD_ATTACHMENT}`, {
                            method: 'post',
                            body: body,
                        })
                            .then((res) => res.json())
                            .then((res) => {
                                resolve({
                                    default: `${settings.FILE_URL}/${res[0].url}`,
                                })
                            })
                            .catch((err) => {
                                reject(err)
                            })
                    })
                })
            },
        }
    }
    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return uploadAdapter(loader)
        }
    }
    return (
        <CKEditor
            config={{
                extraPlugins: [uploadPlugin],
            }}
            {...options}
            // editor={ClassicEditor}
            onReady={(editor) => {}}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
            onChange={(event, editor) => {
                handleChange(editor.getData())
            }}
            data={value}
        />
    )
}
