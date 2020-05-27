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
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
                <el-table-column prop="bill_id" label="账单ID" width="130" align="center"></el-table-column>
                <el-table-column prop="checkin_id" label="入住单号" align="center"></el-table-column>
                <el-table-column prop="room_id" label="客房编号" align="center"></el-table-column>
                <el-table-column prop="deposit" label="押金" align="center"></el-table-column>
                <el-table-column prop="checkin_price" label="入住房间价格" align="center"></el-table-column>
                <el-table-column prop="days" label="入住天数" align="center"></el-table-column>
                <el-table-column prop="accommodation_fee" label="总共房费" align="center"></el-table-column>
                <el-table-column prop="in_store_consumption" label="店内消费" align="center"></el-table-column>
                <el-table-column prop="real_income" label="应收费用" align="center"></el-table-column>
                <el-table-column prop="income" label="客户付款" align="center"></el-table-column>
                <el-table-column prop="return_money" label="找零" align="center"></el-table-column>
                <el-table-column prop="return_deposit" label="应退押金" align="center"></el-table-column>
                <el-table-column prop="pay_method" label="付款方式" align="center"></el-table-column>
                <el-table-column prop="operator" label="操作员ID" align="center"></el-table-column>
                <el-table-column prop="details" label="详情" align="center"></el-table-column>
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
import { fetchData } from '@/api/index';

export default {
    name: 'today_bill_info',
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
            id: -1
        };
    },
    created() {
      this.getDate();
    },
    methods: {
        //获取roomType数据
        getDate(){
          get(`/dao.showtodaybillInfo_reportform`)
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
    }
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
