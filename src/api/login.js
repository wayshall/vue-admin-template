import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/dologin',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request.get('/web-admin/userProfile.json')
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getRouters(){
  return request.get('/web-admin/routers')
}