import request from '@/utils/request'
export function getStatisticsList(data) {
  return request({
    url: '/work/getSelectAll',
    method: 'GET',
    params:data
  })
}