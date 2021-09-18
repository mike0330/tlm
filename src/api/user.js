import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/ulogin',
    method: 'post',
    params:data
  })
}
export function getJurisdiction(data) {
  //获取权限
  return request({
    url: '/Permit/id',
    method: 'GET',
    params:data
  })
}
//修改密码
export function changePassword(data) {
  return request({
    url: '/Update',
    method: 'GET',
    params:data
  })
}
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
