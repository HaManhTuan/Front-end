import request from '@/utils/request'

export function getListSchedule(data) {
  return request({
    url: '/schedule/list',
    method: 'get',
    params: data
  })
}

export function createSchedule(data) {
  return request({
    url: '/schedule/create',
    method: 'post',
    data
  })
}

export function editSchedule(id, data) {
  return request({
    url: '/schedule/edit/' + id,
    method: 'put',
    data
  })
}

