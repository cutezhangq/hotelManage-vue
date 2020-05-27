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
                 <el-tooltip content="暂未开放，请前往客房管理查看" placement="top">
                    <el-button
                    type="primary"
                    icon="el-icon-office-building"
                    class="handle-del mr10"
                >查看客房信息</el-button>
                </el-tooltip>
                 <el-tooltip content="只能查询还未离店的入住订单。1为是，0为否" placement="top">
                    <el-button
                    type="info"
                    icon="el-icon-info"
                    class="handle-del mr10"
                >备注</el-button>
                 </el-tooltip>
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
                <el-table-column prop="old_room_id" label="旧房间号" align="center"></el-table-column>
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
                <el-table-column prop="member_price" label="会员价格" align="center"></el-table-column>
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

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="add_form" label-width="70px">
                 <el-form-item label="旧房间号">
                    <el-input v-model="add_form.old_room_id"></el-input>
                </el-form-item>
                 <el-form-item label="新房间号">
                    <el-input v-model="add_form.new_room_id"></el-input>
                </el-form-item>
                 <el-form-item label="押金">
                    <el-input v-model="add_form.deposit"></el-input>
                </el-form-item>
                 <el-form-item label="入住价格">
                    <el-input v-model="add_form.checkin_price"></el-input>
                </el-form-item>
                <el-form-item label="客户姓名">
                    <el-input v-model="add_form.checkiner"></el-input>
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
               <el-form-item label="会员编号">
                    <el-input v-model="add_form.member_id"></el-input>
                </el-form-item>
                 <el-form-item label="是否提供早餐">
                    <el-input v-model="add_form.breakfast"></el-input>
                </el-form-item>
                <el-form-item label="是否定时叫醒">
                    <el-input v-model="add_form.wake"></el-input>
                </el-form-item>
                <el-form-item label="是否是预定转入住">
                    <el-input v-model="add_form.order_to"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {get,post} from '@/utils/request';

export default {
    name: 'checkin_info',
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
              old_room_id: "",
              new_room_id: "",
              deposit: "",
              checkin_price: "",
              checkiner: "",
              id_type:"",
              id_number:"",
              phone: "",
              arrivals_time: "",
              leave_time: "",
              number: "",
              member_id:"",
              breakfast:"",
              wake: "",
              order_to:"",
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
        getDate(){
          get(`/dao.showCheckinInfo?index=${this.query.pageIndex}&${this.query.queryName}=${this.query.queryContent}`)
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
          get(`/dao.showCheckinInfo?${query_name}=${query_content}`)
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
          post(`/dao.add_checkinInfo?old_room_id=${this.add_form.old_room_id}`+
                `&new_room_id=${this.add_form.new_room_id}`+
                `&deposit=${this.add_form.deposit}`+
                `&checkin_price=${this.add_form.checkin_price}`+
                `&checkiner=${this.add_form.checkiner}`+
                `&id_type=${this.add_form.id_type}`+
                `&id_number=${this.add_form.id_number}`+
                `&phone=${this.add_form.phone}`+
                `&arrivals_time=${this.add_form.arrivals_time}`+
                `&leave_time=${this.add_form.leave_time}`+
                `&number=${this.add_form.number}`+
                `&member_id=${this.add_form.member_id}`+
                `&breakfast=${this.add_form.breakfast}`+
                `&wake=${this.add_form.wake}`+
                `&order_to=${this.add_form.order_to}
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
