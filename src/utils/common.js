import Cookies from 'js-cookie'
import constants from '@/utils/constants'

const TokenKey = 'Admin-Token'
const UserToken = 'User-Order-Token'

export function getCookiesName() {
  let role
  if (window.location.href.indexOf('admin') > -1) {
    role = parseInt(Cookies.get(constants.TEXT_ROLE.ADMIN))
  } else {
    role = parseInt(Cookies.get(constants.TEXT_ROLE.USER))
  }
  let token = UserToken
  if (role === constants.USER_TYPE.ADMIN) {
    token = TokenKey
  }
  return token
}

export function getNameRole() {
  let role
  if (window.location.href.indexOf('admin') > -1) {
    role = constants.TEXT_ROLE.ADMIN
  } else {
    role = constants.TEXT_ROLE.USER
  }
  return role
}
