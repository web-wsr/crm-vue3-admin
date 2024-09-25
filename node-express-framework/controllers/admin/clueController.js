// 控制器 操作添加线索和线索页面展示的逻辑
const Clue = require('../../model/clue');
// 增加引入 clueLog 和 User的用户模型
const ClueLog = require('../../model/log');
const User = require('../../model/user');
const userRole = require('../../model/user_role');
const Role = require('../../model/role');
// 处理时间的工具函数
const { formatDate } = require('../../utils/date');

const clueController = {
    assignClue: async function (req, res, next) {
        let name = req.body.name;
        let phone = req.body.phone;
        let utm = req.body.utm;
        let created_time = new Date();
        if (!name || !phone) {
            res.json({ code: 0, message: '请填写完整信息' });
            return
        }

        try {
            const clues = await Clue.insert({ name, phone, utm, created_time });
            res.json({ code: 200, data: clues, message: '添加成功' });
        } catch (e) {
            res.json({
                code: 0,
                data: e,
                error: e.message,
                message: '添加失败'
            })
        }
    },
    clueList: async function(req, res, next){
        try{
            const slug = res.locals.userInfo.slug;
            const user_id = res.locals.userInfo.id;
            const page = req.query.page || 1;
            const limit = req.query.pageSize || 10;
            let pagination = { page, limit }
            console.log(slug, user_id);
            let params = {};
            if (slug == 'sales') {
                params.user_id = user_id;
            }
            // params.user_id = user_id;
            console.log(params);
            const count = await Clue.count(params);
            const sum = count[0].sum;
            const clues = await Clue.joinUser(params, pagination);
            console.log(clues);
            const clueList  = clues.map((data) => {
                data.created_time_display = formatDate(data.created_time);
                return data;
            })
            res.json({
                code:200,
                data: clueList,
                total: sum
            })
        }catch(e){
            res.json({
                code:0,
                data: e
            })
        }
    },
    clueDetails: async function(req, res, next){
        try{
            // 取出相应的信息，为渲染页面做准备 存在视图对象res.locals
            const id = req.query.id;
            const clues = await Clue.select({ id });
            const clueDetails  = clues.map((data) => {
                data.created_time_display = formatDate(data.created_time);
                return data;
            })
            const clue = clueDetails[0];
            console.log( 'clues',clue);
            // 跟踪线索的记录id,对应的就是log-item中的序号
            // const logs = await ClueLog.select({ clue_id: id });


            // 筛选为销售的用户
            // const users = await User.select({ role: 2 });
            // 第一步：查找slug为'sales'的角色
            const salesRole = await Role.select({ slug: 'sales' });
            console.log(salesRole);
            if (!salesRole) {
                throw new Error('No role found with slug "sales".');
            }
            // 第二步：使用角色id在userRole表中查找所有拥有该角色的用户id
            const salesRoleId = await userRole.where({ role_id: salesRole[0].id });
            const userIds = salesRoleId.map(data => data.user_id);
            console.log('userIds',userIds);
            // 第三步：找到所有该角色的用户
            const users = await User.knex().whereIn('id', userIds);
            const sales = users.map(data => {
                return {
                    id: data.id,
                    name: data.name
                }
            })
            console.log('sales',sales);
            
            res.json({
                code:200,
                clue,
                sales
            })
        }catch(e){
            res.json({
                code:0,
                data: e
            })
        }
    },
    updateClue: async function(req, res, next){
        let status = req.body.status;
        let remark = req.body.remark;
        let id = req.body.id;
        let user_id = req.body.user_id
        if (!status || !remark) {
            res.json({ code: 0, message: '请填写完整信息，嘻嘻' })
            return;
        }

        try {
            const clue = await Clue.update(id, {
                status, remark, user_id
            })
            res.json({
                code: 200,
                data: clue,
                message: '修改成功'
            })
        } catch (e) {
            res.json({
                code: 0,
                data: e,
                error: e.message,
                message: '修改失败'
            })
        }
    },
    logAdd: async function(req, res, next){
        let content = req.body.content;
        let created_time = new Date();
        let clue_id = req.body.clue_id;
        if (!content) {
            res.json({ code: 0, message: '线索记录不能为空' })
            return;
        }

        try {
            const clues = await ClueLog.insert({
                content, created_time, clue_id
            })
            res.json({ code: 200, data: clues, message: '添加成功' })
        } catch (e) {
            res.json({
                code: 0,
                data: e,
                error: e.message,
                message: '添加失败'
            })
        }
    },
    logList: async function(req, res, next){
        let clue_id = req.query.clue_id;
        try {
            const logs = await ClueLog.select({ clue_id });
            const logList = logs.map((data) => {
                data.created_time_display = formatDate(data.created_time);
                return data;
            })
            console.log(logList);
            res.json({
                code:200,
                data: logList
            })
            
        }catch(e){
            res.json({
                code:0,
                data: e
            })
        }
    }
};

module.exports = clueController

