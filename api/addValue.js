import api from './index.js'
// 取得入金紀錄
export const customerWalletRecords = (storeId) => {
  let query
  if (!storeId) {
    query = `
    query {
      customerWalletRecords(input: {
        storeId: null
      }) {
        remainWallet,
        walletRecord{
          date,
          type,
          price,
          designerName,
          payType,
          orderNo
        }
      }
    }
    `
  } else {
    query = `
    query {
      customerWalletRecords(input: {
        storeId: "${storeId}"
      }) {
        remainWallet,
        walletRecord{
          date,
          type,
          price,
          designerName,
          payType,
          orderNo
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

// 取得紅利點數
export const customerBonusRecords = (storeId) => {
  let query
  if (!storeId) {
    query = `
    query {
      customerBonusRecords(input:{storeId:null}){
        remainBonus
        bonusRecord{
          date
          type
          price
          orderNo
          designerName
          generationWay
          remark
        }
      }
    }
    `
  } else {
    query = `
    query {
      customerBonusRecords(input:{storeId: "${storeId}"}){
        remainBonus
        bonusRecord{
          date
          type
          price
          orderNo
          designerName
          generationWay
          remark
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