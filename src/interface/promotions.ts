export interface PromotionItem {
  centificateName: string
  scholarship: number
  length: number
  icon: string
  content: string
  _id: string
}

export interface PromotionState {
  _id: string
  createdById: string
  updatedById: string
  _destroy: boolean
  promotions: PromotionItem[]
  description: string
  dateEnd: string
  href: string
  createdAt: string
  updatedAt: string
}
