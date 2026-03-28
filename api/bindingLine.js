import api from './index';
export const customerBindWithLine = data => {
    const query = `
      mutation CustomerBindWithLine($code: String!, $endPoint: String, $storeId: ID) {
        customerBindWithLine(code: $code, endPoint: $endPoint, storeId: $storeId)
      }
    `
    const graphqlQuery = {
      "query": query,
      "variables": data
    }
    return api.post('graphql', graphqlQuery)
}



export const getCustomerSidePageDisplayForCellphone = (storeId) => {
  const query = `
  query {
    getCustomerSidePageDisplayForCellphone(storeId:${storeId}){
      ServiceRecord
      TicketRecord
      WalletRecord
      BonusRecord
    }
  }
  `
  const graphqlQuery = {
      "query": query
  }
  return api.post('graphql', graphqlQuery)
}


export const getLineBindLinkForCustomer = storeId => {
  const query = `
    query GetLineBindLinkForCustomer($storeId: ID!) {
      getLineBindLinkForCustomer(storeId: $storeId)
    }
  `
  const graphqlQuery = {
      "query": query,
      "variables": {
        storeId
      }
  }
  return api.post('graphql', graphqlQuery)
}