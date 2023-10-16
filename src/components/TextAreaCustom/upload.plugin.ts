/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'

function uploadAdapter(loader: any) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData()

        loader.file.then((file: any) => {
          body.append('attachment', file)
          fetch(`${import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_IMAGE}/upload/attachments/`, {
            method: 'post',
            body: body,
          })
            .then((res) => res.json())
            .then((res) => {
              resolve({
                default: `${import.meta.env.VITE_FILE_ENDPOINT + ENDPOINT.UPLOAD_IMAGE}/${res[0].url}`,
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

export default function uploadPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return uploadAdapter(loader)
  }
}
