/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { DocumentForm } from '@/types/document.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

const documentApi = {
  createDocument(body: DocumentForm) {
    return http.post<SuccessResponse<Document>>(ENDPOINT.DOCUMENT_PATH, body)
  },
}

export default documentApi
