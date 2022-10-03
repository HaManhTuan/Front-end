import request from '@/utils/request'

export function getListCar(data) {
  return request({
    url: '/car/list',
    method: 'get',
    params: data
  })
}

export function createCar(data) {
  return request({
    url: '/car/create',
    method: 'post',
    data
  })
}

export function editCar(id, data) {
  return request({
    url: '/car/edit/' + id,
    method: 'put',
    data
  })
}

