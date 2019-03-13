<template>
    <el-cascader
      placeholder="具体来源"
      :show-all-levels="false"
      :clearable="true"
      :options="options"
      v-model="sid"
      @change="handleChange">
    </el-cascader>
</template>

<script>
  export default {
    name: "Select",
    props:['id'],
    data() {
      return {
        sid : [],
        options:[
          {
          value:'0',
          label:'社区',
          children:[]
          },
          {
          value:'1',
          label:'小学',
          children:[]
          },
          {
            value:'2',
            label:'幼儿园',
            children:[]
          },
          {
            value:'3',
            label:'网络',
            children:[]
          },
          {
            value:'4',
            label:'转介绍',
            children:[]
          },
          {
            value:'5',
            label:'市调',
            children:[]
          },
          {
            value:'6',
            label:'直访',
            children:[]
          }
          ],

        selectedOptions2: []
      };
  },
    watch:{
      //sid 一旦修改了，就得通知父组件
      sid : {
        handler (newValue, oldValue) {
          if (oldValue[1] !== newValue[1]) {
            this.$emit("sendSid", newValue[1])
          }
        },
        deep: true
      }
    },
    created: function () {
      /*
       * 将物料数据传入vuex初始化
       */
      this.$http.get('/source?_no=1&_pageSize=100')
        .then(response => {
          this.$store.dispatch('addSupply', response.data.list)
          this.showSupplyData()
        }).catch(error =>{
        console.log(error)
        this.openTips('获取来源错误', error.response, 'error')
      })
    },
    Mounted : function(){
      this.showSupplyData()
    },
    methods:{
      handleChange:function () {

      },
      showSupplyData: function(){
        let that = this
        this.$store.state.supply.forEach((arr)=>{


          let obj = {value:'',label:''}
          let flag = true//用于forEach
          let sortData = ['0','1','2','3','4','5','6',];
          arr['type']=new String(arr['type'])
          sortData.forEach((sD,i) => {
            arr['type']=new String(arr['type'])
            if(arr['type'].indexOf(sD)>-1 && flag){
              obj.value = arr['id'];
              obj.label = arr['source'];

              if (arr['id'] === this.id){
                let ahArr = [0, 1, 2, 3, 4, 5, 6];
                that.sid.push(ahArr[i]);
                that.sid.push(this.id);
              }
              this.options[i].children.push(obj);
              flag = false;
            }
          })
        })
      },
    }
  }
</script>

<style scoped>

</style>
