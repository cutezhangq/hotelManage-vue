# hotelManage-vue

<a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.8.2-brightgreen.svg" alt="element-ui">
  </a>

基于 Vue + Element UI 的后台管理系统解决方案。


[English document](https://gitee.com/zhuangzhoudekun/hotelManage-vue/blob/dev-zq/README_EN.md)

## 项目截图

### 登录

![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/dev-zq/screenshots/%E7%99%BB%E9%99%86%E9%A1%B5%E9%9D%A2.png)

### 首页

![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/dev-zq/screenshots/%E7%B3%BB%E7%BB%9F%E9%A6%96%E9%A1%B51.png)
![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/dev-zq/screenshots/%E7%B3%BB%E7%BB%9F%E9%A6%96%E9%A1%B52.png)
![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/dev-zq/screenshots/%E7%B3%BB%E7%BB%9F%E9%A6%96%E9%A1%B53.png)

### 客房管理

![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/dev-zq/screenshots/%E5%AE%A2%E6%88%BF%E7%AE%A1%E7%90%86.png)


## 特别鸣谢

团队成员

## 前言

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于 vue.js，使用 vue-cli3 脚手架，引用 Element UI 组件库，方便开发快速简洁好看的组件。分离颜色样式，支持手动切换主题色，而且很方便使用自定义主题色。

## 功能

-   [x] Element UI
-   [x] 登录/注销
-   [x] Dashboard
-   [x] 表格
-   [x] Tab 选项卡
-   [x] 表单
-   [x] AntVG2图表 :bar_chart:
-   [x] 富文本编辑器
-   [x] markdown 编辑器
-   [x] 图片拖拽/裁剪上传
-   [x] 支持切换主题色 :sparkles:
-   [x] 列表拖拽排序
-   [x] 权限测试
-   [x] 404 / 403
-   [x] 三级菜单
-   [x] 自定义图标
-   [x] 可拖拽弹窗
-   [x] 国际化

## 安装步骤

```
git clone https://gitee.com/zhuangzhoudekun/hotelManage-vue.git      // 把模板下载到本地
cd hotelManage-vue    // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn

// 开启服务器，浏览器访问 http://localhost:8080
npm run serve

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

## 其他注意事项

### 一、如何切换主题色呢？

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import './assets/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";     /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

第三步：打开 src/components/common/Sidebar.vue 文件，找到 el-menu 标签，把 background-color/text-color/active-text-color 属性去掉即可。

