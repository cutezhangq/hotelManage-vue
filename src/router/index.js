import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                // 基础信息管理
                {
                    path:'/room_type',
                    component: () => import('../components/page/BasicInfoManage/room_type.vue'),
                     meta: { title: '客房类型管理' }
                },
                {
                    path:'/floor_info',
                    component: () => import('../components/page/BasicInfoManage/floor_info.vue'),
                     meta: { title: '楼层管理' }
                },
                {
                    path:'/goods_type',
                    component: () => import('../components/page/BasicInfoManage/goods_type.vue'),
                     meta: { title: '商品类别管理' }
                },
                {
                    path:'/goods_info',
                    component: () => import('../components/page/BasicInfoManage/goods_info.vue'),
                     meta: { title: '商品信息管理' }
                },

                {
                    path:'/member_info',
                    component: () => import('../components/page/BasicInfoManage/member_info.vue'),
                     meta: { title: '会员管理' }
                },

                // 客房管理
                {
                  path:'/room_info',
                  component: () => import('../components/page/RoomManage/room_info.vue'),
                   meta: { title: '客房管理' }
                },
                
                // 房客管理
                {
                  path:'/order_info',
                  component: () => import('../components/page/tenantManage/order_info.vue'),
                   meta: { title: '客房预定' }
                },
                {
                  path:'/checkin_info',
                  component: () => import('../components/page/tenantManage/checkin_info.vue'),
                   meta: { title: '客房入住' }
                },
                {
                  path:'/replace-room',
                  component: () => import('../components/page/tenantManage/replace-room.vue'),
                   meta: { title: '换房' }
                },
                {
                  path:'/bill_info',
                  component: () => import('../components/page/tenantManage/bill_info.vue'),
                   meta: { title: '退房结帐' }
                },

                //消费管理
                {
                  path:'/cost_info',
                  component: () => import('../components/page/costInfoManage/cost_info.vue'),
                   meta: { title: '消费管理' }
                },

                // 报表管理
                {
                  path:'/order_info_report',
                  component: () => import('../components/page/reportManage/order_info_report.vue'),
                   meta: { title: '预定客人报表' }
                },
                {
                  path:'/checkin_info_report',
                  component: () => import('../components/page/reportManage/checkin_info_report.vue'),
                   meta: { title: '在住客人报表' }
                },
                {
                  path:'/bill_info_report',
                  component: () => import('../components/page/reportManage/bill_info_report.vue'),
                   meta: { title: '离店客人报表' }
                },
                {
                  path:'/cost_info_report',
                  component: () => import('../components/page/reportManage/cost_info_report.vue'),
                   meta: { title: '财务进账报表' }
                },

                // 系统管理
                {
                  path:'/user_info',
                  component: () => import('../components/page/systemManage/user_info.vue'),
                   meta: { title: '用户信息维护' }
                },
                {
                  path:'/log_info',
                  component: () => import('../components/page/systemManage/log_info.vue'),
                   meta: { title: '日志信息维护' }
                },

                //功能页面
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
