import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
// 获取令牌
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置令牌
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 移除令牌
export function removeToken() {
  return Cookies.remove(TokenKey)
}
