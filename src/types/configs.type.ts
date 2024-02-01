type footer = {
  name: string
  children: { href: string; content: string }[]
}

type buttonADSLink = {
  href: string
  content: string
}

export type Configs = {
  _id: string
  _destroy: boolean
  branch: {
    name: string
    address: string
    phoneNumber: string
  }[]
  logo: string
  favicon: string
  hotline: string
  contacts: never[]
  partners: never[]
  socials: {
    type: string
    url: string
    _id: string
    createdAt: string
    updatedAt: string
  }[]
  createdAt: string
  updatedAt: string
  banners: string[]
  logoFooter: string
  buttonADSLink: buttonADSLink[]
  footer: footer[]
}
