##  图书借阅系统(SSR)

> 技术栈： nodejs + mongodb + jquery + bootstrap + art-template + crawler

> [api地址](https://github.com/angelasubi/node-book-api)  

> [爬虫地址]() 

> [vue版本]()  

> [react版本]()

### 使用说明

``` bash
# 克隆项目
git clone git@github.com:angelasubi/library-borrow.git

# 安装依赖
npm install

# 启动mogodb
sudo mongod

# 运行
node app.js

```

### 项目说明  

项目本身是练手的，可以说是NodeJS服务端渲染的第一个项目  

项目开始的时候本打算用预编译器手写样式，但由于时间的问题才用了bootstrap  

登陆注册用到jquery-validate插件，通过bootstrap的rules来修改

主要对用户和管理员身份进行了区分和处理

总体来说还是相对简单的，适合入门-。-

### 功能  

- [x] **用户**
    - [x] 书籍列表页
    - [x] 用户注册
    - [x] 用户登录
    - [x] 用户借阅信息

- [x] **管理员**
    - [x] 管理员后台
    - [x] 管理员登陆
    - [x] 管理后台信息列表
    - [x] 管理后台新增用户
    - [x] 管理后台修改信息
    - [x] 管理后台删除信息
    - [x] 管理后台查询用户借阅信息

- [x] **其他**
    - [x] 懒加载
    - [x] 搜索功能
    - [x] 分页功能 


### License
MIT 
