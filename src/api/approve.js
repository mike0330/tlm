import request from '@/utils/request'
//开工审批
export function getSafeApproveList(params) {
  //安全待审批
  return request({
    url:'/work/safety',
    method:"GET",
    params
  })
}
export function getProjApproveList(params) {
  //工程待审批
  return request({
    url:'/work/project',
    method:"GET",
    params
  })
}
export function getProdApproveList(params) {
  //生产待审批
  return request({
    url:'/work/production',
    method:"GET",
    params
  })
}
export function getEquipApproveList(params) {
  //设备待审批
  return request({
    url:'/work/equipment',
    method:"GET",
    params
  })
}
export function getSuperApproveList(params) {
  //监督、监护待审批
  return request({
    url:'/work/supervise',
    method:"GET",
    params
  })
}
export function getLeaderApproveList(params) {
  //领导待审批
  return request({
    url:'/work/lead_approva',
    method:"GET",
    params
  })
}
//收工审批