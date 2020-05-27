<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 报表管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 表格的表头：表内容通过prop绑定数据 -->
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
                <el-table-column prop="order_id" label="预定单号" align="center"></el-table-column>
                <el-table-column prop="room_id" label="客房编号" align="center"></el-table-column>
                <el-table-column prop="room_type_id" label="客房类型" align="center"></el-table-column>
                <el-table-column prop="price" label="标准价" align="center"></el-table-column>
                <el-table-column prop="discounted_price" label="折后价" align="center"></el-table-column>
                <el-table-column prop="deposit" label="押金" align="center"></el-table-column>
                <el-table-column prop="orderer" label="预定人" align="center"></el-table-column>
                <el-table-column prop="id_type" label="证件类别" align="center"></el-table-column>
                <el-table-column prop="id_number" label="证件号码" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" width="120" align="center"></el-table-column>
                <el-table-column prop="arrivals_time" label="抵店时间" width="120" align="center"></el-table-column>
                <el-table-column prop="leave_time" label="离店时间" align="center"></el-table-column>
                <el-table-column prop="number" label="入住人数" align="center"></el-table-column>
                <el-table-column prop="operator" label="操作员" align="center"></el-table-column>
                <el-table-column prop="member_id" label="会员编号" align="center"></el-table-column>
                <el-table-column prop="vip_price" label="会员价" align="center"></el-table-column>
                <el-table-column prop="order_status" label="预定状态" align="center"></el-table-column>
                <el-table-column prop="details" label="备注" align="center"></el-table-column>
            </el-table>
            <!-- 页码 -->
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {get,post} from '@/utils/request';

export default {
    name: 'today_order_info',
    data() {
        return {
            query: {
                queryContent: '',
                queryName: '',
                pageIndex: 1,
                pageSize: 5,
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,  //当前修改条目的id
            id: -1,
            // nowDate: "",    // 当前日期
            // nowTime: "",    // 当前时间
        };
    },
    created() {
      // this.getTime();
      this.getDate();
    },
    methods: {
        // currentTime() {
        //     setInterval(this.getTime, 500);
        // },
        // getTime(){
        //     let _this = this;
        //     let yy = new Date().getFullYear();
        //     let mm = new Date().getMonth() + 1;
        //     let dd = new Date().getDate();
        //     let hh = new Date().getHours();
        //     let mf = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes(): new Date().getMinutes();
        //     let se = new Date().getSeconds();
        //     _this.nowTime = hh + ":" + mf + ":" + se;
        //     _this.nowDate = yy + "-" + mm + "-" + dd;
        // },
        getDate(){
          // let nowTime = this.nowDate+" "+this.nowTime;
          // console.log('当前时间----------',nowTime);
          get(`/dao.show_orderInfo?index=${this.query.pageIndex}`)
          .then( data =>{
            if(data.code === 200){
              if(data.data.infoList.length > 0){
                this.tableData = data.data.infoList;
                this.pageTotal = data.data.count || 0;  //总条数
                this.query.pageIndex = data.data.index;  //当前页号
                this.query.pageSize = data.data.pageSize  //限制每页数据条数
              }
            }
          })
        },
       
        // 分页导航
        handlePageChange(val) {
          //更新视图
          // this.$set(this.query, 'pageIndex', val);
          this.query.pageIndex = val;
          this.getDate();
        }
    },
    // mounted() {
    //     this.currentTime();
    // },
    // // 销毁定时器
    // beforeDestroy: function() {
    //     if (this.getDate) {
    //         console.log("销毁定时器")
    //         clearInterval(this.getTime); // 在Vue实例销毁前，清除时间定时器
    //     }
    // }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
