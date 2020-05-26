<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'BasicInfoManage',
                    title: '基础信息管理',
                    subs: [
                        {
                            index: 'room_type',
                            title: '客房类型管理'
                        },
                        {
                            index: 'floor_info',
                            title: '楼层管理'
                        },
                        {
                            index: 'goods_type',
                            title: '商品类别管理'
                        },
                        {
                            index: 'goods_info',
                            title: '商品信息管理'
                        },
                        {
                            index: 'member_info',
                            title: '会员管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-office-building',
                    index: 'room_info',
                    title: '客房管理'
                },
                {
                    icon: 'el-icon-user',
                    index: 'tenantManage',
                    title: '房客管理',
                    subs: [
                        {
                            index: 'order_info',
                            title: '预定'
                        },
                        {
                            index: 'checkin_info',
                            title: '入住'
                        },
                        {
                            index: 'replace-room',
                            title: '换房'
                        },
                        {
                            index: 'bill_info',
                            title: '退房结帐'
                        },
                    ]
                },
                {
                    icon: 'el-icon-shopping-cart-1',
                    index: 'cost_info',
                    title: '消费管理'
                },
                {
                    icon: 'el-icon-tickets',
                    index: 'reportManage',
                    title: '报表管理',
                    subs: [
                        {
                            index: 'order_info_report',
                            title: '预定客人报表'
                        },
                        {
                            index: 'checkin_info_report',
                            title: '入住客人报表'
                        },
                        // {
                        //     index: 'today_order_info',
                        //     title: '今日预定客人报表'
                        // },
                        // {
                        //     index: 'today_checkin_info',
                        //     title: '今日入住客人报表'
                        // },
                        {
                            index: 'today_bill_info',
                            title: '当日消费人数报表'
                        },
                        {
                            index: 'today_leavecustomers',
                            title: '当日离店人数报表'
                        }
                    ]
                },
                {
                    icon: 'el-icon-setting',
                    index: 'systemManage',
                    title: '系统管理',
                    subs: [
                        {
                            index: 'user_info',
                            title: '用户信息维护'
                        },
                        {
                            index: 'log_info',
                            title: '日志信息维护'
                        }
                    ]
                },

                //其他功能页面
                // {
                //     icon: 'el-icon-lx-copy',
                //     index: 'tabs',
                //     title: 'tab选项卡'
                // },
                // {
                //     icon: 'el-icon-lx-calendar',
                //     index: '3',
                //     title: '表单相关',
                //     subs: [
                //         {
                //             index: 'form',
                //             title: '基本表单'
                //         },
                //         {
                //             index: '3-2',
                //             title: '三级菜单',
                //             subs: [
                //                 {
                //                     index: 'editor',
                //                     title: '富文本编辑器'
                //                 },
                //                 {
                //                     index: 'markdown',
                //                     title: 'markdown编辑器'
                //                 }
                //             ]
                //         },
                //         {
                //             index: 'upload',
                //             title: '文件上传'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-cascades',
                //     index: 'table',
                //     title: '基础表格'
                // },
                // {
                //     icon: 'el-icon-lx-emoji',
                //     index: 'icon',
                //     title: '自定义图标'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'charts',
                //     title: 'schart图表'
                // },
                // {
                //     icon: 'el-icon-rank',
                //     index: '6',
                //     title: '拖拽组件',
                //     subs: [
                //         {
                //             index: 'drag',
                //             title: '拖拽列表'
                //         },
                //         {
                //             index: 'dialog',
                //             title: '拖拽弹框'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'i18n',
                //     title: '国际化功能'
                // },
                // {
                //     icon: 'el-icon-lx-warn',
                //     index: '7',
                //     title: '错误处理',
                //     subs: [
                //         {
                //             index: 'permission',
                //             title: '权限测试'
                //         },
                //         {
                //             index: '404',
                //             title: '404页面'
                //         }
                //     ]
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
