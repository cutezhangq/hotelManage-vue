<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-user"></i> 房客管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 新增、删除、搜索 -->
            <div class="handle-box">
                <el-button
                    type="success"
                    icon="el-icon-plus"
                    class="handle-del mr10"
                    @click="addDate"
                >新增数据</el-button>
                 <el-tooltip content="将前往客房管理查看" placement="top">
                  <el-button
                    type="primary"
                    icon="el-icon-office-building"
                    class="handle-del mr10"
                    @click="ToRoom_info()"
                >查看空房</el-button>
                 </el-tooltip>
                      <el-tooltip content="新增-选择的roomInfo状态为 空房" placement="top">
                    <el-button
                    type="info"
                    icon="el-icon-info"
                    class="handle-del mr10"
                  >备注</el-button>
                 </el-tooltip>
                <!-- 搜索 关键词 -->
                <el-select v-model="query.queryName" placeholder="关键词" class="handle-select mr10">
                    <el-option key="1" label="预定单号" value="order_id"></el-option>
                    <el-option key="2" label="客房编号" value="room_id"></el-option>
                    <el-option key="3" label="客房类型" value="room_type_id"></el-option>
                    <el-option key="4" label="标准价" value="price"></el-option>
                    <el-option key="5" label="折后价" value="discounted_price"></el-option>
                    <el-option key="6" label="押金" value="deposit"></el-option>
                    <el-option key="7" label="预定人" value="orderer"></el-option>
                    <el-option key="8" label="证件类别" value="id_type"></el-option>
                    <el-option key="9" label="证件号码" value="id_number"></el-option>
                    <el-option key="10" label="联系电话" value="phone"></el-option>
                    <el-option key="11" label="抵店时间" value="arrivals_time"></el-option>
                    <el-option key="12" label="离店时间" value="leave_time"></el-option>
                    <el-option key="13" label="入住人数" value="number"></el-option>
                    <el-option key="14" label="操作员" value="operator"></el-option>
                    <el-option key="15" label="会员编号" value="member_id"></el-option>
                    <el-option key="16" label="会员价" value="vip_price"></el-option>
                    <el-option key="17" label="预定状态" value="order_status"></el-option>
                    <el-option key="18" label="备注" value="details"></el-option>
                    <el-option key="19" label="——全部——" value="0"></el-option>
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
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <!-- <el-button
                            type="text"
                            icon="el-icon-s-home"
                            @click="roomInfo_order(scope.$index, scope.row)"
                        >客房信息查询</el-button> -->
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
                <el-form-item label="客房编号">
                  <el-tooltip content="必须是 空房" placement="top">
                     <el-input v-model="add_form.room_id"></el-input>
                  </el-tooltip>
                </el-form-item>
                 <el-form-item label="押金">
                    <el-input v-model="add_form.deposit"></el-input>
                </el-form-item>
                 <el-form-item label="预定人">
                    <el-input v-model="add_form.orderer"></el-input>
                </el-form-item>
                 <el-form-item label="证件类别">
                    <el-input v-model="add_form.id_type"></el-input>
                </el-form-item>
                 <el-form-item label="证件号码">
                    <el-input v-model="add_form.id_number"></el-input>
                </el-form-item>
                 <el-form-item label="联系电话">
                    <el-input v-model="add_form.phone"></el-input>
                </el-form-item>
                 <el-form-item label="抵店时间">
                    <el-input v-model="add_form.arrivals_time"></el-input>
                </el-form-item>
                     <el-form-item label="离店时间">
                    <el-input v-model="add_form.leave_time"></el-input>
                </el-form-item>
                <el-form-item label="入住人数">
                    <el-input v-model="add_form.number"></el-input>
                </el-form-item>
                <!-- 这里后台暂时没有token验证，操作员就是当前登录的用户的id -->
                 <!-- <el-form-item label="操作员">
                    <el-input v-model="add_form.operator"></el-input>
                </el-form-item> -->
                <el-form-item label="会员编号">
                    <el-input v-model="add_form.member_id"></el-input>
                </el-form-item>
                <el-form-item label="预定状态">
                    <el-radio v-model="add_form.order_status" label="正常">正常</el-radio>
                    <el-radio v-model="add_form.order_status" label="已入住">已入住</el-radio>
                    <el-radio v-model="add_form.order_status" label="已取消">已取消</el-radio>
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
                 <el-form-item label="预定单号">
                    <el-input v-model="form.order_id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="客房编号">
                    <el-input v-model="form.room_id"></el-input>
                </el-form-item>
                 <el-form-item label="押金">
                    <el-input v-model="form.deposit"></el-input>
                </el-form-item>
                 <el-form-item label="预定人">
                    <el-input v-model="form.orderer"></el-input>
                </el-form-item>
                 <el-form-item label="证件类别">
                    <el-input v-model="form.id_type"></el-input>
                </el-form-item>
                 <el-form-item label="证件号码">
                    <el-input v-model="form.id_number"></el-input>
                </el-form-item>
                 <el-form-item label="联系电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                 <el-form-item label="抵店时间">
                    <el-input v-model="form.arrivals_time"></el-input>
                </el-form-item>
                     <el-form-item label="离店时间">
                    <el-input v-model="form.leave_time"></el-input>
                </el-form-item>
                <el-form-item label="入住人数">
                    <el-input v-model="form.number"></el-input>
                </el-form-item>
                 <el-form-item label="操作员">
                    <el-input v-model="form.operator" :disabled="true"></el-input>
                </el-form-item>
                     <el-form-item label="会员编号">
                    <el-input v-model="form.member_id"></el-input>
                </el-form-item>
                <el-form-item label="预定状态">
                    <el-radio v-model="cur_status" label="正常">正常</el-radio>
                    <el-radio v-model="cur_status" label="已入住" >已入住</el-radio>
                    <el-radio v-model="cur_status" label="已取消" >已取消</el-radio>
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
    name: 'order_info',
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
            add_form:{ //新增数据
              room_id: "",
              deposit: "",
              orderer: "",
              id_type: "",
              id_number: "",
              phone: "",
              arrivals_time: "",
              leave_time: "",
              number: "",
              operator: "",
              member_id:"",
              order_status:"正常",
              details: "",
            }, 
            cur_status:"",
            idx: -1,  //当前修改条目的id
            id: -1
        };
    },
    created() {
      this.getDate();
    },
    methods: {
        ToRoom_info(){
          this.$router.push({path:'/room_info',query:{searchKey:'status',searchValue:'空房'}});
        },
        getDate(){
          get(`/dao.show_orderInfo?index=${this.query.pageIndex}&${this.query.queryName}=${this.query.queryContent}`)
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
          get(`/dao.show_orderInfo?${query_name}=${query_content}`)
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
          post(`/dao.add_orderInfo?room_id=${this.add_form.room_id}`+
                `&deposit=${this.add_form.deposit}`+
                `&orderer=${this.add_form.orderer}`+
                `&id_type=${this.add_form.id_type}`+
                `&id_number=${this.add_form.id_number}`+
                `&phone=${this.add_form.phone}`+
                `&arrivals_time=${this.add_form.arrivals_time}`+
                `&leave_time=${this.add_form.leave_time}`+
                `&number=${this.add_form.number}`+
                
                `&member_id=${this.add_form.member_id}`+
                `&order_status=${this.add_form.order_status}`+
                `&details=${this.add_form.details}
                `
          )
          .then( data =>{
            if(data.code === 200){
              this.addVisible =  false;
              this.$message.success(`新增一条数据成功`);
              this.getDate();
            }else{
              this.$message.error(`预定状态必须是 空房 才能修改状态`);
            }
          })
        },

        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;  //当前行
            this.cur_status = row.order_status; //单选按钮的选择
            this.editVisible = true;
        },

        // 保存编辑
        saveEdit() {
          let curEdit_row = this.form;
          post(`/dao.update_OrderInfo?order_id=${curEdit_row.order_id}`+
                `&room_id=${curEdit_row.room_id}`+
                `&deposit=${curEdit_row.deposit}`+
                `&orderer=${curEdit_row.orderer}`+
                `&id_type=${curEdit_row.id_type}`+
                `&id_number=${curEdit_row.id_number}`+
                `&phone=${curEdit_row.phone}`+
                `&arrivals_time=${curEdit_row.arrivals_time}`+
                `&leave_time=${curEdit_row.leave_time}`+
                `&number=${curEdit_row.number}`+
                `&operator=${curEdit_row.operator}`+
                `&member_id=${curEdit_row.member_id}`+
                `&order_status=${this.cur_status}`+
                `&details=${curEdit_row.details}
                `
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
