<template>
  <div>
    <el-form  ref="queryData"  :inline="true" :model="queryData" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="queryData.type"  clearable  placeholder="请选择来源类型">
          <el-option  v-for="item in SelectData" :key=item.value :label=item.label  :value=item.value></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click=" onSubmit(queryData, undefined, undefined, queryData)">查询</el-button>
        <el-button type="primary" @click="dialogTableVisible=true">创建</el-button>
        <a id="dLink"  style="display:none;"></a>
        <el-button @click="outputExcel">导出EXCEL</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="学生来源" :visible.sync="dialogTableVisible">
      <el-form ref="createData" :model="createData" :rules="createDatarule" label-width="80px" center >
        <el-form-item label="来源类型" prop="type">
          <el-select v-model="createData.type"  clearable   placeholder="请选择来源类型">
            <el-option  v-for="item in SelectData" :key=item.value :label=item.label  :value=item.value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体来源" prop="source">
          <el-input v-model="createData.source" placeholder="具体来源"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogTableVisible=false">取消</el-button>
          <el-button type="primary" @click="Commit('createData',createData)">确定</el-button>
        </el-form-item>
      </el-form>
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
        prop="type"

        label="来源类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="source"
        label="具体来源">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button   @click="Updata(scope.row)"  type="text" size="small">更新</el-button>
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
    <el-dialog title="学生来源" :visible.sync="dialogUpdata">
      <el-form ref="updataData" :model="updataData"  label-width="80px" center >
        <el-form-item label="来源类型">
            <el-input :value="getIdentity" readonly></el-input>
        </el-form-item>
        <el-form-item label="具体来源">
          <el-input v-model="updataData.source" placeholder="具体来源"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogUpdata=false">取消</el-button>
          <el-button type="primary" @click="CommitUpdataData(updataData)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "AboutStudent",
    data(){
      return{
        //查询字段
        queryData:{
          type:'',

        },
        pageData: {},
        totalPage: 0,
        totalItems: 0,
        showItems: 15,
        currentPage: 1,
        //类型数据
        SelectData:[
          {value:'0',label:'社区'},
          {value:'1',label:'小学'},
          {value:'2',label:'幼儿园'},
          {value:'3',label:'网络'},
          {value:'4',label:'转介绍'},
          {value:'5',label:'市调'},
          {value:'6',label:'直访'}
        ],
       //校验
        createDatarule:{
          type:[
            {required:true,message:'来源未填',trigger:'change'}
          ],
          source:[
            {required:true,message:'具体来源未填',trigger:'blur'}
          ]
        },
        //创建字段
        createData:{
          type:'',
          source:''
        },
        //更新字段
        updataData:{

        },
        scope:{
          type:'',
        },
        //默认弹窗是关闭的
        dialogTableVisible:false,
        dialogUpdata:false,

      }
    },

    computed:{
      getIdentity: function () {
        return this.scope.type;
      },
    },
    created(){
      this.loadData(1, undefined)
    },
    watch:{
      //分页的修改页数，触发数据数据函数
      currentPage: function (newCurrentPage) {
        this.loadData(newCurrentPage, undefined, this.queryData);
      },
      pageData:function () {
        this.pageData.list.forEach(item=>{
          item['type'] = this.$store.state.typeBH[item['type']];
        })
      }
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
//查询函数
      /*
    * 表单验证函数
    */
      onSubmit(formName, no, pageSize, queryData){
        this.loadData(no, pageSize, queryData);
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
        this.$http.get("/source?_no=" + no + str )
          .then(response => {
            this.pageData = this.GLOBAL.deepCopy(response.data)
            this.pageData.list.forEach(item => {
              //item['name'] = this.$store.state.supplyMap.get(item['sid'])
            })
            this.totalPage = this.pageData.totalPage
            this.totalItems = this.pageData.total
            this.showItems = this.pageData.list.length
          }).catch(error => {
          console.log(error.response);
          this.errorTips(error.response, '获取来源错误');
        })
      },

    //添加函数
      Commit:function (formName,createData) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data=JSON.stringify(
              {
                type:createData.type,
                source:createData.source,
              }
            )
            let config={headers:{
                "Content-type":"application/json;charset=utf-8",
              }}
            this.$http.post('/source',data,config) //todo bug 500
              .then(response=>{
                this.openTips('创建成功','','success')
                this.loadData(1,undefined)
                this.dialogTableVisible = false

              }).catch(err =>{
              console.log(err);
              this.errorTips(err.response, '创建失败');
            })
          } else {
            return false;
          }
        });


      },
    //该函数从更新那里拿到该行的来源类型  以便在弹窗中显示
    Updata:function(scopeType){
      //打开弹窗
    this.dialogUpdata=true;
    this.scope.type=scopeType.type;
    this.updataData=scopeType;
    },

    //更新提交函数
    CommitUpdataData:function () {
         console.log(this.updataData)
      let data=JSON.stringify(
        {

          source:this.updataData.source,
        }
      )
      let config={headers:{
          "Content-type":"application/json;charset=utf-8",
        }}
        this.$http.put('/source/'+ this.updataData.id,data,config)
          .then(response => {
            this.openTips('更新成功','','success')
            this.dialogUpdata=false;; //关闭面板
            this.loadData(1,undefined); //刷新数据
          }).catch(error => {
          this.errorTips(error.response, '更新出错');
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
          urls.push("/source?_no=" + i+"&_pageSize="+5 + str )
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
            <th>类别</th>
            <th>具体来源</th>

          </tr>
          </thead><tbody>`
            for (let i=0;i<excelData.length;i++){
              excelData[i].type = this.$store.state.typeBH[excelData[i].type];
              sTable+=`
                   <tr>
                  <td>${i+1}</td>
                  <td>${excelData[i].type}</td>
                  <td>${excelData[i].source}</td>
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
            document.getElementById("dLink").download = '学生来源信息.xls';
            document.getElementById("dLink").click();
          })
      },
      outputExcel:function () {
        this.getAll(1,undefined,this.queryData)
      },

  }
  }
</script>

<style scoped>

</style>
