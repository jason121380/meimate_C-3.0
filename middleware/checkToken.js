import Cookies from 'js-cookie'

const whiteList = ['/']

export default({req, redirect, route}) => {
  let token = ''
  if (process.server) {
    const getToken = req && req.headers ? req.headers.cookie : null
    if (getToken) {
      token = req && req.headers ? req.headers.cookie.replace(/(?:(?:^|.*;\s*)customeraccesstoken\s*\=\s*([^;]*).*$)|^.*$/, "$1") : null
      if (!token) {
        if (whiteList.includes(route.path)) return
        redirect('/')
      } else {
        if (whiteList.includes(route.path)) {
          redirect('/member')
        }
      }
    } else {
      if (whiteList.includes(route.path)) return
      redirect('/')
    }
  }
  if (!process.server) {
    token = Cookies.get('customeraccesstoken')
    if (!token) {
      if (whiteList.includes(route.path)) return
      redirect('/')
    } else {
      if (whiteList.includes(route.path)) {
        redirect('/member')
      }
    }
  }
}