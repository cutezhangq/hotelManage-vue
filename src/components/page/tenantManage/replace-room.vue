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
                 <!-- <el-tooltip content="只能查询还未离店的入住订单" placement="top">
                    <el-button
                    type="info"
                    icon="el-icon-info"
                    class="handle-del mr10"
                >备注</el-button>
                 </el-tooltip> -->
                <!-- 搜索 关键词 -->
                <el-select v-model="query.queryName" placeholder="关键词" class="handle-select mr10">
                    <el-option key="1" label="入住单号" value="checkin_id"></el-option>
                    <el-option key="2" label="旧房间号" value="old_room_id"></el-option>
                    <el-option key="3" label="新房间号" value="new_room_id"></el-option>
                    <el-option key="4" label="押金" value="deposit"></el-option>
                    <el-option key="5" label="入住价格" value="checkin_price"></el-option>
                    <el-option key="6" label="客户姓名" value="checkiner"></el-option>
                    <el-option key="7" label="证件类别" value="id_type"></el-option>
                    <el-option key="9" label="证件号码" value="id_number"></el-option>
                    <el-option key="10" label="联系电话" value="phone"></el-option>
                    <el-option key="11" label="抵店时间" value="arrivals_time"></el-option>
                    <el-option key="12" label="离店时间" value="leave_time"></el-option>
                    <el-option key="13" label="入住人数" value="number"></el-option>
                    <el-option key="14" label="操作员" value="operator"></el-option>
                    <el-option key="15" label="会员编号" value="member_id"></el-option>
                    <el-option key="16" label="会员价格" value="member_price"></el-option>
                    <el-option key="17" label="是否提供早餐" value="breakfast"></el-option>
                    <el-option key="18" label="是否定时叫醒" value="wake"></el-option>
                    <el-option key="19" label="是否是预定转入住" value="order_to"></el-option>
                    <el-option key="20" label="——全部——" value="0"></el-option>
                </el-select>
                <el-input v-model="query.queryContent" placeholder="输入搜索信息..." class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <!-- 表格的表头：表内容通过prop绑定数据 -->
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="checkin_id" label="入住单号" align="center"></el-table-column>
                <el-table-column prop="room_id" label="旧房间号" align="center"></el-table-column>
                <el-table-column prop="new_room_id" label="新房间号" align="center"></el-table-column>
                <el-table-column prop="floor_id" label="楼层号" align="center"></el-table-column>
                <el-table-column prop="room_type_id" label="房间类型ID" align="center"></el-table-column>
                <el-table-column prop="type" label="房间类型" align="center"></el-table-column>
                <el-table-column prop="deposit" label="押金" align="center"></el-table-column>
                <el-table-column prop="checkin_price" label="入住价格" align="center"></el-table-column>
                <el-table-column prop="vip_price" label="VIP价格" align="center"></el-table-column>
                <el-table-column prop="discounted_price" label="折后价" align="center"></el-table-column>
                <el-table-column prop="checkiner" label="客户姓名" align="center"></el-table-column>
                <el-table-column prop="id_type" label="证件类别" align="center"></el-table-column>
                <el-table-column prop="id_number" label="证件号码" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                <el-table-column prop="arrivals_time" label="抵店时间" align="center"></el-table-column>
                <el-table-column prop="leave_time" label="离店时间" align="center"></el-table-column>
                <el-table-column prop="number" label="入住人数" align="center"></el-table-column>
                <el-table-column prop="operator" label="操作员" align="center"></el-table-column>
                <el-table-column prop="member_id" label="会员编号" align="center"></el-table-column>
                <el-table-column prop="member_price" label="会员价格" align="center"></el-table-column>
                <el-table-column prop="breakfast" label="是否提供早餐" align="center"></el-table-column>
                <el-table-column prop="wake" label="是否定时叫醒" align="center"></el-table-column>
                <el-table-column prop="order_to" label="是否是预定转入住" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >换房</el-button>
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

        <!-- 编辑 换房弹出框 -->
        <el-dialog title="换房" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="入住单号">
                    <el-input v-model="form.checkin_id" :disabled="true"></el-input>
                </el-form-item>
                 <el-form-item label="更换后客房编号">
                    <el-input v-model="form.new_room_id"></el-input>
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
    name: 'replace-room',
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
            cur_status:"",
            idx: -1,  //当前修改条目的id
            id: -1
        };
    },
    created() {
      this.getDate();
    },
    methods: {
        getDate(){
          get(`/dao.show_replaceReplaceRoom?index=${this.query.pageIndex}&${this.query.queryName}=${this.query.queryContent}`)
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
          get(`/dao.show_replaceReplaceRoom?${query_name}=${query_content}`)
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
          post(`/dao.replaceRoom?checkin_id=${curEdit_row.checkin_id}`+
                `&new_room_id=${curEdit_row.new_room_id}
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
