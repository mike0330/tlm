import request from '@/utils/request'
//开工审批数据
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
export function getComLeaderApproveList(params) {
  //公司领导待审批
  return request({
    url:'/work/LeaderShipId',
    method:"GET",
    params
  })
}
//收工审批数据
export function getEndSuperApproveList(params) {
  //监督、监护需要审批的数据（收工）
  return request({
    url:'/work/supervise_tutelage',
    method:"GET",
    params
  })
}
export function getEndLeaderApproveList(params) {
  //领导需要审批的数据（收工）
  return request({
    url:'/work/lead_approva_one',
    method:"GET",
    params
  })
}
export function getEndComLeaderApproveList(params) {
  //公司领导需要审批的数据（收工）
  return request({
    url:'/work/LeaderShipEndId',
    method:"GET",
    params
  })
}
//登录人审批过的数据
export function getApproveList(params) {
  return request({
    url:'/work/state_All',
    method:"GET",
    params
  })
}
//审批
export function approve(params) {
  //收工申请&&审批
  return request({
    url:'/work/approval',
    method:"GET",
    params
  })
}
export function leaderApprove(params) {
  //领导审批(开工)
  return request({
    url:'/work/Leader',
    method:"GET",
    params
  })
}
export function leaderApproveCom(params) {
  //领导审批(收工)
  return request({
    url:'/work/Leader_Stop',
    method:"GET",
    params
  })
}

//收工审批