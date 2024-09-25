var express = require('express');
var router = express.Router();
const userController = require('../../controllers/admin/userController');
const roleController = require('../../controllers/admin/roleController');
const managerController = require('../../controllers/admin/managerController');
const clueController = require('../../controllers/admin/clueController');

// 发送验证码的路由
router.post('/sendCode', userController.sendCode);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/api/permissions/permissions', userController.getPermissions);

// 获取角色路由
router.get('/api/role/list', roleController.roleList);
router.get('/api/role/enable', roleController.getEnableRoleList);
router.post('/api/role/add', roleController.addRole);
router.put('/api/role/update', roleController.updateRole);
router.delete('/api/role/delete', roleController.deleteRole);
router.get('/api/role/permissions', roleController.getRolePermissions);
router.put('/api/role/assignPermissions', roleController.updateRolePermissions);

// 获取管理员路由
router.get('/api/manager/list', managerController.managerList);
router.post('/api/manager/add', managerController.managerAdd);
router.put('/api/manager/update', managerController.managerUpdate);
router.delete('/api/manager/delete', managerController.managerDelete);

// 线索相关路由
router.post('/api/clue/assign', clueController.assignClue)
router.get('/api/clue/list', clueController.clueList)
router.get('/api/clue/details', clueController.clueDetails)
router.put('/api/clue/update', clueController.updateClue)
router.post('/api/clue/log', clueController.logAdd)
router.get('/api/clue/logList', clueController.logList)


module.exports = router;