import Vue from 'vue'
import {
  customerLoginSMSWithTKN,
  customerVerifySMSWithTKN,
  getCustomerPersonalData,
  customerSelfUpdate,
  applyCustomerPersoanlDataToMerchant,
  customerMembershipRecord,
  checkIsCustomerPasswordSet,
  customerSetPassword,
  customerLoginWithPassword,
  checkIsCustomerPasswordSetWidthToken,
  CustomerEventTickets,
  customerExistStatusNoLogin,
  cusLoginWithLineID,
  decodeCusLineToken,
  getBindedCusData
} from '@/api/member.js'

import {
  getAllCustomerReservationRecords,
  getNotDoneCustomerReservationRecords,
  getDoneCustomerReservationRecords,
  getCustomerLatestReservation,
  customerCancelReservation,
  getCustomerReservationRecord,
  customerUpdateBookingRefs,
  getCustomerReservationRecordsV2
 } from '@/api/appointmentRecord.js'

import {
  getCustomerConsumptionRecords
} from '@/api/consumption.js'

import {
  customerCouponBalanceReport
} from '@/api/ticket.js'

import {
  customerWalletRecords,
  customerBonusRecords
} from '@/api/addValue.js'

import {
  getAllMerchants,
  getMerchant,
  customerGetMerchantDesigners,
  updateCustomerCuttentMerchant,
  updateCustomerPreferDesigner,
  customerGetCurrentMerchantSetting,
  merchantCusExternalLink,
  getCloseCustomerBookingForCustomer,
  getRequiredColumnSetting,
  getCloseCustomerBookingForCustomerNoLogin,
  getMerchantProfile,
  getBookingPeerDisplay
} from '@/api/merchant.js'

import {
  getDesignerBookingTimesWithRange,
  getBookingItemCategoryForCustomer,
  bookingV2,
  nonDesignationBooking,
  getCustomerReference,
  CustomerBookingLimit,
  customerBookingLimitNoLogin,
  cacheBookingData,
  getCachedBookingData,
  getMerchantAvailableBookingTime,
  getBookingItemPriceDisplay,
  getNDBookingItemCategory,
  getNonDesignateBookingTimesWithRange
} from '@/api/appointment.js'

import {
  customerBindWithLine,
  getCustomerSidePageDisplayForCellphone,
  getLineBindLinkForCustomer
} from '@/api/bindingLine';

export default ({ redirect, store }, inject) => {
  const api = {
    customerLoginSMSWithTKN,
    customerVerifySMSWithTKN,
    getCustomerPersonalData,
    customerSelfUpdate,
    applyCustomerPersoanlDataToMerchant,
    getAllCustomerReservationRecords,
    getNotDoneCustomerReservationRecords,
    getDoneCustomerReservationRecords,
    customerCancelReservation,
    getCustomerConsumptionRecords,
    customerCouponBalanceReport,
    customerWalletRecords,
    customerBonusRecords,
    customerMembershipRecord,
    checkIsCustomerPasswordSet,
    customerSetPassword,
    getAllMerchants,
    getMerchant,
    customerGetMerchantDesigners,
    updateCustomerCuttentMerchant,
    updateCustomerPreferDesigner,
    customerGetCurrentMerchantSetting,
    getDesignerBookingTimesWithRange,
    getBookingItemCategoryForCustomer,
    bookingV2,
    nonDesignationBooking,
    getCustomerReference,
    CustomerBookingLimit,
    customerBindWithLine,
    getCustomerSidePageDisplayForCellphone,
    customerLoginWithPassword,
    merchantCusExternalLink,
    checkIsCustomerPasswordSetWidthToken,
    CustomerEventTickets,
    getCloseCustomerBookingForCustomer,
    getCustomerLatestReservation,
    getCustomerReservationRecord,
    customerUpdateBookingRefs,
    getRequiredColumnSetting,
    getCloseCustomerBookingForCustomerNoLogin,
    customerBookingLimitNoLogin,
    getMerchantProfile,
    cacheBookingData,
    getCachedBookingData,
    customerExistStatusNoLogin,
    cusLoginWithLineID,
    decodeCusLineToken,
    getBindedCusData,
    getMerchantAvailableBookingTime,
    getBookingItemPriceDisplay,
    getBookingPeerDisplay,
    getCustomerReservationRecordsV2,
    getLineBindLinkForCustomer,
    getNDBookingItemCategory,
    getNonDesignateBookingTimesWithRange
  }

  Vue.prototype.api = api
  Vue.prototype.redirect = redirect
  Vue.prototype.store = store

  inject('api', api)

}