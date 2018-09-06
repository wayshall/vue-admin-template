const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // token: state => state.user.token,
  login: state => state.user.login, 
  avatar: state => state.user.avatar,
  name: state => state.user.nickname,
  nickname: state => state.user.nickname,
  username: state => state.user.username,
  roles: state => state.user.roles,
  roleRouters: state => state.user.roleRouters
}
export default getters
