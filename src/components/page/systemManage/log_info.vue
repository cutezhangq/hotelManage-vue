<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
           <i class="el-icon-setting"></i> 系统管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 新增、删除、搜索 -->
      <div class="handle-box">
        <el-button
                type="danger"
                icon="el-icon-delete"
                class="handle-del mr10"
                @click="delAllSelection"
        >批量删除</el-button>
        <!-- 搜索 关键词 -->
        <el-select v-model="query.queryName" placeholder="关键词" class="handle-select mr10">
          <el-option key="1" label="日志编号" value="log_id"></el-option>
          <el-option key="2" label="用户编号" value="user_id"></el-option>
          <el-option key="3" label="操作" value="operate"></el-option>
          <el-option key="4" label="时间" value="time"></el-option>
          <el-option key="5" label="备注" value="details"></el-option>
          <el-option key="6" label="——全部——" value="0"></el-option>
        </el-select>
        <el-input v-model="query.queryContent" placeholder="输入搜索信息..." class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <!-- 表格的表头：表内容通过prop绑定数据 -->
      <el-table
              :data="tableData"
              border
              class="table"
              ref="multipleTable"
              header-cell-class-name="table-header"
              @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="log_id" label="日志编号" width="100" align="center"></el-table-column>
        <el-table-column prop="user_id" label="用户编号" width="90" align="center"></el-table-column>
        <el-table-column prop="operate" label="操作" width="700" align="center"></el-table-column>
        <el-table-column prop="time" label="时间" width="190" align="center"></el-table-column>
        <el-table-column prop="details" label="备注" width="150" align="center"></el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
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
  name:'log_info',
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
      get(`/dao.show_LogInfo?index=${this.query.pageIndex}&${this.query.queryName}=${this.query.queryContent}`)
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
    // 触发搜索按钮
    handleSearch() {
      let query_name = this.query.queryName;
      let query_content = this.query.queryContent;
      if(query_name === 0){query_content = ""}
      get(`/dao.show_LogInfo?${query_name}=${query_content}`)
              .then( data =>{
                if(data.code === 200){
                  if(data.data.infoList.length > 0){
                    this.tableData = data.data.infoList;
                    this.pageTotal = data.data.count || 0;
                    this.query.pageIndex = data.data.index;
                    this.query.pageSize = data.data.pageSize
                  }else{
                    this.$message.error(`数据库没有相关数据`);
                  }
                }
              })
      //更新视图
      // this.$set(this.query, 'pageIndex', 1);
    },


    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //删除一条数据
    delOneDate(index){
      let cur_id = this.tableData[index].log_id;
      get(`/dao.del_logInfo?log_id=${cur_id}`)
              .then(data =>{
                if(data.code === 200){
                  this.$message.error(`删除了log_id为：${this.tableData[index].log_id}的1条数据`);
                  this.tableData.splice(index, 1);
                  this.getDate();
                }
              })
    },

    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
              .then(() => {
                this.delOneDate(index);
              })
              .catch(() => {});
    },

    //批量删除
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = '';
      let strIds = '';
      this.delList = this.delList.concat(this.multipleSelection);
      if(length > 0){
        for (let i = 0; i < length; i++) {
          str += this.multipleSelection[i].user_id + ' ';
          strIds += this.multipleSelection[i].log_id + ',';
        }
        //发送批量删除请求
        get(`/dao.del_logInfo?log_id=${strIds}`)
                .then(data =>{
                  if(data.code === 200){
                    let delDateNum = strIds.match(/,/g).length;
                    this.$message.error(`批量删除了${delDateNum}条数据`);
                    this.multipleSelection = [];
                    this.getDate();
                  }
                })

      }else{
        this.$message.error(`请选择要删除的条目`);
      }
    },

    // 分页导航
    handlePageChange(val) {
      //更新视图
      // this.$set(this.query, 'pageIndex', val);
      this.query.pageIndex = val;
      this.getDate();
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
