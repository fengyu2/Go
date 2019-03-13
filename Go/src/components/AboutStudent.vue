<template>
  <div>
    <el-form  ref="queryData" :inline="true" :model="queryData" :rules="rulesAddForm" class="demo-form-inline">
      <el-form-item prop="name">
        <el-input v-model="queryData.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.nickname" placeholder="昵称(小名)"></el-input>
      </el-form-item>
      <el-form-item>

      <el-col :span="11">
        <el-input  placeholder="年龄下限" v-model="queryData.ageLow" style="width: 100%;"></el-input>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-input  placeholder="年龄上限" v-model="queryData.ageHigh" style="width: 100%;"></el-input>
      </el-col>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryData.sex"   clearable   placeholder="请选择性别">
          <el-option  v-for="item in sexData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-col :span="11">

          <el-date-picker type="date" placeholder="出生日期下限" v-model="queryData.birthdayLow" style="width: 100%;"></el-date-picker>        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="出生日期上限" v-model="queryData.birthdayHigh" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.parentName" placeholder="家长姓名"></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="queryData.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item prop="alternateNumber">
        <el-input v-model="queryData.alternateNumber" placeholder="备用号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.wechat" placeholder="微信号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryData.addr" placeholder="家庭住址"></el-input>
      </el-form-item>
      <el-form-item>
      <el-date-picker type="date" placeholder="创建时间下限" v-model="queryData.ctimeLow" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="创建时间上限" v-model="queryData.ctimeHigh" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item  prop="eidStr">
        <el-select v-model="queryData.eidStr"  multiple clearable   placeholder="录入人员">
          <el-option  v-for="item in YuangongId" :key="item.value" :label="item.label"  :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="sourceIdStr">
        <Select :id="queryData.sourceIdStr" v-model="queryData.sourceIdStr"  v-on:sendSid="AchangeSid"  placeholder="请选择学员来源" ></Select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="queryData.stateStr"  multiple clearable   placeholder="请选择学员状态">
          <el-option  v-for="item in StateData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryData.degreeSeyStr"  multiple clearable   placeholder="请选择重要程度">
          <el-option  v-for="item in DegreeData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryData.salesStageStr"  multiple clearable   placeholder="请选择销售阶段">
          <el-option  v-for="item in SalesData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="意向日期下限" v-model="queryData.expectedDateLow" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="意向日期上限" v-model="queryData.expectedDateHigh" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="签约日期下限" v-model="queryData.contractDateLow" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker type="date" placeholder="签约日期上限" v-model="queryData.contractDateHigh" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('queryData',undefined,undefined,queryData)">查询</el-button>
        <el-button type="primary" @click="openDia">添加</el-button>
        <a id="dLink"  style="display:none;"></a>
        <el-button @click="outputExcel">导出EXCEL</el-button>
        <el-button @click="openChangeEid">批量修改学员所属员工</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="批量修改学员所属员工"
      :visible.sync="changeEidVisible"
      width="80%"
     >
      <el-form  ref="queryData1" :inline="true" :model="queryData1" :rules="rulesAddForm" class="demo-form-inline">

        <el-form-item  prop="eidStr">
          <el-select v-model="queryData1.eidStr"  multiple clearable   placeholder="所要被修改录入人员">
            <el-option  v-for="item in YuangongId" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit1('queryData1',undefined,undefined,queryData1)">查询</el-button>
          </el-form-item>
      </el-form>

        <el-form  ref="changeEid1" :inline="true" :model="changeEid1"  class="demo-form-inline">
          <el-form-item  prop="eid">
            <el-select v-model="changeEid1.eid"   clearable   placeholder="修改后的录入人员">
              <el-option  v-for="item in YuangongId" :key="item.value" :label="item.label"  :value="item.value"></el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <el-table
        :data="pageData1.list"
        border

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
            <input type="checkbox" :id='scope.row.id' :value="(scope.row.id)" v-model="idStr"><label class="add">添加</label>
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



    <el-button @click="changeEidVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeEid">确 定</el-button>

    </el-dialog>

     <!--添加和更新学生状态-->
      <el-dialog
        center
        modal
        :close-on-click-modal = false
        modal-append-to-body
        :visible="dialogVisible||dialogVisibleAdd"
        v-if="dialogVisible||dialogVisibleAdd"
      >
        <div slot="title" class="dialog-title">
          <p >{{ dialogVisible ? "更新学生" : "添加学生" }}</p>
        </div>
      <el-form ref="createData" :model="createData" :rules="rulesCreateForm"  label-width="80px" center>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="createData.name"  clearable placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="createData.nickname" clearable  placeholder="昵称(小名)"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="createData.sex"   clearable   placeholder="请选择性别">
            <el-option  v-for="item in sexData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker type="date" placeholder="生日" clearable  v-model="createData.birthday" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="createData.age"  clearable  placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="家长姓名" prop="parentName">
          <el-input v-model="createData.parentName"  clearable  placeholder="家长姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="createData.phone"  clearable   placeholder="手机号"></el-input><el-button @click="checkPhone(createData.phone)">检测</el-button>
        </el-form-item>
        <el-form-item label="备用号码" prop="alternateNumber">
          <el-input v-model="createData.alternateNumber"  clearable   placeholder="备用号码"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wechat">
          <el-input v-model="createData.wechat"   clearable     placeholder="微信"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="addr">
          <el-input v-model="createData.addr"  clearable   placeholder="家庭住址"></el-input>
        </el-form-item>

        <el-form-item   label="具体来源"   prop="sourceId">
          <Select :id="createData.sourceId" v-model="createData.sourceId"  v-on:sendSid="AchangeSid1"  placeholder="请选择学员来源" ></Select>
        </el-form-item>

        <el-form-item label="员工" prop="eid">
          <el-select v-model="createData.eid"   clearable   placeholder="员工，管理员，市场经理创建时必须指定">
            <el-option  v-for="item in YuangongId" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="state" label="学员状态">
          <el-select v-model="createData.state"   clearable   placeholder="学员状态">
            <el-option  v-for="item in StateData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="degree" label="重要程度">
          <el-select v-model="createData.degree"   clearable   placeholder="重要程度">
            <el-option  v-for="item in DegreeData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="salesStage" label="销售阶段">
          <el-select v-model="createData.salesStage"   clearable   placeholder="销售阶段">
            <el-option prop="salesStage" v-for="item in SalesData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="意向日期" >
          <el-date-picker type="date" placeholder="意向日期（只有‘继续跟进与试听课程’可以选择）" v-model="createData.expectedDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeUpdateEmp">取 消</el-button>
    <el-button type="primary" v-if="dialogVisibleAdd"   @click="Commit('createData',createData)">添 加</el-button>
    <el-button type="primary" v-if="dialogVisible"  @click="updataCommit">更 新</el-button>
  </span>
    </el-dialog>
     <!--查看学生状态-->
    <el-dialog
      title="学生状态"
      :visible.sync="dialogVisibleState"
      width="70%"
      class="a"

      >
      <div class="color">
         <div class="sroll">
      <div v-for="item in Lookstate" class="state">
        <div><span class="font">创建时间:</span>{{item.ctime}}</div>
        <div>
          <span class="font">内容:</span>{{item.content}} <span>----</span>
          <span class="font">学生状态:</span>{{item.nextState}}<span>----</span>
          <span class="font">重要程度:</span>{{item.nextDegree}}<span>---</span>
          <span class="font">销售阶段:</span>{{item.curStage}}→{{item.nextStage}}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleState = false">关闭</el-button>
     </span>
      </div>
      </div>
    </el-dialog>
    <!--添加学生状态-->
    <el-dialog
      title="添加学生状态"
      :visible.sync="dialogVisibleaddState"
      width="50%"
      >
      <el-form :model="addStateData" status-icon  ref="addStateData" label-width="100px" class="demo-ruleForm">

        <el-form-item label="内容" prop="content">
          <el-input v-model="addStateData.content" ></el-input>
        </el-form-item>
        <el-form-item label="意向时间">
          <el-date-picker type="date" placeholder="意向日期" v-model="addStateData.expectedDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="当前状态" >
          <el-input :value="getState" readonly></el-input>
        </el-form-item>
        <el-form-item label="当前重要程度" >
          <el-input :value="getDegree" readonly></el-input>
        </el-form-item>
        <el-form-item label="当前阶段">
          <el-input :value="getsalesStage" readonly></el-input>
        </el-form-item>
        <el-form-item label="下一状态" prop="nextState">
          <el-select v-model="addStateData.nextState"   clearable   placeholder="请选择学员下一状态">
            <el-option  v-for="item in StateData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一重要程度" prop="nextDegree">
          <el-select v-model="addStateData.nextDegree"   clearable   placeholder="请选择学员下一重要程度">
            <el-option  v-for="item in DegreeData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一重要阶段" prop="nextStage">
          <el-select v-model="addStateData.nextStage"   clearable   placeholder="请选择学员下一阶段">
            <el-option  v-for="item in SalesData" :key="item.value" :label="item.label"  :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addStateData',addStateData)">提 交</el-button>
          <el-button type="primary" @click="dialogVisibleaddState=false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table
      :data="pageData.list"
      border
      :default-sort = "{prop: 'name', order: 'descending'}"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="具体来源:">
              <span>{{ props.row.source }}</span>
            </el-form-item>
            <el-form-item label="昵称:">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>

            <el-form-item label="生日:">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="家长姓名:">
              <span>{{ props.row.parentName }}</span>
            </el-form-item>
            <el-form-item label="手机号:">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="备用号码:">
              <span>{{ props.row.alternateNumber }}</span>
            </el-form-item>
            <el-form-item label="微信:">
            <span>{{ props.row.wechat }}</span>
          </el-form-item>
              <div>
                <el-button type="primary"  @click="LookState(props.row)">查看学生状态</el-button>
                <el-button type="primary"  @click="AddState(props.row)">添加学生状态</el-button>
              </div>
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

        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="age"

        label="年龄"
        width="60">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="60">
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
        prop="contractDate"
        label="签约日期">
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

<script>
  import Select from '../components/Select'
  export default {
    name: "AboutStudent",
    components:{Select},
    data(){
      return{

        //查询字段
        queryData1:{eidStr:''},
        queryData:{
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
          eidStr:'',
          ctimeLow:'',
          ctimeHigh:'',
          birthdayLow:'',
          birthdayHigh:'',
          expectedDateLow:'',
          expectedDateHigh:'',
          contractDateLow:'',
          contractDateHigh:''
        },
        createData:{
             sex:'',
             name:'',
             nickname:'',
             birthday:'',
             age:'',
             parentName:'',
             phone:'',
             alternateNumber:'',
             wechat:'',
             addr:'',
             sourceId:'',
             state:'',
             degree:'',
             salesStage:'',
             expectedDate:''
        },
        changeEid1:{eid:''},
        idStr:[],
        createData1:{},
        YuangongId:[],
        addStateData:{
             sid:'',
             content:'',
             nextStage:'',
             nextDegree:'',
             nextState:'',
             expectedDate:''
        },
        //验证查询字段
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
        rulesCreateForm: {
          name: [
            {required: true, min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          nickname:[
            {required: false, min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          // age:[
          //   {validator : this.GLOBAL.formValidator.numberPass, trigger : 'blur'}
          // ],
          parentName:[
            {required: false, min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          phone:[
            {validator : this.GLOBAL.formValidator.nophonePass, trigger : 'blur'}
          ],
          // alternateNumber:[
          //   {validator : this.GLOBAL.formValidator.phonePass, trigger : 'blur'}
          // ],
          state:[
            {required:true,message:'学员状态未填',trigger:'change'}
          ],
          degree:[
            {required:true,message:'重要程度未填',trigger:'change'}
          ],
          salesStage:[
            {required:true,message:'销售阶段未填',trigger:'change'}
          ]
        },
        queryFlag: false,
        pageData: {},
        totalPage: 0,
        totalItems: 0,
        showItems: 15,
        currentPage: 1,
        nowNo:'',


        totalPage1: 0,
        totalItems1: 0,
        showItems1: 15,
        currentPage1: 1,
        //默认弹框是关闭的
        changeEidVisible:false,
        dialogVisibleAdd:false,
        dialogVisible:false,
        dialogVisibleState:false,
        dialogVisibleaddState:false,
        showexpectedDate:false,
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
        sexData:[{
          value:'男',label:'男'
        },{
          value:'女',label:'女'
        }],
        //学员状态
        StateData:[
          {value:0,label:'有效'},
          {value:1,label:'无效'},
          {value:2,label:'会员'}
        ],
        //学员当前id
        stateId:'',
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
        pageData1:{},
        PropsRow:{},
        Lookstate:{},
        //当前状态
        newState:{
          stateZH:'',
          degreeZH:'',
          salesStageZH:''
        },
      }
    },
    computed:{
      getsalesStage:function () {
        return this.$store.state.SalesBH[this.PropsRow.salesStage]
      },
      getState:function () {
        return this.$store.state.stateBH[this.PropsRow.state]
      },
      getDegree:function () {
        return this.$store.state.DegreeBH[this.PropsRow.degree]
      }
    },
    created(){
      this.loadData(1, undefined)
      this.loadData1(1, undefined)
      this.loadDataEmployee(1,undefined)
    },
    watch:{
      //分页的修改页数，触发数据数据函数
      currentPage: function (newCurrentPage) {
        this.loadData(newCurrentPage, undefined, this.queryData);
      },
      currentPage1: function (newCurrentPage) {
        this.loadData1(newCurrentPage, undefined, this.queryData1);
      },
      pageData1:function () {
        this.pageData1.list.forEach(item=>{
          item['stateZH'] = this.$store.state.stateBH[item['state']];
          item['sourceIdZH'] = this.$store.state.typeBH[item['sourceId']];
          item['salesStageZH'] = this.$store.state.SalesBH[item['salesStage']];
          item['degreeZH'] = this.$store.state.DegreeBH[item['degree']];
          item.ctime = this.GLOBAL.resolveTime(item.ctime);
          if(item.birthday!=undefined){
            item.birthday=this.GLOBAL.resolvectime(item.birthday);
          }
          if(item.contractDate!=undefined){
            item.contractDate=this.GLOBAL.resolvectime(item.contractDate);
          }
          if(item.expectedDate!=undefined){
            item.expectedDate=this.GLOBAL.resolvectime(item.expectedDate);
          }

        })
      },

      pageData:function () {
        this.pageData.list.forEach(item=>{
          item['stateZH'] = this.$store.state.stateBH[item['state']];
          item['sourceIdZH'] = this.$store.state.typeBH[item['sourceId']];
          item['salesStageZH'] = this.$store.state.SalesBH[item['salesStage']];
          item['degreeZH'] = this.$store.state.DegreeBH[item['degree']];
          item.ctime = this.GLOBAL.resolveTime(item.ctime);
          if(item.birthday!=undefined){
            item.birthday=this.GLOBAL.resolvectime(item.birthday);
          }
          if(item.contractDate!=undefined){
            item.contractDate=this.GLOBAL.resolvectime(item.contractDate);
          }
          if(item.expectedDate!=undefined){
            item.expectedDate=this.GLOBAL.resolvectime(item.expectedDate);
          }

        })
      },

      Lookstate:function () {
        this.Lookstate.forEach(item=>{
            item.ctime=this.GLOBAL.resolveTime(item.ctime);
            item.nextDegree=this.$store.state.DegreeBH[item.nextDegree];
            item.nextStage=this.$store.state.SalesBH[item.nextStage];
            item.nextState=this.$store.state.stateBH[item.nextState];
            item.curStage=this.$store.state.SalesBH[item.curStage];
           item.expectedDate=this.GLOBAL.resolvectime(item.expectedDate);
        })
      }
    },

    methods:{
      //关闭面板
      closeUpdateEmp:function(){
        this.dialogVisible=false;
        this.dialogVisibleAdd=false;
        this.changeEidVisible=false;
      },

     openDia:function(){
       this.dialogVisibleAdd=true
       this.showexpectedDate=true
     },
      //批量修改学员所属员工
      changeEid:function(){

           let  idStr=this.idStr.join(':');
           let  eid=this.changeEid1.eid
        let config={headers:{
            "Content-type":"application/json;charset=utf-8",
          }}
        this.$http.put('/student/eid/change?idStr='+idStr+'&eid='+eid,config)
          .then(resonse=>{
            this.openTips('更新成功','','success')
            this.loadData1(1,undefined)
             location.reload()
            this.closeUpdateEmp()
          }).catch(err =>{
          console.log(err);
          this.errorTips(err.response, '更新失败');
        })
      },
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loadData(no, pageSize, queryData);
          } else {
            return false;
          }
        });
      },
      loadData:function(no = 1, pageSize = 15, queryData){
        this.currentPage = no;
        let ascFlag=false;
        let str='&ascFlag'+"="+ascFlag;
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
            else if(key==='eidStr'&& queryData[key].length !==0){
              str+='&'+key+'='+JSON.parse(JSON.stringify(queryData.eidStr)).join(':');
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
            this.pageData.list.forEach(item => {
              //item['name'] = this.$store.state.supplyMap.get(item['sid'])
            })
            this.totalPage = this.pageData.totalPage
            this.totalItems = this.pageData.total
            this.showItems = this.pageData.list.length
          }).catch(error => {

          this.errorTips(error.response, '获取学生信息错误');
        })
      },


      onSubmit1(formName, no, pageSize, queryData1){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loadData1(no, pageSize, queryData1);
          } else {
            return false;
          }
        });
      },
      loadData1:function(no = 1, pageSize = 15, queryData1){
        this.currentPage1 = no;
        let ascFlag=false;
        let str='&ascFlag'+"="+ascFlag;
        for (let key in queryData1)
        {
          if (queryData1[key])
          {

           if(key==='eidStr'&& queryData1[key].length !==0){
              str+='&'+key+'='+JSON.parse(JSON.stringify(queryData1.eidStr)).join(':');
            }

          }
        }
        this.$http.get("/student?_no=" + no + str )
          .then(response => {
            this.pageData1 = this.GLOBAL.deepCopy(response.data)

            this.totalPage1 = this.pageData1.totalPage
            this.totalItems1 = this.pageData1.total
            this.showItems1 = this.pageData1.list.length
          }).catch(error => {

          this.errorTips(error.response, '获取学生信息错误');
        })
      },
      //更新函数
      handleClick:function (data) {
         this.dialogVisible = true;
         this.createData=this.GLOBAL.deepCopy(data);

         if(this.createData.salesStage==1||this.createData.salesStage==2){
           this.showexpectedDate=true;
         }
      },
      updataCommit:function() {

        if(this.createData.birthday!='')
        {var birthdayjson1= {birthday:this.GLOBAL.unctime(this.createData.birthday),}
        }

        if(this.createData.expectedDate!='')
        {
          var expectedDatejson1= {expectedDate:this.GLOBAL.unctime(this.createData.expectedDate),}
        }
        let data1= Object.assign(birthdayjson1,expectedDatejson1);
        let data2= {
          sex:this.createData.sex,
          name:this.createData.name,
          nickname:this.createData.nickname,
          age:this.createData.age,
          parentName:this.createData.parentName,
          phone:this.createData.phone,
          alternateNumber:this.createData.alternateNumber,
          wechat:this.createData.wechat,
          addr:this.createData.addr,
          sourceId:this.createData.sourceId,
          eid:this.createData.eid,
          state:this.createData.state,
          degree:this.createData.degree,
          salesStage:this.createData.salesStage,
        }

        let data3= Object.assign(data1,data2);

        let data=JSON.stringify(data3)
            let config={headers:{
                "Content-type":"application/json;charset=utf-8",
              }}

            this.$http.put('/student/'+this.createData.id,data,config) //todo bug 500
              .then(response=>{
                this.openTips('更新成功','','success')
                this.loadData(this.currentPage,undefined)
                this.closeUpdateEmp()
              }).catch(err =>{
              console.log(err);
              this.errorTips(err.response, '更新失败');
            })
        },
     //查看学生状态函数
      LookState:function(key){
        this.PropsRow=key;
        this.newState=key;
        this.dialogVisibleState = true;
        this.stateId=key.id;
        this.$http.get('/states/student/'+key.id)
          .then(response=>{
            this.Lookstate=this.GLOBAL.deepCopy(response.data)

          }).catch(err=>{
          this.errorTips(err.response, '查看学生状态');
        })
      },
      //添加学生状态
      AddState:function(key){
         this.PropsRow=key;
          this.dialogVisibleaddState=true
      },

      open(x) {
        const h = this.$createElement;

        this.$notify({
          message: h('i', { style: 'color: teal'}, x)
        });
      },
      open3(x) {
        this.$notify.error({
          title: '手机号有问题',
          message: x,
          type: 'warning'
        });
      },

      //手机号检测
      checkPhone:function(data){
        let obj={phone:''}
        let phone=[]
        phone.push(data)
        obj['phone']=phone;

        this.$http.get('/student/phone?phone='+phone)
          .then(response=>{
                this.open(response.data)
          })
          .catch(error=>{
            this.open3(error.response.data)
          })
      },
      //向子组件传递数值
      AchangeSid: function (sid) {
        this.queryData.sourceIdStr = sid
      },
      AchangeSid1:function(sid){
        this.createData.sourceId = sid
      },
      openChangeEid:function(){
        this.changeEidVisible=true ;
        this.eidStr=[];
      },
      //提交学生状态
      submitForm:function(formName,addStateData){
        this.dialogVisibleaddState = false

        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data=JSON.stringify(
              {
                sid:this.PropsRow.id,
                content:addStateData.content,
                nextState:addStateData.nextState,
                nextDegree:addStateData.nextDegree,
                nextStage:addStateData.nextStage,
                expectedDate: this.GLOBAL.unctime(addStateData.expectedDate)
              }
            )
            let config={headers:{
                "Content-type":"application/json;charset=utf-8",
              }}
            this.$http.post('/states',data,config) //todo bug 500
              .then(response=>{
                this.openTips('更新成功','','success')
                this.loadData(this.currentPage,undefined)
                this.dialogVisibleaddState = false

              }).catch(err =>{
              console.log(err);
              this.errorTips(err.response, '更新失败');
            })
          }

           else {
            return false;
          }
        });

      },
     //合并二个JSON对象方法
      extend:function (des, src, override){
    if(src instanceof Array){
      for(var i = 0, len = src.length; i < len; i++)
        this.extend(des, src[i], override);
    }
    for( var i in src){
      if(override || !(i in des)){
        des[i] = src[i];
      }
    }
    return des;
      },
      //删除函数
      Delete:function(key){
        if (confirm('是否删除学生:'+key.name+'?')){
          this.$http.delete('/student/'+key.id)
            .then(response=>{
              this.openTips('删除学生', '', 'success')

              if(this.pageData.list.length==1)
              {
                location.reload()
              }
              else {
                this.loadData(this.currentPage,undefined)
              }

            }).catch(err =>{
            console.log(err);
            this.errorTips(err.response, '删除学生');
          })
        }
      },
      //添加
      Commit(formName,createData) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if(createData.birthday!=null||createData.birthday!=undefined)
            {var birthdayjson= {birthday:this.GLOBAL.unctime(createData.birthday),}
            }

            if(createData.expectedDate!=null||createData.expectedDate!=undefined)
            {
              var expectedDatejson= {expectedDate:this.GLOBAL.unctime(createData.expectedDate),}
            }
           let data1= Object.assign(birthdayjson,expectedDatejson);
            let data2= {
                sex:createData.sex,
                name:createData.name,
                nickname:createData.nickname,
                age:createData.age,
                parentName:createData.parentName,
                phone:createData.phone,
                alternateNumber:createData.alternateNumber,
                wechat:createData.wechat,
                addr:createData.addr,
                sourceId:createData.sourceId,
                eid:createData.eid,
                state:createData.state,
                degree:createData.degree,
                salesStage:createData.salesStage,
              }

            let data3= Object.assign(data1,data2);
            let data=JSON.stringify(data3)

            let config={headers:{
                "Content-type":"application/json;charset=utf-8",
              }}
            this.$http.post('/student',data,config) //todo bug 500
              .then(response=>{
                this.openTips('创建成功','','success')
                this.loadData(1,undefined)
                this.dialogVisibleAdd = false
              }).catch(err =>{
              console.log(err);
              this.errorTips(err.response, '更新失败');
            })
          } else {
            return false;
          }

        });
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
        return index + (this.currentPage - 1) * 15 + 1
      },

      /*
            * 查询函数
            */
      loadDataEmployee: function (no = 1, pageSize = 15, queryData) {
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
            this.pageData1 = this.GLOBAL.deepCopy(response.data)

            this.pageData1.list.forEach((item) => {
              let obj={value:'',label:''}
               obj.value=item.id
               obj.label=item.name
               this.YuangongId.push(obj)
            })


          }).catch(error => {
          console.log(error.response);
          this.errorTips(error.response, '获取员工错误');
        })
      },




      getAll:function (no=1,pageSize=100,queryData={}) {
        let excelData=[]
        let num=Math.ceil(this.totalItems/5)
        let ascFlag=false;
        let str='&ascFlag'+"="+ascFlag;
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
            else if(key==='eidStr'&& queryData[key].length !==0){
              str+='&'+key+'='+JSON.parse(JSON.stringify(queryData.eidStr)).join(':');
            }
            else if(key.indexOf('Str')===-1)
            {
              str+="&"+key+"="+queryData[key]
            }
          }
        }
        let urls=[];
        for (let i=1;i<=num;i++){
          urls.push("/student?_no=" + i +'&_pageSize='+5+ str  )
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
            <th>年龄</th>
            <th>录入时间</th>
            <th>录入人员</th>
            <th>学生状态</th>
            <th>重要程度</th>
            <th>销售阶段</th>
            <th>意向日期</th>
            <th>签约日期</th>
            <th>具体来源</th>
            <th>昵称</th>
            <th>生日</th>
            <th>家长姓名</th>
            <th>手机号</th>
            <th>备用号码</th>
            <th>微信</th>

          </tr>
          </thead><tbody>`
            for (let i=0;i<excelData.length;i++){
              excelData[i].state=this.$store.state.stateBH[excelData[i].state];
              excelData[i].sourceId=this.$store.state.typeBH[excelData[i].sourceId];
              excelData[i].salesStage=this.$store.state.SalesBH[excelData[i].salesStage];
              excelData[i].degree=this.$store.state.DegreeBH[excelData[i].degree];
              excelData[i].ctime = this.GLOBAL.resolveTime(excelData[i].ctime);
              excelData[i].birthday=this.GLOBAL.resolvectime(excelData[i].birthday);
              excelData[i].expectedDate=this.GLOBAL.resolvectime(excelData[i].expectedDate);
              excelData[i].contractDate=this.GLOBAL.resolvectime(excelData[i].contractDate);
              sTable+=`
                   <tr>
                  <td>${i+1}</td>
                  <td>${excelData[i].name}</td>
                  <td>${excelData[i].age}</td>
                  <td>${excelData[i].ctime}</td>
                  <td>${excelData[i].ename}</td>
                  <td>${excelData[i].state}</td>
                  <td>${excelData[i].degree}</td>
                  <td>${excelData[i].salesStage}</td>
                  <td>${excelData[i].expectedDate}</td>
                  <td>${excelData[i].contractDate}</td>
                  <td>${excelData[i].source}</td>
                  <td>${excelData[i].nickname}</td>
                  <td>${excelData[i].birthday}</td>
                  <td>${excelData[i].parentName}</td>
                  <td>${excelData[i].phone}</td>
                  <td>${excelData[i].alternateNumber}</td>
                  <td>${excelData[i].wechat}</td>


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
            document.getElementById("dLink").download = '学生详情信息.xls';
            document.getElementById("dLink").click();
          })
      },
      outputExcel:function () {
        this.$http.get('/user/auth')
          .then(response=>{
            if(response.data!=2)
            {
              this.getAll(1,undefined,this.queryData)}
          })
          .catch(err =>{
            console.log(err);
            this.errorTips(err.response, '你没有权利导出EXCEL');
          })
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
  .dialog-footer
  {
    display: block;
    text-align: center;
    position:fixed;
    bottom:0;
    left: 47%;
    z-index:999
  }
  .state{
    border-bottom: 1px solid black;
    padding-bottom: 10px;
    text-align:left
  }
  .font{
    width: 90px;
    color: #99a9bf;

  }
  .color{

  }

  .sroll{ height: 700px;
    overflow-y: scroll;
    position: relative;
  }
</style>
