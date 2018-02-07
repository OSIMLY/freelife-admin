import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getTable(params) {
  debugger
  return request({
    url: '/params/record/',
    method: 'get',
    params
  })
}
