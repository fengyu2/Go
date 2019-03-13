<template>
  <div>
    <el-form>
    <el-form-item>
      <a id="dLink"  style="display:none;"></a>
      <el-button @click="outputExcel">导出EXCEL</el-button>
    </el-form-item>
    </el-form>
  <el-table
    :data="pageData.list"
    border
    :default-sort = "{prop: 'name', order: 'descending'}"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="来源类型:">
            <span>{{ props.row.sourceIdZH }}</span>
          </el-form-item>
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
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
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
  export default {
    name: "Today",
    data(){
      return{
        pageData:{},
        queryData:{expectedDate:''},

        totalPage: 0,
        totalItems: 0,
        showItems: 15,
        currentPage: 1,
      }

    },
    created(){
      this.loadData()
    },
    watch:{
      currentPage: function (newCurrentPage) {
        this.loadData(newCurrentPage, undefined, this.queryData);
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
      loadData:function(no=1,pageSize=15){
        this.currentPage=no;
        let ascFlag=false;
        let str='&ascFlag'+"="+ascFlag;
        str+=str+'&ascFlag'+"="+pageSize;
        let date=new Date()
        let year=new String(date.getFullYear())
        let month=new String(date.getMonth()+1)
        if((date.getMonth()+1)<=9)
        {month='0'+month}
        let day  =new String(date.getDate())
        if((date.getDate())<=9)
        {day='0'+day}
        str=str+'&expectedDateLow'+'='+(year+month+day)+"&expectedDateHigh"+'='+(year+month+day);
        this.$http.get("/student?_no=" + no + str )
          .then(response => {
            this.pageData = this.GLOBAL.deepCopy(response.data)
            this.totalPage=this.pageData.totalPage;
            this.totalItems=this.pageData.total;
            this.showItems=this.pageData.list.length;

          }).catch(error => {
          this.errorTips(error.response, '获取学生信息错误');
        })
      },
      currentChange: function (index) {
        this.currentPage = index
      },
      indexMethod: function (index) {
        return index + (this.currentPage - 1) * 15 + 1
      },
      getAll:function (no=1,pageSize=100,queryData={}) {
        let num=Math.ceil(this.totalItems/5)
        let excelData=[]
        let ascFlag=false;
        let str='&ascFlag'+"="+ascFlag;
        let date=new Date()
        let year=new String(date.getFullYear())
        let month=new String(date.getMonth()+1)
        if((date.getMonth()+1)<=9)
        {month=1+month}
        let day  =new String(date.getDate())
        if((date.getDate())<=9)
        {day=1+day}
        str=str+'&expectedDateLow'+'='+(year+month+day)+"&expectedDateHigh"+'='+(year+month+day);

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
            document.getElementById("dLink").download = '今日跟踪信息.xls';
            document.getElementById("dLink").click();
          })
      },
      outputExcel:function () {
        this.$http.get('/user/auth')
          .then(response=>{
            if(response.data!=2)
            {this.getAll(1,undefined,this.queryData)}
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

</style>
