<template>
  <div>
    <el-form  ref="queryData"   :inline="true" :model="queryData"  :rules="rulesAddForm"  class="demo-form-inline">
      <el-form-item prop="name">
        <el-input v-model="queryData.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
      <el-input v-model="queryData.phone" placeholder="手机号"></el-input>
    </el-form-item>
      <el-form-item prop="school">
        <el-input v-model="queryData.school" placeholder="学校"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('queryData',undefined,undefined,queryData)">查询</el-button>
        <el-button type="primary" @click="dialogTableVisible=true">创建</el-button>
        <a id="dLink"  style="display:none;"></a>
        <el-button @click="outputExcel">导出EXCEL</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="创建员工(仅校长可操作)" :visible.sync="dialogTableVisible">
      <el-form ref="createData" :model="createData"  :rules="rulesCreateForm" label-width="80px" center>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="createData.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="createData.phone" placeholder="手机号"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="Commit('createData',createData)">提 交</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="pageData.list"
      border

      style="width: 100%">
      <el-table-column
        :index="indexMethod"
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"

        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button @click="Delete(scope.row)" type="danger" size="mini">删除</el-button>
          <el-button @click="open(scope.row)" type="success"size="mini">更新</el-button>
          <el-button @click='resetPassword(scope.row)' type="primary"size="mini">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
    <el-pagination
      :page-count="totalPage"
      @current-change="currentChange"
      :current-page.sync="currentPage"
      :page-size="15"
      layout="total, prev, pager, next"
      :total="totalItems">
    </el-pagination>
    </div>



    <el-dialog
      title="更新"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form  label-width="80px" :model="createData">
        <el-form-item label="姓名">
          <el-input v-model="createData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="createData.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button @click="updata" type="primary">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "EmployeeManage",
    data(){
      return{
        //查询字段
        queryData:{
          name:'',
          phone:'',
          school:'',
          ascFlag:false,

        },dialogVisible:false,
        queryFlag: false,
        pageData: {},
        totalPage: 0,
        totalItems: 0,
        showItems: 15,
        currentPage: 1,
        //默认添加
        dialogTableVisible: false,
        //添加数据的内容
        createData:{
            name:'',
            phone:'',

        },
        //验证查询字段
        rulesAddForm:{
          name: [
            {required: false, min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          phone:[
            {validator : this.GLOBAL.formValidator.phonePass, trigger : 'blur'}
          ],
        },
        rulesCreateForm:{
          name: [
            {required: true, min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          phone:[
            {validator : this.GLOBAL.formValidator.nophonePass, trigger : 'blur'},
          ],

        }

      }

    },
    created(){
      this.loadData(1, undefined)
    },
    watch:{
      //分页的修改页数，触发数据数据函数
      currentPage: function (newCurrentPage) {
        this.loadData(newCurrentPage, undefined, this.queryData);
      },
    },
    methods:{
      /*
     * 错误提示信息
     */
      errorTips: function (res, type) {
        if (res.status === 401) {
          this.openTips(type, '缺少权限', 'error');
        } else if (res.status === 402) {
          this.openTips('登录状态丢失，请重新登录', '', 'error');
        } else if(res.status === 500) {
          this.openTips(type, '服务器问题，请稍后再试', 'error');
        } else {
          this.openTips(type, res.data, 'error');
        }
      },
      updata:function(){
        let data=JSON.stringify({
          name:this.createData.name,
          phone:this.createData.phone
        })
        let config={headers:{
            "Content-type":"application/json;charset=utf-8",
          }}

        this.$http.put('/employee/'+this.createData.id,data,config) //todo bug 500
          .then(response=>{
            this.openTips('更新成功','','success')
            this.loadData(1,undefined)
            this.dialogVisible = false
          }).catch(err =>{
          console.log(err);
          this.errorTips(err.response, '更新失败');
        })

      },
      open:function(data){
        this.dialogVisible = true
        this.createData=data
      },
      //查询函数
      /*
    * 表单验证函数
    */
      onSubmit(formName, no, pageSize, queryData){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loadData(no, pageSize, queryData);
          } else {
            return false;
          }
        });
      },

      /*
       * 查询函数
       */
      loadData: function (no = 1, pageSize = 15, queryData) {
        this.currentPage = no;
        let ascFlag=false;
        let str='&ascFlag'+"="+ascFlag;
        for (let key in queryData)
        {
          if (queryData[key])
          {
              if(key)
              {
                str+="&"+key+"="+queryData[key]
              }
          }
        }
        this.$http.get("/employee?_no=" + no + str )
          .then(response => {
            this.pageData = this.GLOBAL.deepCopy(response.data)
            this.pageData.list.forEach(item => {
              //item['name'] = this.$store.state.supplyMap.get(item['sid'])
            })
            this.totalPage = this.pageData.totalPage
            this.totalItems = this.pageData.total
            this.showItems = this.pageData.list.length
          }).catch(error => {

          this.errorTips(error.response, '获取员工错误');
        })
      },


      //添加员工的提交函数
      Commit:function (formName,createData) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data=JSON.stringify(
              {
                name:createData.name,
                phone:createData.phone,
                mid:createData.mid,
              }
            )
            let config={headers:{
                "Content-type":"application/json;charset=utf-8",
              }}
            this.$http.post('/employee',data,config) //todo bug 500
              .then(response=>{
                this.openTips('更新成功','','success')
                this.loadData(1,undefined)
                this.dialogTableVisible = false

              }).catch(err =>{
              console.log(err);
              this.errorTips(err.response, '更新失败');
            })
          } else {
            return false;
          }
        });

      },
      //删除员工函数
        Delete:function (key) {
          if (confirm('是否删除员工:'+key.name+'?')){
            this.$http.delete('employee/'+key.id)
              .then(response=>{
                this.openTips('删除员工', '', 'success')
                if(this.pageData.list.length==1)
                {
                  location.reload()
                }
                else {
                  this.loadData();
                }


              }).catch(err =>{
              console.log(err);
              this.errorTips(err.response, '删除员工');
            })
          }
        },

      open3() {
        this.$notify({
          title: '成功',
          message: '密码重置成功',
          type: 'success'
        });
      },
      //密码重置
      resetPassword:function(data){
        let config={headers:{
            "Content-type":"application/json;charset=utf-8",
          }}
        this.$http.put('/user/employee/pwd/reset/'+data.id,config)
          .then(response=>{
              this.open3()
          }).catch(err =>{
          console.log(err);
          this.errorTips(err.response, '当前员工不存在');
        })
      },



      //用在分页组件上的，以下两个都是
      currentChange: function (index) {
        this.currentPage = index
      },
      indexMethod: function (index) {
        return index + (this.currentPage - 1) * 15 + 1
      },




      getAll:function (no=1,pageSize=100,queryData) {
        let excelData=[]
        let num=Math.ceil(this.totalItems/5)
        let ascFlag=false;
        let str='&ascFlag'+"="+ascFlag;
        for (let key in queryData)
        {
          if (queryData[key])
          {
            if(key)
            {
              str+="&"+key+"="+queryData[key]
            }
          }
        }
        let urls=[];
        for (let i=1;i<=num;i++){
          urls.push("/employee?_no=" + i +"&_pageSize="+5+ str)
        }
        let requests=urls.map(url=>{
          return this.$http.get(url)
        })
        this.$http.all(requests)
          .then((response)=>{
            for(let i=0;i<response.length;i++){
              response[i].data.list.forEach(item=>{
                excelData.push(item)
              })
            }
            let sTable=`<thead>
            <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>手机号</th>
            <th>学校</th>
          </tr>
          </thead><tbody>`
            for (let i=0;i<excelData.length;i++){
              sTable+=`
                   <tr>
                  <td>${i+1}</td>
                  <td>${excelData[i].name}</td>
                  <td>${excelData[i].phone}</td>
                  <td>${excelData[i].school}</td>
                  </tr>
                  `
            }
            sTable+=`</tbody>`
            let uri = 'data:application/vnd.ms-excel;base64,'
              , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
              , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
              , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
            let ctx = { worksheet:'Worksheet', table:sTable }
            document.getElementById("dLink").href = uri + base64(format(template, ctx));
            document.getElementById("dLink").download = '员工信息.xls';
            document.getElementById("dLink").click();
          })
      },
      outputExcel:function () {
        this.getAll(1,undefined,this.queryData)
      },
    },

  }
</script>

<style scoped>
.dialog-footer{
  display: block;
  text-align: center;
}
</style>
