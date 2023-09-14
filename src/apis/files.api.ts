import http from '@/utils/http'
import { SuccessResponse } from '@/types/utils.type'
import { ENDPOINT } from '@/constants/endpoint'

const fileApi = {
  uploadFile(body: any) {
    http.post<SuccessResponse<any>>(ENDPOINT.UPLOAD_IMAGE, body, {
      baseURL: import.meta.env.VITE_FILE_ENDPOINT,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default fileApi
