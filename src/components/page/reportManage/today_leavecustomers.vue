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
        <el-table-column prop="checkin_id" label="入住单号" align="center"></el-table-column>
        <el-table-column prop="new_room_id" label="新房间号" align="center"></el-table-column>
        <el-table-column prop="deposit" label="押金" align="center"></el-table-column>
        <el-table-column prop="checkin_price" label="入住价格" align="center"></el-table-column>
        <el-table-column prop="checkiner" label="客户姓名" align="center"></el-table-column>
        <el-table-column prop="id_type" label="证件类别" align="center"></el-table-column>
        <el-table-column prop="id_number" label="证件号码" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="arrivals_time" label="抵店时间" align="center"></el-table-column>
        <el-table-column prop="leave_time" label="离店时间" align="center"></el-table-column>
        <el-table-column prop="number" label="入住人数" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作员" align="center"></el-table-column>
        <el-table-column prop="member_id" label="会员编号" align="center"></el-table-column>
        <el-table-column prop="breakfast" label="是否提供早餐" align="center"></el-table-column>
        <el-table-column prop="wake" label="是否定时叫醒" align="center"></el-table-column>
        <el-table-column prop="order_to" label="是否是预定转入住" align="center"></el-table-column>
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
  name: 'today_leavecustomers',
  data() {
    return {
      goodsInfo_flag:false,
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
      get(`/dao.todayleavecustomers_reportform`)
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
    },

    //返回消费管理页面
    showCostInfo(){
      this.goodsInfo_flag = false;
    }
  }
}
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