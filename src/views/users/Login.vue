<template>
  <div class="login">
    <mt-header fixed title="用户登录"></mt-header>
    <img class="logo" src="../../assets/okrbanner.png" alt="okrs管理系统">
    <div class="content">
      <h3>中粮贸易华中公司okr管理系统</h3>
    <div class="errorMsg" v-show="showErrorMsg">{{errorMsg}}</div>
    <div class="lists">
      <div class="list">
        部门<span class="must">*</span>
        <span class="item" @click="selectDepartment">{{this.department}}</span>
      </div>
      <mt-radio v-show="popupVisible1" class="page-part" title="" v-model="department" :options="optionsDepartment">
      </mt-radio>
      <div class="list">姓名<span class="must">*</span>
        <input class="input" type="text" placeholder="输入用户名" v-model="username" />
      </div>
      <div class="list">密码<span class="must">*</span>
        <input class="input" type="text" placeholder="输入密码" v-model="password" />
      </div>
    </div>
    <div>
      <mt-button class="submit" size="large" type="primary" @click.native="submit">登录</mt-button>
      <mt-button class="submit" size="large" type="primary" @click.native="reset">重置</mt-button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      id: '',
      username: '',
      department: '',
      password: '',
      roles: [],
      email: '',
      popupVisible1: false,
      errorMsg: [],
      showErrorMsg: false,
      optionsDepartment: []
    }
  },
  created () {
    this.getDepartments()
    this.$store.commit('setuserinfo', {})
    this.$store.commit('setisAdmin', false)
    this.$store.commit('setisLogin', false)
  },
  methods: {
    getDepartments () {
      this.$axios
        .get('/departments')
        .then(response => {
          console.log(response.data)
          this.departmentList = response.data
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
    selectDepartment () {
      this.popupVisible1 = !this.popupVisible1
    },
    submit () {
      if (this.department === '') {
        this.errorMsg.push('所属部门不能为空！')
      }
      if (this.username === '') {
        this.errorMsg.push('用户名不能为空！')
      }
      if (this.password === '') {
        this.errorMsg.push('密码不能为空！')
      }
      if (this.errorMsg.length > 0) {
        this.showErrorMsg = true
        setTimeout(() => {
          this.showErrorMsg = false
          this.errorMsg = []
        }, 3000)
      } else {
        console.log('验证通过！')
        this.$axios
          .get(
            `/users?filter[where][department]=${
              this.department
            }&filter[where][username]=${
              this.username
            }&filter[where][password]=${this.password}`
          )
          .then(response => {
            // console.log(response);
            if (response.data.length > 0) {
              this.$store.commit('setuserinfo', response.data)
              this.$store.commit('setisLogin', true)
              console.log(response.data[0].roles)
              let role = response.data[0].roles.find(
                (values, index, arr) => values === '系统管理员'
              )
              if (role === '系统管理员') {
                console.log('角色', role)
                this.$store.commit('setisAdmin', true)
              } else {
                console.log('不是系统管理员！')
                this.$store.commit('setisAdmin', false)
              }
              this.$router.push({
                name: 'home'
              })
            } else {
              this.errorMsg.push('用户名或密码错误！')
              this.showErrorMsg = true
              setTimeout(() => {
                this.showErrorMsg = false
                this.errorMsg = []
              }, 3000)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    reset () {
      this.department = ''
      this.username = ''
      this.password = ''
    },
    register () {}
  }
}
</script>

<style scoped>
.logo {
  width: 100%;
}
.mint-checklist-title {
  margin: 15px;
}

.errorMsg {
  color: crimson;
  padding: 15px;
}

.list {
  line-height: 25px;
  color: mediumblue;
}

.mint-popup-bottom {
  width: 90%;
  text-align: center;
}

.item {
  flex: 1;
  margin-left: 20px;
  color: #000;
  text-align: left;
}

.input {
  margin-top: -5px;
  margin-left: 20px;
  font-size: 16px;
}

.must {
  color: crimson;
}

.submit {
  margin: 10px auto;
  width: 90%;
  text-align: center;
}
</style>
