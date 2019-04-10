<template>
  <div class="">
    <mt-header fixed title="修改密码"></mt-header>
    <div class="errorMsg" v-show="showErrorMsg">{{errorMsg}}</div>
    <div class="lists">
      <div class="list">
        部门
        <span class="item" >{{department}}</span>
      </div>
      <div class="list">姓名
        <span class="item" >{{username}}</span>
      </div>
      <div class="list">密码
        <input class="input" type="text" placeholder="输入当前密码" v-model="oldpass" />
      </div>
      <div class="list">新密码
        <input class="input" type="text" placeholder="输入新密码" v-model="newpass1" />
      </div>
      <div class="list">重复新密码
        <input class="input" type="text" placeholder="再输入一次新密码" v-model="newpass2" />
      </div>
    </div>
    <div>
      <mt-button class="submit" size="large" type="primary" @click.native="submit">确定</mt-button>
      <mt-button class="submit" size="large" type="primary" @click.native="cancel">取消</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdatePassword',
  data () {
    return {
      id: '',
      username: '',
      department: '',
      password: '',
      roles: [],
      email: '',
      oldpass: '',
      newpass1: '',
      newpass2: '',
      popupVisible1: false,
      errorMsg: [],
      showErrorMsg: false
    }
  },
  created () {
    if (this.$store.state.userinfo.length > 0) {
      console.log('userinfo:', this.$store.state.userinfo)
      let userinfo = this.$store.state.userinfo[0]
      this.id = userinfo.id
      this.username = userinfo.username
      this.department = userinfo.department
      this.password = userinfo.password
      this.roles = userinfo.roles
      this.email = userinfo.email
    } else {
      this.$router.push({
        name: 'login'
      })
    }
  },
  methods: {
    submit () {
      if (this.oldpass === '') {
        this.errorMsg.push('当前密码内容不能为空！')
      }
      if (this.newpass1 === '') {
        this.errorMsg.push('新密码内容不能为空！')
      }
      if (this.newpass2 === '') {
        this.errorMsg.push('再次输入密码内容不能为空！')
      }
      if (this.oldpass !== this.password) {
        this.errorMsg.push('当前密码输入错误！')
      }
      if (this.errorMsg.length > 0) {
        this.showErrorMsg = true
        setTimeout(() => {
          this.showErrorMsg = false
          this.errorMsg = []
        }, 3000)
      } else {
        console.log('验证通过！')
        // 提交修改
        this.password = this.newpass1
        let userinfo = {}
        userinfo.id = this.id
        userinfo.department = this.department
        userinfo.username = this.username
        userinfo.password = this.password
        userinfo.roles = this.roles
        userinfo.email = this.email
        let data = JSON.stringify(userinfo)
        console.log(data)
        this.$axios
          .patch(`/users/${this.id}`, data)
          .then(response => {
            console.log('密码已修改！')
            // 重置当前用户信息
            this.$store.commit('setuserinfo', userinfo)
            console.log('userinfo:', userinfo)
            this.cancel()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    cancel () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped>
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

.submit {
  margin: 10px auto;
  width: 90%;
  text-align: center;
}
</style>
