import request from '@/utils/request'

export function getPermitType(params) {
  //获取许可证类型{numberId}
  return request({
    url:'/Permit/job',
    method:"GET",
    params
  })
}
export function getPermitImg(params) {
    //获取图片{numberId}
    return request({
      url:'/dbUpload/picture',
      method:"GET",
      params
    })
  }