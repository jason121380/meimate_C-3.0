import api from './index.js'

// 取得消費紀錄
export const getCustomerConsumptionRecords = data => {
  const query = `
    query ($input: GetCustomerConsumptionRecordsV2Input!) {
      getCustomerConsumptionRecordsV2(input: $input) {
        customerConsumptionRecords {
          id
          orderDate
          orderNo
          isDesignate
          designerName
          service
          product
          ticketSell
          ticketUse
          membership
          total
        }
        pageLimit
        pageOffset
        totalCount
      }
    }
  `

  const variables = {
    input: data
  }
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
