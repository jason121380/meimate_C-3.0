import api from './index.js'

// 取得卡券列表
export const customerCouponBalanceReport = (storeId = '') => {
  let query
  if (!storeId) {
    query = `
      query {
        customerCouponBalanceReport(input: {
          storeId: []
        }) {
          data{
            couponId,
            couponName,
            totalCount,
            usedCount,
            remainingCount,
            singleCouponPrice,
            boughtDate,
            usageRecord{
              sort,
              usedDate,
              usageCount
            }
          }
        }
      }
    `
  } else {
    query = `
      query {
        customerCouponBalanceReport(input: {
          storeId: "${storeId}"
        }) {
          data{
            couponId,
            couponName,
            totalCount,
            usedCount,
            remainingCount,
            singleCouponPrice,
            boughtDate,
            usageRecord{
              sort,
              usedDate,
              usageCount
            }
          }
        }
      }
    `
  }

  const variables = {}

  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}