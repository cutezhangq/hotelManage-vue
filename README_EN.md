# hotelManage-vue

  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.8.2-brightgreen.svg" alt="element-ui">
  </a>

## Preface

The scheme as a set of multi-function background frame templates, suitable for most of the WEB management system development. Convenient development fast simple good components based on Vue2 and Element-UI. Color separation of color style, support manual switch themes, and it is convenient to use a custom theme color.

## Function

-   [x] Element-UI
-   [x] Login/Logout
-   [x] Dashboard
-   [x] Table
-   [x] Tabs
-   [x] From
-   [x] AntVG2Chart :bar_chart:
-   [x] Editor
-   [x] Markdown
-   [x] Upload pictures by clipping or dragging
-   [x] Support manual switch themes :sparkles:
-   [x] List drag sort
-   [x] Permission
-   [x] 404 / 403
-   [x] Three level menu
-   [x] Custom icon

## Installation steps

    git clone https://gitee.com/zhuangzhoudekun/hotelManage-vue.git		// Clone templates
    cd hotelManage-vue											// Enter template directory
    npm install													// Installation dependency

## Local development

    // Open server and access http://localhost:8080 in browser
    npm run serve

## Constructing production

    // Constructing project
    npm run build

## Component description and presentation



### element-ui

A desktop component library based on vue.js2.0 . Github : [element](http://element.eleme.io/#/zh-CN/component/layout)

### Vue-Quill-Editor

Quill editor component for Vue2. Github : [vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

### mavonEditor

A markdown editor based on Vue that supports a variety of personalized features. Github: [mavonEditor](https://github.com/hinesboy/mavonEditor)

### vue-cropperjs

A Vue wrapper component for cropperjs. Github: [vue-cropperjs](https://github.com/Agontuk/vue-cropperjs)

## Notice

### 一、How to switch themes?

The first step to enter 'src/main.js' and change into green theme.

```javascript
import 'element-ui/lib/theme-default/index.css'; // default theme
// import '../static/css/theme-green/index.css';       // green theme
```

The second step to enter 'src/App.vue' and change into green theme.

```javascript
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

Finally,enter 'src/components/common/Sidebar.vue' and find el-menu Tags,delete 'background-color/text-color/active-text-color'。

## Screenshot

### Login

![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/master/screenshots/%E7%99%BB%E9%99%86%E9%A1%B5%E9%9D%A2.png)

### Home page

![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/master/screenshots/%E7%B3%BB%E7%BB%9F%E9%A6%96%E9%A1%B51.png)
![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/master/screenshots/%E7%B3%BB%E7%BB%9F%E9%A6%96%E9%A1%B52.png)
![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/master/screenshots/%E7%B3%BB%E7%BB%9F%E9%A6%96%E9%A1%B53.png)

### Guest room management

![Image text](https://gitee.com/zhuangzhoudekun/hotelManage-vue/raw/master/screenshots/%E5%AE%A2%E6%88%BF%E7%AE%A1%E7%90%86.png)

