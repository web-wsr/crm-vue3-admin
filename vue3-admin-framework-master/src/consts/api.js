// 接口 API ，用于放置后端提供的 API ，因为环境不同需要在 env 获取 请求 hosts
const PREFIX = `${import.meta.env.VITE_APP_HOST}`;
const WEB_PREFIX = `${PREFIX}/api/web`;
const ADMIN_PREFIX = `${PREFIX}/api/admin`;

export default {
  // 获取用户信息
  userInfo: `${WEB_PREFIX}/users/user-info`,
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  permissions: `${ADMIN_PREFIX}/api/permissions/permissions`,
  sendCode: `${ADMIN_PREFIX}/sendCode`,
  login: `${ADMIN_PREFIX}/login`,
  logout: `${ADMIN_PREFIX}/logout`,
  // 角色相关信息
  roleList: `${ADMIN_PREFIX}/api/role/list`,
  roleAdd: `${ADMIN_PREFIX}/api/role/add`,
  roleUpdate: `${ADMIN_PREFIX}/api/role/update`,
  roleDelete: `${ADMIN_PREFIX}/api/role/delete`,
  getEnableRoleList: `${ADMIN_PREFIX}/api/role/enable`,
  getRolePermissions: `${ADMIN_PREFIX}/api/role/permissions`,
  assignRolePermissions: `${ADMIN_PREFIX}/api/role/assignPermissions`,
  // 管理员相关API
  managerList: `${ADMIN_PREFIX}/api/manager/list`,
  managerAdd: `${ADMIN_PREFIX}/api/manager/add`,
  managerUpdate: `${ADMIN_PREFIX}/api/manager/update`,
  managerDelete: `${ADMIN_PREFIX}/api/manager/delete`,

  // 线索相关API
  // 线索获取
  assignClue: `${ADMIN_PREFIX}/api/clue/assign`,
  clueList: `${ADMIN_PREFIX}/api/clue/list`,
  getCluedetails: `${ADMIN_PREFIX}/api/clue/details`,
  updateClue: `${ADMIN_PREFIX}/api/clue/update`,
  logAdd: `${ADMIN_PREFIX}/api/clue/log`,
  logList: `${ADMIN_PREFIX}/api/clue/logList`
};
