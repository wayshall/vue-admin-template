import request from '@/utils/request'

export function login(username, password) {
  console.log('login...')
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
  return request.get('/userProfile')
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
