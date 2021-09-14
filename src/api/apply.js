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
  //上传图片
  return request({
    url:'/upload/template',
    method:"POST",
    data
  })
}
export function delImg(params) {
  //删除图片
  return request({
    url:'/dbUpload/delete',
    method:"GET",
    params
  })
}
export function delAllImg(params){
  //删除全部图片
  return request({
    url:'/dbUpload/delete_All',
    method:"GET",
    params
  })
}
export function submit(data) {
    //申请
  return request({
    url:'/work/apply_for',
    method:"POST",
    params:data
  })
}
export function getApplyList(params) {
  return request({
    url:'/work/mark_all',
    method:"GET",
    params
  })
}