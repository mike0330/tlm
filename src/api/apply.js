import request from '@/utils/request'
export function permitNumLast(data) {
  return request({
    url: '/work/Number_id',
    method: 'GET',
    params:data
  })
}
export function submitPermitType(params) {
    return request({
        url:'/Permit/inset',
        method:"GET",
        params
    })
}
export function getJurisdiction(params) {
    //获取书面审批人
    return request({
        url:'/roleinfo/jurisdiction',
        method:"GET",
        params
    })
}
export function getSuper(params) {
    //获取监督监护
    return request({
        url:'/roleinfo/supervision',
        method:"GET",
        params
    })
}
export function getLeader(params) {
    //获取领导
    return request({
        url:'/roleinfo/lead_approval',
        method:"GET",
        params
    })
}
export function upload(data) {
    //获取领导
    return request({
        url:'/upload/template',
        method:"POST",
        data
    })
}
