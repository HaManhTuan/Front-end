import request from '@/utils/request'

export function getListTypeCar(data) {
  return request({
    url: '/type-car/list',
    method: 'get',
    params: data
  })
}

export function createTypeCar(data) {
  return request({
    url: '/type-car/create',
    method: 'post',
    data
  })
}

export function editTypeCar(id, data) {
  return request({
    url: '/type-car/edit/' + id,
    method: 'put',
    data
  })
}

