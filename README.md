# 基于Vue3的CRM 客户管理系统

## 运行

1. 安装依赖

   ```bash
   npm install
   ```

2. 启动数据库服务

   启动数据库服务，运行数据库集成环境MAMP

3. 确保已安装好需要的npm包

   ```
   # knex用于数据库交互
   # nodemon用于热更新
   npm install knex nodemon -g
   ```

4. 新建`.env`文件

   ```
   # 根据`.env-example`提示在`.env`中将信息补充完整，如下：
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=root
    DB_DATABASE=combat-admin

    JWT_SECRET=itwsr

5. Migrate：数据库中新建表，数据初始化

   ``` bash
   # 运行数据库迁移
   knex migrate:latest
   # 回滚，需要时可执行
   # knex migrate:rollback
   # 填充初始数据
   knex seed:run
   ```

6. 项目启动
   npm run dev

7. 登录信息

   管理员角色登录，账号：`15612633628`，验证码登录
## RABC权限系统
1.表设计
   线索表（clue）：
   属性：id，姓名，电话，来源，创建时间，跟踪销售，状态
   线索记录表（clue-log）
   属性：id，clue_id，跟踪内容（content)
   管理员表（user）
   属性：id，name，phone，创建时间
   管理员-角色表（user_roles）：
   属性：id，user_id，role_id，创建时间，更新时间
   角色表（roles）:
   属性：id，slug（英文名），name，description，创建时间，更新时间
   角色-权限表（role_permissions）:
   属性：role_id，permission_id
   权限表（permissions）:
   属性：id，group_id，slug（权限英文），name（权限名）
   权限分组表（permissions——groups）:
   属性：id，name（权限分组名）
