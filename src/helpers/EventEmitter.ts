/* eslint-disable @typescript-eslint/no-explicit-any */
export const SESSION_TIME_OUT = 'SESSION_TIME_OUT'
export const API_TIMEOUT = 'ECONNABORTED '
export const SHOW_POPUP_ERROR = 'SHOW_POPUP_ERROR'
export const DROPDOWN_RESET_POSITION = 'DROPDOWN_RESET_POSITION'
export const NEXT_MONTH_DATE_PICKER = 'NEXT_MONTH_DATE_PICKER'
export const BACK_MONTH_DATE_PICKER = 'BACK_MONTH_DATE_PICKER'
export const SET_MONTH_DATE_PICKER = 'SET_MONTH_DATE_PICKER'
export const SET_YEAR_DATE_PICKER = 'SET_YEAR_DATE_PICKER'
export const SET_SINGLE_DATE = 'SET_SINGLE_DATE'
export const SET_FROM_DATE = 'SET_FROM_DATE'
export const SET_TO_DATE = 'SET_TO_DATE'
export const CALLBACK_SHOW_POPUP_ERROR = 'CALLBACK_SHOW_POPUP_ERROR'
export const RECALCULATE_SIZE_TRACKER = 'RECALCULATE_SIZE_TRACKER'
export const SCROLL_DOWN = 'SCROLL_DOWN'
export const SCROLL_TO_TOP = 'SCROLL_TO_TOP'
export const SCROLL = 'SCROLL'
export const SCROLL_DISABLE = 'SCROLL_DISABLE'
export const DISABLE_BLOCK_NAVIGATION = 'DISABLE_BLOCK_NAVIGATION'
export const SHOW_ORDER_BUSINESS_CREDIT_REPORT = 'SHOW_ORDER_BUSINESS_CREDIT_REPORT'
export const SHOW_POPUP_UPGRADE = 'SHOW_POPUP_UPGRADE'
export const SHOW_POPUP_BUY_REPORT = 'SHOW_POPUP_BUY_REPORT'
export const SHOW_POPUP_FACTSHEET = 'SHOW_POPUP_FACTSHEET'
export const CHANGE_COMPANY_HEADER = 'CHANGE_COMPANY_HEADER'
export const SHOW_SINGLE_DATE = 'SHOW_SINGLE_DATE'
export const DID_MOUNT_COMPONENT = 'DID_MOUNT_COMPONENT'
export const SHOW_TOAST_MESSAGE = 'SHOW_TOAST_MESSAGE'
export const SHOW_POPUP_CONFIRMATION = 'SHOW_POPUP_CONFIRMATION'
export const SHOW_POPUP_CONFIRMATION_BUY_NOW_ADD_CART = 'SHOW_POPUP_CONFIRMATION_BUY_NOW_ADD_CART'
export const SHOW_POPUP_NO_INDUSTRY = 'SHOW_POPUP_NO_INDUSTRY'
export const DOWNLOAD_PDF = 'DOWNLOAD_PDF'
export const UPDATE_LOADING_PDF = 'UPDATE_LOADING_PDF'
export const END_PROCESS_DOWNLOAD_PDF = 'END_PROCESS_DOWNLOAD_PDF'
export const SHOW_SETTING_FS = 'SHOW_SETTING_FS'
export const SHOW_POPUP_MANAGE_COMPANY_PORTFOLIO = 'SHOW_POPUP_MANAGE_COMPANY_PORTFOLIO'
export const SHOW_POPUP_FOLLOW_ALERT = 'SHOW_POPUP_FOLLOW_ALERT'
export const SHOW_SELECT_CUSTOM = 'SHOW_SELECT_CUSTOM'

class EventEmitter {
  events: any = {}

  dispatch = (event: any, data = null) => {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].forEach((callback: any) => {
      callback(data)
    })
  }

  subscribe = (event: any, callback: any) => {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  unsubscribe = (event: any, callback: any) => {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event] = this.events[event].filter((func: any) => func !== callback)
  }
}

export default new EventEmitter()
