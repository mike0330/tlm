import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/ulogin',
    method: 'post',
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
