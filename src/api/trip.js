import request from '@/utils/request'

export function getListTrip() {
  return request({
    url: '/trip/list',
    method: 'get'
  })
}

export function createTrip(data) {
  return request({
    url: '/trip/create',
    method: 'post',
    data
  })
}

export function editTrip(id, data) {
  return request({
    url: '/trip/edit/' + id,
    method: 'put',
    data
  })
}

