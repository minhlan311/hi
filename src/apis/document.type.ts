/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENDPOINT } from '@/constants/endpoint'
import { DocumentForm, DocumentState } from '@/types/document.type'
import { SuccessResponse } from '@/types/utils.type'
import http from '@/utils/http'

type Props = {
  filterQuery?: any
  options?: any
  payload?: any
}
const documentApi = {
  findDocument(props: Props) {
    const {
      filterQuery = {},
      options = {
        pagination: false,
        sort: { createdAt: -1 },
      },
      payload,
    } = props

    const data = {
      filterQuery: filterQuery,
      options: options,
    }

    return http.post<SuccessResponse<DocumentState[]>>(ENDPOINT.FIND_DOCUMENT_PATH, payload ? payload : data)
  },
  createDocument(body: DocumentForm) {
    return http.post<SuccessResponse<Document>>(ENDPOINT.DOCUMENT_PATH, body)
  },
}

export default documentApi
