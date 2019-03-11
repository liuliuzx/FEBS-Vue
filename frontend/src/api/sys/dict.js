import { axios } from '@/utils/request'

export function treeList (query) {
  return axios({
    url: '/admin/dict/treeList',
    method: 'get',
    params: query
  })
}

export function fetchList (query) {
  return axios({
    url: '/admin/dictItem',
    method: 'get',
    params: query
  })
}

export function addObj (obj) {
  return axios({
    url: '/admin/dict',
    method: 'post',
    data: obj
  })
}

export function editObj (obj) {
  return axios({
    url: '/admin/dict',
    method: 'put',
    data: obj
  })
}

export function delObj (id) {
  return axios({
    url: '/admin/dict/' + id,
    method: 'delete'
  })
}

export function addDictItem (obj) {
  return axios({
    url: '/admin/dictItem',
    method: 'post',
    data: obj
  })
}

export function editDictItem (obj) {
  return axios({
    url: '/admin/dictItem',
    method: 'put',
    data: obj
  })
}

export function delDictItem (ids) {
  return axios({
    url: '/admin/dictItem/' + ids,
    method: 'delete'
  })
}
