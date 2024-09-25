import utils from '@/utils/request';
import API from '@/consts/api';

const managerService = {
  getManagerList(params) {
    return utils.get(API.managerList, params);
  },
  managerAdd(data) {
    return utils.post(API.managerAdd, data);
  },
  managerUpdate(data) {
    return utils.put(API.managerUpdate, data);
  },
  managerDelete(params) {
    return utils.delete(API.managerDelete, params);
  }
};

export default managerService;
