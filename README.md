# lqdb-agent-web

演示项目

### 前言
代理后台管理系统。本项目核心技术栈是React+Redux+Antd+React-Router
### 依赖模块

项目是用create-react-app创建的，主要还是列出新加的功能依赖包
点击名称可跳转相关网站

- [react](https://facebook.github.io/react/)
- [react-router](https://react-guide.github.io/react-router-cn/)(<span style="color: rgb(243,121,52);">react路由，4.x的版本，如果还使用3.x的版本，请切换分支（ps:分支不再维护）</span>)
- [redux](https://redux.js.org/)(基础用法，但是封装了通用action和reducer，demo中主要用于权限控制（ps：目前可以用16.x的context api代替），可以简单了解下)
- [antd](https://ant.design/index-cn)(<span style="color: rgb(243,121,52);">蚂蚁金服开源的react ui组件框架</span>)
- [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http请求模块，可用于前端任何场景，很强大👍</span>)
- [echarts-for-react](https://github.com/hustcc/echarts-for-react)(<span style="color: rgb(243,121,52);">可视化图表，别人基于react对echarts的封装，足够用了</span>)
- [recharts](http://recharts.org/#/zh-CN/)(<span style="color: rgb(243,121,52);">另一个基于react封装的图表，个人觉得是没有echarts好用</span>)
- [nprogress](https://github.com/rstacruz/nprogress)(<span style="color: rgb(243,121,52);">顶部加载条，蛮好用👍</span>)
- [react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)(<span style="color: rgb(243,121,52);">别人基于react的富文本封装，如果找到其他更好的可以替换</span>)
- [react-draggable](https://github.com/mzabriskie/react-draggable)(<span style="color: rgb(243,121,52);">拖拽模块，找了个简单版的</span>)
- [screenfull](https://github.com/sindresorhus/screenfull.js/)(<span style="color: rgb(243,121,52);">全屏插件</span>)
- [photoswipe](https://github.com/dimsemenov/photoswipe)(<span style="color: rgb(243,121,52);">图片弹层查看插件，不依赖jQuery，还是蛮好用👍</span>)
- [animate.css](http://daneden.me/animate)(<span style="color: rgb(243,121,52);">css动画库</span>)
- [react-loadable](https://github.com/jamiebuilds/react-loadable)(代码拆分，按需加载，预加载，样样都行，具体见其文档，推荐使用)
- 其他小细节省略

### 功能模块
<span style="color: rgb(184,49,47);">备注：项目只引入了ant-design的部分组件，其他的组件antd官网有源码，可以直接复制到项目中使用，后续有时间补上全部组件。</span>

<span style="color: rgb(184,49,47);">项目使用了antd的自定义主题功能-->黑色，若想替换其他颜色，具体操作请查看antd官网</span>
<!--more-->

- 首页
    - 完整布局
    - 换肤(全局功能，暂时只实现了顶部导航的换肤，后续加上其他模块)
- 导航菜单
    - 顶部导航(菜单伸缩，全屏功能)
    - 左边菜单(增加滚动条以及适配路由的active操作)
- UI模块
    - 按钮(antd组件)
    - 图标(antd组件并增加彩色表情符)
    - 加载中(antd组件并增加顶部加载条)
    - 通知提醒框(antd组件)
    - 标签页(antd组件)
    - 轮播图(ant动效组件)
    - 富文本
    - 拖拽
    - 画廊
- 动画
    - 基础动画(animate.css所有动画)
    - 动画案例
- 表格
    - 基础表格(antd组件)
    - 高级表格(antd组件)
    - 异步表格(数据来自掘金酱的接口)
- 表单
    - 基础表单(antd组件)
- 图表
    - echarts图表
    - recharts图表
- 页面
    - 登录页面(包括GitHub第三方登录)
    - 404页面


### 代码目录
```js
+-- build/                                  ---打包的文件目录
+-- config/                                 ---npm run eject 后的配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/                                 
|   --- index.html							---首页入口html文件
|   --- npm.json							---echarts测试数据
|   --- weibo.json							---echarts测试数据
+-- src/                                    ---核心代码目录
|   +-- axios                               ---http请求存放目录
|   |    --- index.js
|   +-- components                          ---各式各样的组件存放目录
|   |    +-- animation                      ---动画组件
|   |    |    --- ...   
|   |    +-- charts                         ---图表组件
|   |    |    --- ...   
|   |    +-- dashboard                      ---首页组件
|   |    |    --- ...   
|   |    +-- forms                          ---表单组件
|   |    |    --- ...   
|   |    +-- pages                          ---页面组件
|   |    |    --- ...   
|   |    +-- tables                         ---表格组件
|   |    |    --- ...   
|   |    +-- ui                             ---ui组件
|   |    |    --- ...   
|   |    --- BreadcrumbCustom.jsx           ---面包屑组件
|   |    --- HeaderCustom.jsx               ---顶部导航组件
|   |    --- Page.jsx                       ---页面容器
|   |    --- SiderCustom.jsx                ---左边菜单组件
|   +-- style                               ---项目的样式存放目录，主要采用less编写
|   +-- utils                               ---工具文件存放目录
|   --- App.js                              ---组件入口文件
|   --- index.js                            ---项目的整体js入口文件，包括路由配置等
--- .env                                    ---启动项目自定义端口配置文件
--- .eslintrc                               ---自定义eslint配置文件，包括增加的react jsx语法限制
--- package.json                                    
```
### 安装运行
##### 1.下载或克隆项目源码
##### 2.yarn 或者 npm安装相关包文件(首先推荐使用yarn，国内建议增加淘宝镜像源，不然很慢，你懂的😁)
> 有些老铁遇到运行时报错，首先确定下是不是最新稳定版的nodejs和npm或者yarn(推荐用yarn)，切记不要用cnpn

```js
// 首推荐使用yarn装包
yarn or npm i
```
##### 3.启动项目
```js
yarn start or npm start
```
##### 4.打包项目
```js
yarn build or npm run build
```

### 更新日志

7-23

修复功能bug。
1：系统用到的短信验证组件请求失败，按钮启动倒计时问题。
2：个人信息界面添加分成比例字段，并判空。

5-11

- 完成项目所有界面用户认证和用户角色认证界面的路由拦截处理。
  访问任何界面的时候，经过路由权限守卫组件来拦截用户是否登录，
  用户角色权限，来决定能否访问指定路由界面。
- 
- 

4-4

- 修改左侧菜单栏支持三级甚至多级菜单展示。
- 左侧菜单栏点击URL设置和支持参数传参（问号形式和匹配符形式）


````
<LocaleProvider locale={zhCN}>
    <AppContainer>
        <AlitaProvider>
            <Page />
        </AlitaProvider>
    </AppContainer>
</LocaleProvider>
````