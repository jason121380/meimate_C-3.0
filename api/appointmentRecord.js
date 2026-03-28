import api from './index.js'

// 取得所有預約記錄
export const getAllCustomerReservationRecords = (needKey, pageLimt = 20) => {
  const query = `
    query {
      getCustomerReservationRecords(input: {
        merchantIds: [],
        reservationType: [],
        pageLimit: ${pageLimt},
        pageOffset: 0
      }) {
        orders{${needKey}}
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
// 取得待審核預約記錄
export const getNotDoneCustomerReservationRecords = (needKey, page = 0) => {
  const query = `
    query {
      getCustomerReservationRecords(input: {
        merchantIds: [],
        reservationType: [ACCEPTED, PENDING],
        pageLimit: 20,
        pageOffset: ${page}
      }) {
        totalCount,
        pageOffset,
        orders{${needKey}}
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
// 取得已結束預約記錄
export const getDoneCustomerReservationRecords = (needKey, page = 0) => {
  const query = `
    query {
      getCustomerReservationRecords(input: {
        merchantIds: [],
        reservationType: [CANCELED, DONE,ACCEPTEDOUTDATED,PENDINGOUTDATED],
        pageLimit: 20,
        pageOffset: ${page}
      }) {
        totalCount,
        pageOffset,
        orders{${needKey}}
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
// 取得最新一筆的未完成預約記錄
export const getCustomerLatestReservation = () => {
  const query = `
    query {
      getCustomerLatestReservation{
        id,
        no,
        date,
        merchant{name,tel,address},
        designer{nameForCustomerSide,avatar},
        status,
        remarkForCustomer,
        messageForCustomer,
        troubleShooting,
        companionCount
        isCheckin
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
// 取得一筆預約詳細
export const getCustomerReservationRecord = id => {
  const query = `
    query ($input: ID!){
      getCustomerReservationRecord (input: $input){
        date,
        merchant{name,tel,address},
        designer{nameForCustomerSide,avatar},
        status,
        remarkForCustomer,
      }
    }
  `
  const variables = { input: id }
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 取消預約
export const customerCancelReservation = (orderId = '') => {
  const query = `
    mutation {
      customerCancelReservation(orderId: "${orderId}")
    }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}

// 編輯同行人數、顧客來源
export const customerUpdateBookingRefs = data => {
  const query = `
    mutation ($input: CustomerUpdateBookingRefsInput!){
      customerUpdateBookingRefs(input: $input)
    }
  `
  const variables = { input: data }
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}

// 取得所有預約記錄V2
export const getCustomerReservationRecordsV2 = (needKey, pageOffset, isDone, storeId) => {
  const query = `
    query ($input: GetCustomerReservationRecordsV2Input!){
      getCustomerReservationRecordsV2(input: $input) {
        orders{${needKey}}
        pageLimit
        pageOffset
        totalCount
      }
    }
  `

  const variables = {
    input: {
      isDone,
      pageLimit: 20,
      pageOffset,
      storeId
    }
  }
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}