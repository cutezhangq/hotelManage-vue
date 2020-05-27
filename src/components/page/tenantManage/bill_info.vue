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
                >新增账单</el-button>
                <el-tooltip content="暂未开放，请前往 房客管理-入住 查看" placement="top">
                    <el-button
                    type="primary"
                    icon="el-icon-office-building"
                    class="handle-del mr10"
                >查看入住信息</el-button>
                </el-tooltip>
                <el-tooltip content="查询的是checkIn表，且时间要在范围内(leave_time要大于当前时间)" placement="top">
                    <el-button
                    type="info"
                    icon="el-icon-info"
                    class="handle-del mr10"
                >备注</el-button>
                 </el-tooltip>
                <!-- 搜索 关键词 -->
                <el-select v-model="query.queryName" placeholder="关键词" class="handle-select mr10">
                    <el-option key="1" label="账单ID" value="bill_id"></el-option>
                    <el-option key="2" label="入住单号" value="checkin_id"></el-option>
                    <el-option key="3" label="客房编号" value="room_id"></el-option>
                    <el-option key="4" label="押金" value="deposit"></el-option>
                    <el-option key="5" label="入住房间价格" value="checkin_price"></el-option>
                    <el-option key="6" label="入住天数" value="days"></el-option>
                    <el-option key="7" label="总共房费" value="accommodation_fee"></el-option>
                    <el-option key="8" label="店内消费" value="in_store_consumption"></el-option>
                    <el-option key="9" label="应收费用" value="real_income"></el-option>
                    <el-option key="10" label="客户付款" value="income"></el-option>
                    <el-option key="11" label="找零" value="return_money"></el-option>
                    <el-option key="12" label="应退押金" value="return_deposit"></el-option>
                    <el-option key="13" label="付款方式" value="pay_method"></el-option>
                    <el-option key="14" label="操作员ID" value="operator"></el-option>
                    <el-option key="15" label="详情" value="details"></el-option>
                    <el-option key="16" label="——全部——" value="0"></el-option>
                </el-select>
                <el-input v-model="query.queryContent" placeholder="输入搜索信息..." class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <!-- 表格的表头：表内容通过prop绑定数据 -->
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
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

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="add_form" label-width="70px">
                <el-form-item label="入住单号">
                    <el-input v-model="add_form.checkin_id"></el-input>
                </el-form-item>
                <el-form-item label="客房编号">
                    <el-input v-model="add_form.room_id"></el-input>
                </el-form-item>
                <el-form-item label="押金">
                    <el-input v-model="add_form.deposit"></el-input>
                </el-form-item>
                 <el-form-item label="入住房间价格">
                    <el-input v-model="add_form.checkin_price"></el-input>
                </el-form-item>
                 <el-form-item label="入住天数">
                    <el-input v-model="add_form.days"></el-input>
                </el-form-item>
                <el-form-item label="总共房费">
                    <el-input v-model="add_form.accommodation_fee"></el-input>
                </el-form-item>
                <el-form-item label="店内消费">
                    <el-input v-model="add_form.in_store_consumption"></el-input>
                </el-form-item>
                <el-form-item label="应收费用">
                    <el-input v-model="add_form.real_income"></el-input>
                </el-form-item>
                <el-form-item label="客户付款">
                    <el-input v-model="add_form.income"></el-input>
                </el-form-item>
                <el-form-item label="找零">
                    <el-input v-model="add_form.return_money"></el-input>
                </el-form-item>
                <el-form-item label="应退押金">
                    <el-input v-model="add_form.return_deposit"></el-input>
                </el-form-item>
                <el-form-item label="付款方式">
                    <el-input v-model="add_form.pay_method"></el-input>
                </el-form-item>
                <el-form-item label="操作员ID">
                    <el-input v-model="add_form.operator"></el-input>
                </el-form-item>
                 <el-form-item label="详情">
                    <el-input v-model="add_form.details"></el-input>
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
import { fetchData } from '@/api/index';

export default {
    name: 'bill_info',
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
              checkin_id: "",
              room_id: "",
              deposit: "",
              checkin_price: "",
              days: "",
              accommodation_fee: "",
              in_store_consumption: "",
              real_income: "",
              income: "",
              return_money: "",
              return_deposit: "",
              pay_method: "",
              operator: "",
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
          get(`/dao.show_billInfo?index=${this.query.pageIndex}&${this.query.queryName}=${this.query.queryContent}`)
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
          get(`/dao.show_billInfo?${query_name}=${query_content}`)
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
          post(`/dao.add_billInfo?checkin_id=${this.add_form.checkin_id}`+
                `&room_id=${this.add_form.room_id}`+
                `&deposit=${this.add_form.deposit}`+
                `&checkin_price=${this.add_form.checkin_price}`+
                `&days=${this.add_form.days}`+
                `&accommodation_fee=${this.add_form.accommodation_fee}`+
                `&in_store_consumption=${this.add_form.in_store_consumption}`+
                `&real_income=${this.add_form.real_income}`+
                `&income=${this.add_form.income}`+
                `&return_money=${this.add_form.return_money}`+
                `&return_deposit=${this.add_form.return_deposit}`+
                `&pay_method=${this.add_form.pay_method}`+
                `&operator=${this.add_form.operator}`+
                `&details=${this.add_form.details}
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
