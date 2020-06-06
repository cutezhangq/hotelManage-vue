<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础信息管理
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
                <!-- 搜索 关键词 -->
                <el-select v-model="query.queryName" placeholder="关键词" class="handle-select mr10">
                    <el-option key="1" label="会员ID" value="member_id"></el-option>
                    <el-option key="2" label="姓名" value="name"></el-option>
                    <el-option key="3" label="性别" value="sex"></el-option>
                    <el-option key="4" label="密码" value="password"></el-option>
                    <el-option key="5" label="电话" value="phone"></el-option>
                    <el-option key="6" label="地址" value="address"></el-option>
                    <el-option key="7" label="Email" value="Email"></el-option>
                    <el-option key="8" label="积分" value="integral"></el-option>
                    <el-option key="9" label="级别" value="level"></el-option>
                    <el-option key="10" label="最后入住时间" value="check_in_time"></el-option>
                    <el-option key="11" label="最后预定时间" value="scheduled_time"></el-option>
                    <el-option key="12" label="备注" value="details"></el-option>
                    <el-option key="13" label="——全部——" value="0"></el-option>
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
                <el-table-column prop="member_id" label="会员ID" width="70" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="sex" label="性别" align="center"></el-table-column>
                <el-table-column prop="password" label="密码" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" align="center"></el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column prop="email" label="Email" align="center"></el-table-column>
                <el-table-column prop="integral" label="积分" align="center"></el-table-column>
                <el-table-column prop="level" label="级别" align="center"></el-table-column>
                <el-table-column prop="check_in_time" label="最后入住时间" width="120" align="center"></el-table-column>
                <el-table-column prop="scheduled_time" label="最后预定时间" width="120" align="center"></el-table-column>
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
        <el-dialog title="新增" :visible.sync="addVisible" :rules="rules" width="30%">
            <el-form ref="form" :model="add_form" label-width="70px">
                <el-form-item label="姓名">
                    <el-input v-model="add_form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="add_form.sex"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="add_form.password"></el-input>
                </el-form-item>
                 <el-form-item label="电话" prop="phone">
                    <el-input v-model="add_form.phone"></el-input>
                </el-form-item>
                 <el-form-item label="地址">
                    <el-input v-model="add_form.address"></el-input>
                </el-form-item>
                 <el-form-item label="Email" prop="email">
                    <el-input v-model="add_form.email"></el-input>
                </el-form-item>
                 <el-form-item label="积分">
                    <el-input v-model="add_form.integral"></el-input>
                </el-form-item>
                 <el-form-item label="级别">
                    <el-input v-model="add_form.level"></el-input>
                </el-form-item>
                 <el-form-item label="最后入住时间" prop="time0">
                    <el-input v-model="add_form.check_in_time"></el-input>
                </el-form-item>
                 <el-form-item label="最后预定时间" prop="time1">
                    <el-input v-model="add_form.scheduled_time"></el-input>
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
        <el-dialog title="编辑" :visible.sync="editVisible" :rules="rules" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="会员ID">
                    <el-input v-model="form.member_id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                 <el-form-item label="电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                 <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                 <el-form-item label="Email" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                 <el-form-item label="积分">
                    <el-input v-model="form.integral"></el-input>
                </el-form-item>
                 <el-form-item label="级别">
                    <el-input v-model="form.level"></el-input>
                </el-form-item>
                 <el-form-item label="最后入住时间" prop="time0">
                    <el-input v-model="form.check_in_time"></el-input>
                </el-form-item>
                 <el-form-item label="最后预定时间" prop="time1">
                    <el-input v-model="form.scheduled_time"></el-input>
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
import { fetchData } from '@/api/index';

export default {
    name: 'member_info',
    data() {
        let reg_phone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        let is_phone = (rule,value,callback)=>{
          if(!reg_phone.test(value)){
             return callback( new Error(`请输入正确的电话号码`))
          }else{
            callback()
          }
        };

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
              name: "",
              sex: "",
              password: "",
              phone: "",
              address: "",
              email: "",
              integral: "",
              level: "",
              check_in_time: "",
              scheduled_time: "",
              details: "",
            }, 
            idx: -1,  //当前修改条目的id
            id: -1,
            rules: {
              phone:[
                 { required: true, message: '电话号码不能为空', trigger: 'blur' },
                 { min: 7, max: 11, message: '长度在 7 到 11 个字符', trigger: 'blur' },
                 { validator:is_phone}
              ],
              
            }
        };
    },
    created() {
      this.getDate();
    },
    watch:{
      form: function(){
        // let reg_phone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
        // this.form.phone = this.form.phone.match(reg_phone);
        
      }
    },
    methods: {
        
        //获取roomType数据
        getDate(){
          get(`/dao.show_memberInfo?index=${this.query.pageIndex}&${this.query.queryName}=${this.query.queryContent}`)
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
          get(`/dao.show_memberInfo?${query_name}=${query_content}`)
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
          post(`/dao.add_memberInfo?name=${this.add_form.name}`+
                `&sex=${this.add_form.sex}`+
                `&password=${this.add_form.password}`+
                `&phone=${this.add_form.phone}`+
                `&address=${this.add_form.address}`+
                `&email=${this.add_form.email}`+
                `&integral=${this.add_form.integral}`+
                `&level=${this.add_form.level}`+
                `&check_in_time=${this.add_form.check_in_time}`+
                `&scheduled_time=${this.add_form.scheduled_time}`+
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

        //删除一条数据
        delOneDate(index){
          let cur_id = this.tableData[index].member_id;
          get(`/dao.del_memberInfo?member_id=${cur_id}`)
          .then(data =>{
            if(data.code === 200){
              this.$message.error(`删除了${this.tableData[index].name},1条数据`);
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
                  str += this.multipleSelection[i].name + ' ';
                  strIds += this.multipleSelection[i].member_id + ',';
              }
              //发送批量删除请求
              get(`/dao.del_memberInfo?member_id=${strIds}`)
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
          post(`/dao.update_memberInfo?member_id=${curEdit_row.member_id}`+
                `&name=${curEdit_row.name}`+
                `&sex=${curEdit_row.sex}`+
                `&password=${curEdit_row.password}`+
                `&phone=${curEdit_row.phone}`+
                `&address=${curEdit_row.address}`+
                `&email=${curEdit_row.email}`+
                `&integral=${curEdit_row.integral}`+
                `&level=${curEdit_row.level}`+
                `&check_in_time=${curEdit_row.check_in_time}`+
                `&scheduled_time=${curEdit_row.scheduled_time}`+
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
