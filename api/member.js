import api from './index.js'

// 取得驗證碼
export const customerLoginSMSWithTKN = (phone,merchantId = null,designerId = null) => {
  const query = `
  mutation CustomerLoginSMSWithTKN($cellphone: String!, $isDevMode: Boolean, $storeId: ID, $designerId: ID) {
    customerLoginSMSWithTKN(cellphone: $cellphone, isDevMode: $isDevMode, storeId: $storeId, designerId: $designerId)
  }
  `
  const variables = {
    cellphone: phone,
    isDevMode: Boolean(process.env.VUE_DEV_MODE),
    storeId: merchantId,
    designerId: designerId
  }
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 驗證簡訊驗證碼
export const customerVerifySMSWithTKN = (inputData, needKey) => {
  const query = `
    mutation CustomerVerifySMSWithTKN($input: CustomerVerifySMSWithTKNInput!, $isDevMode: Boolean) {
      customerVerifySMSWithTKN(input: $input, isDevMode: $isDevMode) {
        ${needKey}
      }
    }
  `

  const graphqlQuery = {
    "query": query,
    "variables": {
      input: inputData,
      isDevMode: Boolean(process.env.VUE_DEV_MODE)
    }
  }

  return api.post('graphql', graphqlQuery)
}
// 取得會員資料
export const getCustomerPersonalData = (needKey) => {
  const query = `
    query {
      getCustomerPersonalData{
        ${needKey}
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
// 修改會員資料
export const customerSelfUpdate = (inputData, needKey) => {
  const query = `
  mutation CustomerSelfUpdate($input: CustomerSelfUpdateInput!) {
    customerSelfUpdate(input: $input) {
      ${needKey}
    }
  }
  `
  const variables = { input: inputData }
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}

// 修改會員資料
export const applyCustomerPersoanlDataToMerchant = (inputData) => {
  const query = `
    mutation {
      applyCustomerPersoanlDataToMerchant(merchantId: "${inputData.merchantId}")
    }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 取得會員卡片
export const customerMembershipRecord = (storeId) => {
  const query = `
  query {
    customerMembershipRecord(storeId: "${storeId}") {
      unExpired {
        merchantId,
        merchantname,
        membershipName,
        membershipImage,
        membershipComment,
        membershipTextCoclor,
        expiryDate
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
// 取得會員抽獎券
export const CustomerEventTickets = () => {
  const query = `
  query CustomerEventTickets {
    customerEventTickets {
      eventName
      tickets {
        consumptionDate
        consumptionStoreName
        serialNumber
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
// 取得會員是否設定登入密碼
export const checkIsCustomerPasswordSet = (cellphone) => {
  const query = `
  query {
    checkIsCustomerPasswordSet(cellphone: "${cellphone}")
  }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 取得會員是否為新客及是否設定密碼
export const customerExistStatusNoLogin = data => {
  const query = `
  query ($cellphone: String!, $storeId: ID) {
    customerExistStatusNoLogin(cellphone: $cellphone, storeId: $storeId) {
      isNewCus
      isPasswordSet
      isPreferDesignerSet
      isLineBinded
    }
  }
  `
  const variables = data
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 設定顧客登入密碼
export const customerSetPassword = ({ password, passwordCheck }) => {
  const query = `
  mutation {
    customerSetPassword(input: {
      password: "${password}",
      passwordCheck:"${passwordCheck}"
    }) 
  }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
// 顧客密碼登入
export const customerLoginWithPassword = ({ cellphone, password }, needKey) => {
  const query = `
  mutation {
    customerLoginWithPassword(
      cellphone: "${cellphone}",
      password:"${password}"
    ) {
      ${needKey}
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
// 用token取得會員是否設定登入密碼
export const checkIsCustomerPasswordSetWidthToken = () => {
  const query = `
    query {
      checkIsCustomerPasswordSetWidthToken
    }
  `
  const variables = {}
  const graphqlQuery = {
    "query": query,
    "variables": variables
  }

  return api.post('graphql', graphqlQuery)
}
export const cusLoginWithLineID = code => {
  const query = `
    mutation CusLoginWithLineID($input: String!) {
      cusLoginWithLineID(input: $input) {
        token,
        name,
        cellphone,
        isNewCustomer
        merchants{
          id,
          name,
          address,
          availableBookingTime{
            time
          }
        },
        currentMerchant{
          id,
          name,
          address,
          shopURL,
          rankingURL,
          availableBookingTime{
            time
          }
        }
      }
    }
  `
  const graphqlQuery = {
    "query": query,
    "variables": {
      input: code
    }
  }

  return api.post('graphql', graphqlQuery)
}

export const decodeCusLineToken = inputData => {
  const query = `
    query DecodeCusLineToken($input: DecodeCusLineTokenInput!) {
      decodeCusLineToken(input: $input) {
        id
        name
        avatarUrl
      }
    }
  `
  const graphqlQuery = {
    "query": query,
    "variables": {
      input: inputData
    }
  }

  return api.post('graphql', graphqlQuery)
}

export const getBindedCusData = id => {
  const query = `
    query GetBindedCusData($getBindedCusDataId: String!) {
      getBindedCusData(id: $getBindedCusDataId) {
        cusInfo {
          name
          cellphone
          avatarUrl
        }
        isExist
      }
    }
  `
  const graphqlQuery = {
    "query": query,
    "variables": {
      getBindedCusDataId: id
    }
  }

  return api.post('graphql', graphqlQuery)
}
