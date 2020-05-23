<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-shopping-cart-1"></i> 消费管理
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
        <el-button
                type="success"
                icon="el-icon-plus"
                class="handle-del mr10"
                @click="addDate"
        >新增数据</el-button>
        <el-tooltip content="暂未开放，请前往商品管理查看" placement="top">
          <el-button
                  v-if="!goodsInfo_flag"
                  type="primary"
                  icon="el-icon-goods"
                  class="handle-del mr10"
                  @click="goodsInfo_flag"
          >商品信息查询</el-button>
        
          <el-button
                  v-else
                  type="primary"
                  icon="el-icon-shopping-cart-1"
                  class="handle-del mr10"
                  @click="showCostInfo"
          >返回消费管理</el-button>
          </el-tooltip>
        <!-- 搜索 关键词 -->
        <el-select v-model="query.queryName" placeholder="关键词" class="handle-select mr10">
          <el-option key="1" label="消费编号" value="cost_id"></el-option>
          <el-option key="2" label="入住编号" value="checkin_id"></el-option>
          <el-option key="3" label="房间编号" value="room_id"></el-option>
          <el-option key="4" label="商品编号" value="goods_id"></el-option>
          <el-option key="5" label="数量" value="number"></el-option>
          <el-option key="6" label="操作者" value="operator"></el-option>
          <el-option key="7" label="时间" value="time"></el-option>
          <el-option key="8" label="备注" value="details"></el-option>
          <el-option key="9" label="——全部——" value="0"></el-option>
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
        <el-table-column prop="cost_id" label="消费编号" width="130" align="center"></el-table-column>
        <el-table-column prop="checkin_id" label="入住编号" align="center"></el-table-column>
        <el-table-column prop="room_id" label="房间编号" align="center"></el-table-column>
        <el-table-column prop="goods_id" label="商品编号" align="center"></el-table-column>
        <el-table-column prop="number" label="数量" align="center"></el-table-column>
        <el-table-column prop="operator" label="操作者" align="center"></el-table-column>
        <el-table-column prop="time" label="时间" align="center" width="160"></el-table-column>
        <el-table-column prop="details" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
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

    <!-- 新增弹出框 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
      <el-form ref="form" :model="add_form" label-width="70px">
        <el-form-item label="房间编号">
          <el-input v-model="add_form.room_id"></el-input>
        </el-form-item>
        <el-form-item label="商品编号">
          <el-input v-model="add_form.goods_id"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="add_form.number"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="add_form.time"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="add_form.details"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="消费编号">
          <el-input v-model="form.cost_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="入住编号">
          <el-input v-model="form.checkin_id"></el-input>
        </el-form-item>
        <el-form-item label="房间编号">
          <el-input v-model="form.room_id"></el-input>
        </el-form-item>
        <el-form-item label="商品编号">
          <el-input v-model="form.goods_id"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="操作者">
          <el-input v-model="form.operator" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="form.time"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.details"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import {get,post} from '@/utils/request';
export default {
  name: 'cost_info',
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
      add_form:{ //新增数据
        goods_name: "",
        type_id: "",
        price: "",
        discount: "",
        unit: "",
        details: "",
      },
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
      get(`/dao.show_costInfo?index=${this.query.pageIndex}&${this.query.queryName}=${this.query.queryContent}`)
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
      get(`/dao.show_costInfo?${query_name}=${query_content}`)
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
    //添加数据
    addDate(){
      this.addVisible = true;
    },
    //保存新增
    saveAdd(){
      post(`/dao.add_costInfo?checkin_id=${this.add_form.checkin_id}
                &room_id=${this.add_form.room_id}
                &goods_id=${this.add_form.goods_id}
                &number=${this.add_form.number}
                &operator=${this.add_form.operator}
                &time=${this.add_form.time}
                &details=${this.add_form.details}
                `
      )
              .then( data =>{
                if(data.code === 200){
                  this.addVisible =  false;
                  this.$message.success(`新增一条数据成功`);
                  this.getDate();
                }
              })
    },

    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //删除一条数据
    delOneDate(index){
      let cur_id = this.tableData[index].cost_id;
      get(`/dao.del_costInfo?cost_id=${cur_id}`)
              .then(data =>{
                if(data.code === 200){
                  this.$message.error(`删除了${this.tableData[index].type},1条数据`);
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
          str += this.multipleSelection[i].checkin_id + ' ';
          strIds += this.multipleSelection[i].cost_id + ',';
        }
        //发送批量删除请求
        get(`/dao.del_costInfo?cost_id=${strIds}`)
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

    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;  //当前行
      this.editVisible = true;
    },

    // 保存编辑
    saveEdit() {
      let curEdit_row = this.form;
      post(`/dao.update_costInfo?cost_id=${curEdit_row.cost_id}
                &checkin_id=${curEdit_row.checkin_id}
                &room_id=${curEdit_row.room_id}
                &goods_id=${curEdit_row.goods_id}
                &number=${curEdit_row.number}
                &time=${curEdit_row.time}
                &details=${curEdit_row.details}`
      )
              .then( data =>{
                if(data.code === 200){
                  this.editVisible = false;
                  this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                  this.$set(this.tableData, this.idx, this.form);
                  this.getDate();
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