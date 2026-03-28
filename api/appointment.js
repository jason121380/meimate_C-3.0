import api from './index.js'

// 取得設計師可預約時間
export const getDesignerBookingTimesWithRange = (input) => {
  const query = `
    query {
      getDesignerBookingTimesWithRange(input: {
        designerId: "${input.designerId}",
        storeId: "${input.storeId}",
        dateRange: {
          startDate: ${input.dateRange.startDate},
          endDate: ${input.dateRange.endDate}
        },
        designerServiceIds: [${input.designerServiceIds}],
      }){
        date,
        isRegularHoliday,
        bookingTimes{
          time,
          status
        }
      }
    }
  `
  const variables = {}

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}
// 取得設計師服務項目
export const getBookingItemCategoryForCustomer = (input) => {
  const query = `
    query {
      getBookingItemCategoryForCustomer(input: {
        designerId: "${input.designerId}",
        storeId: "${input.storeId}"
      }) {
        id,
        sort,
        name,
        bookingItem{
          id,
          sort,
          name,
          lowestPrice,
          highestPrice
        }
      }
    }
  `
  const variables = {}

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}

// 取得不指定服務項目
export const getNDBookingItemCategory = (merchantId) => {
  const query = `
    query($merchantId: ID!) {
      getNDBookingItemCategory(merchantId: $merchantId) {
        id,
        sort,
        name,
        bookingItem{
          id,
          sort,
          name,
          lowestPrice,
          highestPrice
        }
      }
    }
  `
  const variables = { merchantId }

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}
// 預約(指定)
export const bookingV2 = (input) => {
  const query = `
    mutation BookingV2($input: BookingV2Input!) {
      bookingV2(input: $input) {
        id,
        date,
        status,
        designer{
          nameForCustomerSide
        },
        remarkForCustomer
      }
    }
  `

  const variables = {
    input: {
      designerId: input.designerId,
      dateTime: input.dateTime,
      cellphone: input.cellphone,
      merchantId: input.merchantId,
      name: input.name,
      reference: input.reference,
      remarkForCustomer: input.remarkForCustomer,
      designerServiceIds: input.designerServiceIds,
      companionCount: input.companionCount,
    }
  }

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}
// 預約(不指定)
export const nonDesignationBooking = (inputData) => {
  const query = `
    mutation NonDesignationBooking ($input: NonDesignationBookingInput!) {
      nonDesignationBooking(input: $input) {
        id,
        date,
        status,
        designer{
          name
        },
        remarkForCustomer
      }
    }
  `
  const variables = {
    input: inputData
  }

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}
// 取得客戶來源
export const getCustomerReference = () => {
  const query = `
    query {
      getCustomerReference
    }
  `
  const variables = {}

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}
//取得預約限制
export const CustomerBookingLimit = () => {
  const query = `
    query GET_CUSTOMER_BOOKING_LIMIT {
      customerBookingLimit {
        isCusBookingPreferDesOnly
        isCusNonDesBookingUsing
      }
    }
  
  `
  const variables = {}

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}

// 取得預約限制(未登入)
export const customerBookingLimitNoLogin = (variables = {}) => {
  const query = `
    query GET_CUSTOMER_BOOKING_LIMIT_NOLOGIN($storeId: ID!) {
      customerBookingLimitNoLogin(storeId: $storeId) {
        isCusBookingPreferDesOnly
        isCusNonDesBookingUsing
      }
    }
  `

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}

// 暫存預約資訊
export const cacheBookingData = (variables = {}) => {
  const query = `
    mutation CACHE_BOOKING_DATA($input: CacheBookingDataInput!) {
      cacheBookingData(input: $input)
    }
  `

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}

// 取得暫存預約資訊
export const getCachedBookingData = (variables = {}) => {
  const query = `
    query GET_CACHE_BOOKING_DATA($token: ID!) {
      getCachedBookingData(token: $token) {
        bookingData {
          dateTime
          designerId
          designerServiceIds
          merchantId
          name
          remarkForCustomer
        }
        newCusData {
          name
          cellphone
          gender
        }
        isNewCus
        staticInfo
      }
    }
  `

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}

// 取得店家可預約時間
export const getMerchantAvailableBookingTime = (variables = {}) => {
  const query = `
    query GetMerchantAvailableBookingTime($input: GetMerchantAvailableBookingTimeInput) {
      getMerchantAvailableBookingTime(input: $input) {
        date
        isRegularHoliday
        bookingTimes {
          time
          status
        }
      }
    }
  `

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}

// 取得不指定可預約時間（含日期區間）
export const getNonDesignateBookingTimesWithRange = (variables = {}) => {
  const query = `
    query GetNonDesignateBookingTimesWithRange($input: GetNonDesignateBookingTimesWithRangeInput!) {
      getNonDesignateBookingTimesWithRange(input: $input) {
        date
        isRegularHoliday
        bookingTimes {
          time
          status
        }
      }
    }
  `

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}

export const getBookingItemPriceDisplay = (variables = {}) => {
  const query = `
    query($input: ID) {
      getBookingItemPriceDisplay(input: $input)
    }
  `

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}