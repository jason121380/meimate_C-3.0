import api from './index.js'

// 搜尋客戶去過的所有門市
export const getAllMerchants = (keyword = '') => {
  const query = `
    query {
      getAllMerchants(keyword: "${keyword}") {
        id,
        name,
        address,
        avatar,
        availableBookingTime{
          time
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
// 搜尋單一門市
export const getMerchant = (storeId = '') => {
  const query = `
    query {
      getMerchant(storeId: "${storeId}") {
        id,
        name,
        availableBookingTime{
          time
        },
        address
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
// 搜尋門市可預約設計師
export const customerGetMerchantDesigners = (id = '') => {
  const query = `
    query {
      customerGetMerchantDesigners(storeId: "${id}") {
        id,
        name,
        nickName,
        avatar,
        nameForCustomerSide,
        selfIntroduction,
        selfIntroductionLink,
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
// 變更喜好門市
export const updateCustomerCuttentMerchant = (storeId) => {
  const query = `
    mutation {
      updateCustomerCuttentMerchant(storeId: "${storeId}") {
        id,
        name,
        availableBookingTime{
          time
        },
        address
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
// 變更喜好設計師
export const updateCustomerPreferDesigner = (designerId, storeId) => {
  let query = "";
  if (designerId !== "") {
    query = `
    mutation {
      updateCustomerPreferDesigner(input: {
        designerId: "${designerId}",
        storeId: "${storeId}"
      })
    }
    `
  } else {
    query = `
    mutation {
      updateCustomerPreferDesigner(input: {
        storeId: "${storeId}"
      })
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
// 取得喜好門市、設計師、所有門市
export const customerGetCurrentMerchantSetting = () => {
  const query = `
    query {
      customerGetCurrentMerchantSetting {
        currentMerchant{
          id,
          name,
          availableBookingTime{
            time
          },
          address
          shopURL
          rankingURL
          isArrowDisplayForLine
          isBookingCheckinEnabled
        },
        preferDesigner{
          id,
          name,
          nickName,
          nameForCustomerSide,
          avatar,
          selfIntroduction
        },
        consumedMerchants{
          id,
          name,
          availableBookingTime{
            time
          },
          address
        }
        isLineBinded
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
export const merchantCusExternalLink = (isReplace) => {
  const query = `
    query MerchantCusExternalLink($isReplace: Boolean) {
      merchantCusExternalLink(isReplace: $isReplace) {
        id
        name
        url
        sort
        isTop
      }
    }
  `
  const variables = {
    isReplace: isReplace
  }
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}
//取得門市是否關閉預約設定
export const getCloseCustomerBookingForCustomer = () => {
  const query = `
    query Query {
      getCloseCustomerBookingForCustomer
    }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}
//取得門市是否關閉預約設定
export const getRequiredColumnSetting = () => {
  const query = `
    query Query {
      getRequiredColumnSetting {
        display
        requiredInputs
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

//取得門市是否關閉預約設定(未登入)
export const getCloseCustomerBookingForCustomerNoLogin = (variables = {}) => {
  const query = `
    query Query($storeId: ID!) {
      getCloseCustomerBookingForCustomerNoLogin(storeId: $storeId)
    }
  `
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}

//取得門市資料(未登入)
export const getMerchantProfile = (variables = {}) => {
  const query = `
    query Query($storeId: ID!) {
      getMerchantProfile(storeId: $storeId) {
        address
        name
        tel
        requiredColumnForNewCustomer
        isNRCDisplayForNewCus
        availableBookingTime {
          time
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

//預約是否顯示同行人數
export const getBookingPeerDisplay = (variables = {}) => {
  const query = `
    query Query {
      getBookingPeerDisplay
    }
  `
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }
  return api.post('graphql', graphqlQuery)
}
