<template>
  <div>
    <el-form :inline="true" :model="queryData" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="queryData.name" placeholder="课程名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="试听时间下限" v-model="queryData.audiTimeLow" ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="试听时间上限" v-model="queryData.audiTimeHigh" ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryData.sids" placeholder="学员id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.site" placeholder="地点"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(undefined,undefined,queryData)">查询</el-button>
        <el-button type="primary" @click="dialogVisibleAdd=true">添加</el-button>
        <a id="dLink"  style="display:none;"></a>
        <el-button @click="outputExcel">导出EXCEL</el-button>
      </el-form-item>
    </el-form>

<!--班级添加与更新-->

    <el-dialog
      center
      modal
      :close-on-click-modal = false
      modal-append-to-body
      :visible="dialogVisibles||dialogVisibleAdd"
      v-if="dialogVisibles||dialogVisibleAdd"
    >
      <div slot="title" class="dialog-title">
        <p >{{ dialogVisibles ? "更新学生" : "添加学生" }}</p>
      </div>
      <el-form ref="createData" :model="createData"  label-width="80px" center class="demo-ruleForm">
        <el-form-item label="班级名"  prop="name">
          <el-input v-model="createData.name" clearable placeholder="班级名"></el-input>
        </el-form-item>

        <el-form-item label="总容量" prop="total">
          <el-input v-model="createData.total" clearable placeholder="总容量"></el-input>
        </el-form-item>
        <el-form-item label="地点" prop="site">
          <el-input v-model="createData.site" clearable placeholder="地点"></el-input>
        </el-form-item>
        <el-form-item label="添加学员" >
          <el-button type="primary"  @click="dialogTableVisibleaddStudent=true">添加学员</el-button>
        </el-form-item>
        <el-form-item label="试听时间" prop="auditionTime">
          <el-date-picker type="date"  clearable  placeholder="试听时间" v-model="createData.auditionTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeUpdateEmp">取 消</el-button>
    <el-button type="primary" v-if="dialogVisibleAdd"   @click="Commit(createData)">添 加</el-button>
    <el-button type="primary" v-if="dialogVisibles"  @click="updataCommit">更 新</el-button>

  </span>
    </el-dialog>

  <!--学员的添加-->
    <el-dialog
      title="学员添加"
      :visible.sync="dialogTableVisibleaddStudent"
      width="80%"
     >
      <el-form  ref="queryaddData" :inline="true" :model="queryaddData" :rules="rulesAddForm" class="demo-form-inline">
        <el-form-item prop="name">
          <el-input v-model="queryaddData.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-input  placeholder="年龄下限" v-model="queryaddData.ageLow" style="width: 100%;"></el-input>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-input  placeholder="年龄上限" v-model="queryaddData.ageHigh" style="width: 100%;"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryaddData.sex"   clearable   placeholder="请选择性别">
            <el-option  v-for="item in sexData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-col :span="11">
            <el-date-picker type="date" placeholder="出生日期下限" v-model="queryaddData.birthdayLow" style="width: 100%;"></el-date-picker>        </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="出生日期上限" v-model="queryaddData.birthdayHigh" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-date-picker type="date" placeholder="创建时间下限" v-model="queryaddData.ctimeLow" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="创建时间上限" v-model="queryaddData.ctimeHigh" style="width: 100%;"></el-date-picker>
        </el-form-item>

        <el-form-item  prop="sourceIdStr">
          <Select :id="queryaddData.sourceIdStr" v-model="queryData.sourceIdStr"  v-on:sendSid="AchangeSid"  placeholder="请选择学员来源" ></Select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="queryaddData.stateStr"   clearable   placeholder="请选择学员状态">
            <el-option  v-for="item in StateData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryaddData.degreeSeyStr"   clearable   placeholder="请选择重要程度">
            <el-option  v-for="item in DegreeData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryaddData.salesStageStr"   clearable   placeholder="请选择销售阶段">
            <el-option  v-for="item in SalesData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="意向日期下限" v-model="queryaddData.expectedDateLow" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="意向日期上限" v-model="queryaddData.expectedDateHigh" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="签约日期下限" v-model="queryaddData.contractDateLow" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker type="date" placeholder="签约日期上限" v-model="queryaddData.contractDateHigh" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmita('queryaddData',undefined,undefined,queryaddData)">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="pageData.list"
        border
        :default-sort = "{prop: 'name', order: 'descending'}"
        style="width: 100%">
        <el-table-column
          :index="indexMethod1"
          type="index"
          width="50" label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="90">
        </el-table-column>
        <el-table-column
          prop="ctime"

          label="录入时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ename"
          label="录入人员">
        </el-table-column>
        <el-table-column
          prop="stateZH"
          label="学生状态">
        </el-table-column>
        <el-table-column
          prop="degreeZH"
          label="重要程度">
        </el-table-column>
        <el-table-column
          prop="salesStageZH"
          label="销售阶段">
        </el-table-column>
        <el-table-column
          prop="expectedDate"
          label="意向日期">
        </el-table-column>

        <el-table-column
          prop="age"

          label="年龄">
        </el-table-column>
        <el-table-column
          prop="contractDate"
          label="签约日期">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="50">
          <template slot-scope="scope">
            <input type="checkbox" :id='scope.row.id' :value="(scope.row.id)" v-model="stateIdStr"><label class="add">添加</label>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-count="totalPage1"
          @current-change="currentChange1"
          :current-page.sync="currentPage1"
          :page-size="15"
          layout="total, prev, pager, next"
          :total="totalItems1">
        </el-pagination>
      </div>
      <el-button  class="fixed"  type="primary" @click="dialogTableVisibleaddStudent=false">确定</el-button>
    </el-dialog>


    <!--个人详细信息-->
    <el-dialog
      :title="information"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <p><span>地址:</span>{{this.titleData.addr}}</p>
      <p><span>父母姓名::</span>{{this.titleData.parentName}}</p>
      <p><span>手机号:</span>{{this.titleData.phone}}</p>
      <p><span>备用号码:</span>{{this.titleData.alternateNumber}}</p>
      <p><span>微信号:</span>{{this.titleData.wechat}}</p>
      <p><span>生日:</span>{{this.titleData.birthday}}</p>
      <p><span>年龄:</span>{{this.titleData.age}}</p>
      <p><span>性别:</span>{{this.titleData.sex}}</p>
      <p><span>创建时间:</span>{{this.titleData.ctime}}</p>
      <p><span>学生状态:</span>{{this.titleData.state}}</p>
      <p><span>学生来源:</span>{{this.titleData.sourceId}}</p>
      <p><span>重要程度:</span>{{this.titleData.degree}}</p>
      <p><span>销售阶段:</span>{{this.titleData.salesStage}}</p>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
     </span>
    </el-dialog>

    <el-table
      :data="tableData.list"
      border
      style="width: 100%"

    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item v-for="item  in  props.row.stuList" :key="item.addr" >
              <span   @mousedown="showInformation(item)"  >{{ item.name }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        :index="indexMethod"
        type="index"
        width="50" label="序号">
      </el-table-column>
      <el-table-column
        prop="name"

        label="班级名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="auditionTime"
        label="试听时间"

        width="120">
      </el-table-column>
      <el-table-column
        prop="opName"
        label="创建人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="total"
        label="总量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="newtotal"

        label="当前人数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="site"
        label="地点"
        width="750">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">更新</el-button>
          <el-button @click="Delete(scope.row)" type="text" size="small">删除</el-button>
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
  </div>
</template>

<style>

</style>

<script>
  import Select from '../components/Select'
  export default {
    components:{Select},
    data() {
      return {
        //查询字段
        queryaddData:{
          sex:'',
          name:'',
          nickname:'',
          ageLow:'',
          ageHigh:'',
          parentName:'',
          phone:'',
          alternateNumber:'',
          wechat:'',
          addr:'',
          sourceIdStr:'',
          stateStr:'',
          degreeSeyStr:'',
          salesStageStr:'',
          ctimeLow:'',
          ctimeHigh:'',
          birthdayLow:'',
          birthdayHigh:'',
          expectedDateLow:'',
          expectedDateHigh:'',
          contractDateLow:'',
          contractDateHigh:''
        },

        queryData: {
          name: '',
          audiTimeLow: '',
          audiTimeHigh: '',
          opIdStr: '',
          total: '',
          sids: '',
          site: ''
        },
        rulesAddForm:{
          name: [
            {required: false, min: 2 ,max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          phone:[
            {validator : this.GLOBAL.formValidator.phonePass, trigger : 'blur'}
          ],
          alternateNumber:[
            {validator : this.GLOBAL.formValidator.phonePass, trigger : 'blur'}
          ],
        },
        createData:{
          name:'',
          auditionTime:'',
          total:'',
          sids:'',
          site:'',
        },
        pageData: {},
        totalPage: 0,
        totalItems: 0,
        showItems: 15,
        currentPage: 1,

        totalPage1: 0,
        totalItems1: 0,
        showItems1: 15,
        currentPage1: 1,
        tableData: {},
        titleData:{},

        //类型数据
        SelectData:[
          {value:0,label:'社区'},
          {value:1,label:'小学'},
          {value:2,label:'幼儿园'},
          {value:3,label:'网络'},
          {value:4,label:'转介绍'},
          {value:5,label:'市调'},
          {value:6,label:'直访'}
        ],
        sexData:[{value:'男',label:'男'},
          {value:'女',label:'女'}
        ],
        //学员状态
        StateData:[
          {value:0,label:'有效'},
          {value:1,label:'无效'},
          {value:2,label:'会员'}
        ],
        //学员当前id
        stateIdStr:[],
        //当前班级ID
        uodataID:'',
        //重要程度
        DegreeData:[
          {value:0,label:'重要'},
          {value:1,label:'一般'},
          {value:2,label:'不重要'}
        ],
        //销售阶段
        SalesData:[
          {value:0,label:'没有意向'},
          {value:1,label:'继续跟进'},
          {value:2,label:'试听课程'},
          {value:3,label:'成为会员'}
        ],

       //默认弹窗都是关闭的
        dialogVisible:false,
        dialogVisibleAdd:false,
        dialogVisibles:false,
        dialogTableVisibleaddStudent:false
      }
    },

   computed:{
     information:function () {
       return this.titleData.name;
     },
   },
    created(){
      this.onSubmit(undefined),
      this.loadData(1,undefined)
    },

    watch:{
      tableData:function () {
         this.tableData.list.forEach(item=>{
           item.auditionTime=this.GLOBAL.resolvectime(item.auditionTime)
           item.newtotal=item.stuList.length
         })
      },
      titleData:function () {
        this.titleData.ctime=this.GLOBAL.resolveTime(this.titleData.ctime);
        this.titleData.expectedDate=this.GLOBAL.resolvectime(this.titleData.expectedDate);
        this.titleData.birthday=this.GLOBAL.resolvectime(this.titleData.birthday);
        this.titleData.state = this.$store.state.stateBH[this.titleData.state];
        this.titleData.sourceId = this.$store.state.typeBH[this.titleData.sourceId];
        this.titleData.salesStage = this.$store.state.SalesBH[this.titleData.salesStage];
        this.titleData.degree = this.$store.state.DegreeBH[this.titleData.degree];

      },
      //分页的修改页数，触发数据数据函数
      currentPage: function (newCurrentPage) {
        this.onSubmit(newCurrentPage, undefined, this.queryData);
      },
      currentPage1: function (newCurrentPage) {
        this.loadData(newCurrentPage, undefined, this.queryData);
      },
    pageData:function () {
      this.pageData.list.forEach(item=>{
        item['stateZH'] = this.$store.state.stateBH[item.state];
        item['sourceIdZH'] = this.$store.state.typeBH[item['sourceId']];
        item['salesStageZH'] = this.$store.state.SalesBH[item['salesStage']];
        item['degreeZH'] = this.$store.state.DegreeBH[item['degree']];
        item.ctime = this.GLOBAL.resolveTime(item.ctime);
        item.birthday=this.GLOBAL.resolvectime(item.birthday);
        item.expectedDate=this.GLOBAL.resolvectime(item.expectedDate);
      })
      }
    },
    methods: {

      showInformation:function(data){
          this.dialogVisible=true;

          this.titleData=(data);
      },

     //关闭面板
      closeUpdateEmp:function(){
          this.dialogVisibleAdd=false;
          this.dialogVisibles=false;
      },
     //更新

      handleClick:function(data){
        this.dialogVisibles=true;
        this.uodataID=data.id;
        this.createData=this.GLOBAL.deepCopy(data);
        this.stateIdStr = data.sids.split(":");

      },
      //更新提交函数
      updataCommit:function(){
        let data=JSON.stringify(
          {
            name: this.createData.name,
            audiTime:this.GLOBAL.unctime(this.createData.auditionTime),
            total:parseInt(this.createData.total),
            site:this.createData.site,
            sids:this.stateIdStr.join(":")
          }
        )
        let config={headers:{
            "Content-type":"application/json;charset=utf-8",
          }}
        this.$http.put('/audiClasses/'+this.uodataID,data,config)
          .then(response=>{
            this.openTips('更新成功','','success')
            this.onSubmit(undefined)
            this.closeUpdateEmp()
          }).catch(err =>{
          console.log(err);
          this.errorTips(err.response, '更新失败');
        })
      },

      //添加班级
      Commit:function(createData){

        let data=JSON.stringify(
          {
            name: createData.name,
            auditionTime:this.GLOBAL.unctime(createData.auditionTime),
            total:parseInt(this.createData.total),
            site:createData.site,
            sids:this.stateIdStr.join(":")
          }
        )
        let config={headers:{
            "Content-type":"application/json;charset=utf-8",
          }}
        this.$http.post('/audiClasses',data,config) //todo bug 500
          .then(response=>{
            this.openTips('创建成功','','success')
            this.onSubmit(undefined)
            this.stateIdStr=[]
            this.dialogVisibleAdd = false
          }).catch(err =>{
          console.log(err);
          this.errorTips(err.response, '创建失败');
        })
      },
      //删除班级
      Delete:function(data){

        this.$http.delete('/audiClasses/'+data.id) //todo bug 500
          .then(response=>{
            this.openTips('删除成功','','success')
          if(this.tableData.list.length==1)
          {
            location.reload()
          }
          else {
            this.onSubmit(undefined)
          }
            this.dialogVisibleAdd = false
          }).catch(err =>{
          console.log(err);
          this.errorTips(err.response, '删除失败');
        })
      },
      //向子组件传递数值
      AchangeSid: function (sid) {
        this.queryaddData.sourceIdStr = sid
      },
      /*
   * 错误提示信息
   */
      errorTips: function (res, type) {
        if (res.status === 401) {
          this.openTips(type, '缺少权限=', 'error');
        } else if (res.status === 402) {
          this.openTips('登录状态丢失，请重新登录', '', 'error');
        } else if(res.status === 500) {
          this.openTips(type, '服务器问题，请稍后再试', 'error');
        } else {
          this.openTips(type, res.data, 'error');
        }
      },
      onSubmit:function( no, pageSize, queryData){
        this.load(no, pageSize, queryData);
      },
      load: function (no = 1, pageSize = 15,queryData) {
        let str='&_pageSize'+"="+pageSize
        let ascFlag=false;
        str=str+'&ascFlag'+"="+ascFlag
        this.currentPage = no;
        for(let key in queryData){
          if(queryData[key]){
            if(key.indexOf('Time')>0){
              str += '&' + key + '=' + this.GLOBAL.unctime(queryData[key]);
            }
            else {
              str+="&"+key+"="+queryData[key]
            }
          }
        }

        this.$http.get('/audiClasses?_no='+no+str)
          .then(response=>{
                this.tableData=response.data

                this.totalPage = this.tableData.totalPage
                this.totalItems = this.tableData.total
                this.showItems = this.tableData.list.length
          })
          .catch(error=>{
            this.errorTips(error.response, '获取班级详情错误');
          })
      },
      //查询函数
      /*
    * 表单验证函数
    */
      onSubmita(formName, no, pageSize, queryData){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loadData(no, pageSize, queryData);
          } else {
            return false;
          }
        });
      },
      loadData:function(no = 1, pageSize = 15, queryData){
        this.currentPage1 = no;
        let ascFlag=false;
        let str='&ascFlag'+"="+ascFlag;
        str=str+'&_pageSize'+"="+pageSize
        for (let key in queryData)
        {
          if (queryData[key])
          {
            if(key.indexOf('time')>0){
              str += '&' + key + '=' + this.GLOBAL.getTimeAmount(queryData[key]);
            }
            else if(key.indexOf('Date')!==-1||key.indexOf('birthday')!==-1){
              str += '&' + key + '=' + this.GLOBAL.unctime(queryData[key]);
            }
            else if(key==='sourceIdStr'&& queryData[key].length !==0){
              str+='&'+key+'='+queryData.sourceIdStr;
            }
            else if(key === 'stateStr' && queryData[key].length !==0){
              str+='&'+key+'='+JSON.parse(JSON.stringify(queryData.stateStr)).join(':');
            }
            else if(key==='degreeSeyStr'&& queryData[key].length !==0){
              str+='&'+key+'='+JSON.parse(JSON.stringify(queryData.degreeSeyStr)).join(':');
            }
            else if(key==='salesStageStr'&& queryData[key].length !==0){
              str+='&'+key+'='+JSON.parse(JSON.stringify(queryData.salesStageStr)).join(':');
            }
            else if(key.indexOf('Str')===-1)
            {
              str+="&"+key+"="+queryData[key]
            }
          }
        }
        this.$http.get("/student?_no=" + no + str )
          .then(response => {
            this.pageData = this.GLOBAL.deepCopy(response.data)
            this.totalPage1 = this.pageData.totalPage
            this.totalItems1 = this.pageData.total
            this.showItems1 = this.pageData.list.length
          }).catch(error => {

          this.errorTips(error.response, '获取学生信息错误');
        })
      },

      //用在分页组件上的，以下两个都是
      currentChange: function (index) {
        this.currentPage = index
      },
      currentChange1: function (index) {
        this.currentPage1 = index
      },
      indexMethod: function (index) {
        return index + (this.currentPage - 1) * 15 + 1
      },
      indexMethod1: function (index) {
        return index + (this.currentPage1 - 1) * 15 + 1
      },

      getAll:function (no=1,pageSize=5,queryData) {
        let excelData=[]
        let num=Math.ceil(this.totalItems/5)
        let ascFlag=false;
        let str='&_pageSize'+"="+pageSize
         str+='&ascFlag'+"="+ascFlag;
        for(let key in queryData) {
          if (queryData[key]) {
            if (key.indexOf('Time') > 0) {
              str += '&' + key + '=' + this.GLOBAL.unctime(queryData[key]);
            }
            else {
              str += "&" + key + "=" + queryData[key]
            }
          }
        }

        let urls=[];
        for (let i=1;i<=num;i++){
          urls.push('/audiClasses?_no='+i+str )
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
            <th>班级名</th>
            <th>试听时间</th>
            <th>创建人</th>
            <th>总量</th>
            <th>当前人数</th>
            <th>地点</th>

          </tr>
          </thead><tbody>`
            for (let i=0;i<excelData.length;i++){
              excelData[i].auditionTime = this.GLOBAL.resolvectime( excelData[i].auditionTime);
              sTable+=`
                   <tr>
                  <td>${i+1}</td>
                  <td>${excelData[i].name}</td>
                  <td>${excelData[i].auditionTime}</td>
                  <th>${excelData[i].opName}</th>
                  <th>${excelData[i].total}</th>
                  <th>${excelData[i].stuList.length}</th>
                  <th>${excelData[i].site}</th>
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
            document.getElementById("dLink").download = '班级简略信息.xls';
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
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  p>span{
    width: 90px;
    color: #99a9bf;
  }
  .fixed{
    position: fixed;
    bottom: 0;
  }
  .add{width: 90px;
    color:#000000;}
</style>
