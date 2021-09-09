import request from '@/utils/request'
export function permitNumLast(data) {
  return request({
    url: '/work/Number_id',
    method: 'GET',
    params:data
  })
}