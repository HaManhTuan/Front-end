import request from '@/utils/request'

export function getListTripCarStaff(data) {
  return request({
    url: '/trip-staff-car/list',
    method: 'get',
    params: data
  })
}

export function createTripCarStaff(data) {
  return request({
    url: '/trip-staff-car/create',
    method: 'post',
    data
  })
}

