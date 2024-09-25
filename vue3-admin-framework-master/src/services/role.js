import utils from '@/utils/request';
import API from '@/consts/api';

const roleService = {
  getRoleList(params) {
    return utils.get(API.roleList, params);
  },
  getEnableRoleList() {
    return utils.get(API.getEnableRoleList);
  },
  addRole(data) {
    return utils.post(API.roleAdd, data);
  },
  updateRole(data) {
    return utils.put(API.roleUpdate, data);
  },
  deleteRole(params) {
    return utils.delete(API.roleDelete, params);
  },
  getRolePermissions(params) {
    return utils.get(API.getRolePermissions, params);
  },
  assignRolePermissions(data) {
    return utils.put(API.assignRolePermissions, data);
  }
};

export default roleService;
