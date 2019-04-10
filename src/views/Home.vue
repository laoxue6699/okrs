<template>
  <div class="home">
     <mt-header fixed title="okrs列表"></mt-header>
     <div v-show="isAdmin" class="list right">
       <router-link to="/admin">后台管理</router-link>
      <router-link to="/register">用户注册</router-link>
      <router-link to="/home">okrs管理</router-link>

     </div>
     <div class="lists">
       <div class="list">
         <span class="item1">按条件筛选</span>
         <span class="main-nav" @click="selectAll">重置</span>
       </div>
       <div class="list">
         <span class="item2" @click="selectDepartment">{{department}}</span>
         <span class="item2" @click="selectCategory">{{category}}</span>
          <span class="item2" @click="selectYear">{{year}}</span>
         <span class="item2" @click="selectPeriod">{{period}}</span>
       </div>
      <mt-radio v-show="popupVisible1" class="page-part" title="" v-model="department" :options="optionsDepartment">
      </mt-radio>
       <mt-radio v-show="popupVisible2" class="page-part" title="" v-model="category" :options="optionsCategory">
      </mt-radio>
      <mt-radio v-show="popupVisible3" class="page-part" title="" v-model="year" :options="optionsYear">
      </mt-radio>
      <mt-radio v-show="popupVisible4" class="page-part" title="" v-model="period" :options="optionsPeriod">
      </mt-radio>

       <div v-for="(item,index) in this.selectList" :key="index">
         <mt-cell :title="item.title" :label="item.department" is-link @click.native="goShowOkrs(item)"></mt-cell>
       </div>
     </div>
     <mt-button class="submit" size="large" type="primary" @click.native="goAddOkrs">添加okr</mt-button>
     <mt-button class="submit" size="large" type="primary" @click.native="goUpdatePassword">修改密码</mt-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      okrsList: [],
      selectList: [],
      department: '部门',
      period: ' 期间',
      category: '分类',
      year: '年份',
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      popupVisible4: false,
      popupVisible5: false,
      optionsDepartment: [],
      optionsCategory: [],
      optionsYear: [],
      optionsPeriod: []
    }
  },
  created () {
    if (this.$store.state.userinfo.length > 0) {
      this.$axios
        .get('/okrs')
        .then(response => {
          console.log(response)
          this.okrsList = response.data
          this.selectList = this.okrsList
          this.getDepartment()
          this.getCategory()
          this.getYear()
          this.getPeriod()
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      this.$router.push({
        name: 'login'
      })
    }
  },
  computed: {
    isAdmin: function () {
      return this.$store.state.isAdmin
    }
  },
  methods: {
    getDepartment () {
      this.$axios
        .get('/departments')
        .then(response => {
          console.log(response)
          let data = response.data
          let values = []
          for (let i = 0; i < data.length; i++) {
            values.push(data[i].item)
          }
          this.optionsDepartment = values
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getCategory () {
      this.$axios
        .get('/categories')
        .then(response => {
          console.log(response)
          let data = response.data
          let values = []
          for (let i = 0; i < data.length; i++) {
            values.push(data[i].item)
          }
          this.optionsCategory = values
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getYear () {
      this.$axios
        .get('/years')
        .then(response => {
          console.log(response)
          let data = response.data
          let values = []
          for (let i = 0; i < data.length; i++) {
            values.push(data[i].item)
          }
          this.optionsYear = values
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getPeriod () {
      this.$axios
        .get('/periods')
        .then(response => {
          console.log(response)
          let data = response.data
          let values = []
          for (let i = 0; i < data.length; i++) {
            values.push(data[i].item)
          }
          this.optionsPeriod = values
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    selectDepartment () {
      this.popupVisible1 = !this.popupVisible1
      if (this.popupVisible1 === true) {
        this.popupVisible2 = false
        this.popupVisible3 = false
        this.popupVisible14 = false
      }

      this.selectList = this.okrsList.filter(
        item => item.department === this.department
      )

      if (this.category !== '分类') {
        this.selectList = this.selectList.filter(
          item => item.category === this.category
        )
      }
      if (this.year !== '年份') {
        this.selectList = this.selectList.filter(
          item => item.year === this.year
        )
      }
      if (this.period !== '期间') {
        this.selectList = this.selectList.filter(
          item => item.period === this.period
        )
      }
    },
    selectCategory () {
      this.popupVisible2 = !this.popupVisible2
      if (this.popupVisible2 === true) {
        this.popupVisible1 = false
        this.popupVisible3 = false
        this.popupVisible4 = false
      }
      this.selectList = this.okrsList.filter(
        item => item.category === this.category
      )
      if (this.department !== '部门') {
        this.selectList = this.selectList.filter(
          item => item.department === this.department
        )
      }
      if (this.year !== '年份') {
        this.selectList = this.selectList.filter(
          item => item.year === this.year
        )
      }
      if (this.period !== '期间') {
        this.selectList = this.selectList.filter(
          item => item.period === this.period
        )
      }
    },
    selectYear () {
      this.popupVisible3 = !this.popupVisible3
      if (this.popupVisible3 === true) {
        this.popupVisible1 = false
        this.popupVisible2 = false
        this.popupVisible4 = false
      }
      this.selectList = this.okrsList.filter(item => item.year === this.year)
      if (this.department !== '部门') {
        this.selectList = this.selectList.filter(
          item => item.department === this.department
        )
      }
      if (this.category !== '分类') {
        this.selectList = this.selectList.filter(
          item => item.category === this.category
        )
      }
      if (this.period !== '期间') {
        this.selectList = this.selectList.filter(
          item => item.period === this.period
        )
      }
    },
    selectPeriod () {
      this.popupVisible4 = !this.popupVisible4
      if (this.popupVisible4 === true) {
        this.popupVisible1 = false
        this.popupVisible2 = false
        this.popupVisible3 = false
      }

      this.selectList = this.okrsList.filter(
        item => item.period === this.period
      )
      if (this.department !== '部门') {
        this.selectList = this.selectList.filter(
          item => item.department === this.department
        )
      }
      if (this.category !== '分类') {
        this.selectList = this.selectList.filter(
          item => item.category === this.category
        )
      }
      if (this.year !== '年份') {
        this.selectList = this.selectList.filter(
          item => item.year === this.year
        )
      }
    },
    selectAll () {
      this.selectList = this.okrsList
      this.department = '部门'
      this.category = '分类'
      this.year = '年份'
      this.period = '期间'
      this.popupVisible1 = false
      this.popupVisible2 = false
      this.popupVisible3 = false
      this.popupVisible4 = false
    },
    goAddOkrs () {
      this.$router.push({
        name: 'addOkrs'
      })
    },
    goShowOkrs (okr) {
      this.$router.push({
        name: 'showOkrs',
        params: { okr }
      })
    },
    goUpdatePassword () {
      this.$router.push({ name: 'updatePassword' })
    }
  }
}
</script>

<style scoped>
.submit {
  margin: 10px auto;
  width: 90%;
  text-align: center;
}
.item1 {
  flex: 2;
  padding-top: 5px;
}
.item2 {
  flex: 1;
  color: cornflowerblue;
}
.item3 {
  flex: 2;
  color: cornflowerblue;
}
.mint-popup-top {
  width: 90%;
}
</style>
