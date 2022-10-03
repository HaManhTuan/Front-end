import request from '@/utils/request'

export function getListStaff(data) {
  return request({
    url: '/staff/list',
    method: 'get',
    params: data
  })
}

export function createStaff(data) {
  return request({
    url: '/staff/create',
    method: 'post',
    data
  })
}

export function editStaff(id, data) {
  return request({
    url: '/staff/edit/' + id,
    method: 'put',
    data
  })
}

export function getListAssistant(id, data) {
  return request({
    url: '/staff/list-assistant-driver/' + id,
    method: 'get',
    params: data
  })
}

