export const formatDate = (el, bind) => {
  const getDate = new Date(Number(el.innerText))
  // 判斷無法轉成正常格式 回傳原值
  if (getDate.toString() === 'Invalid Date') return el.innerText
  // 日期包含時間
  if (bind.value === 'time') {
    if (el.innerText.length < 12) return el.innerText
    else {
      const dateVal = new Date(Number(el.innerText))
      const year = dateVal.getFullYear()
      const month = forMatDate(dateVal.getMonth() + 1)
      const date = forMatDate(dateVal.getDate())
      const hours = forMatDate(dateVal.getHours())
      const min = forMatDate(dateVal.getMinutes())
  
      el.innerText = `${year}/${month}/${date} ${hours}:${min}`
    }
  }
  // 只要日期
  if (bind.value === 'date') {
    if (el.innerText.length < 12) return el.innerText
    else {
      const dateVal = new Date(Number(el.innerText))
      const year = dateVal.getFullYear()
      const month = forMatDate(dateVal.getMonth() + 1)
      const date = forMatDate(dateVal.getDate())
  
      el.innerText = `${year}/${month}/${date}`
    }
  }
  // 只要時間
  if (bind.value === 'onlyTime') {
    if (el.innerText.length < 12) return el.innerText
    else {
      const dateVal = new Date(Number(el.innerText))
      const hours = forMatDate(dateVal.getHours())
      const min = forMatDate(dateVal.getMinutes())
      
      el.innerText = `${hours}:${min}`
    }
  }
}

// 判斷是否加0
function forMatDate(obj) {
  if (obj < 10) return '0' + obj
  return obj
}