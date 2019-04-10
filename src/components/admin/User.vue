<template>
  <div class="user">
    <div class="lists">
      <mt-cell title="用户管理" @click.native="showUserList"></mt-cell>
      <div class="list" v-show="isShowUserList" v-for="(item,index) in this.userList" :key="index">
        <span class="item department">{{item.department}}</span>
        <span class="item username">{{item.username}}</span>
        <span class="button">
          <mt-button size="small" type="primary" @click.native="showUser(item)">查看</mt-button>
          <mt-button size="small" type="danger" @click.native="updateUser(item)">修改</mt-button>
        </span>
      </div>
      <div v-show="isShowUser">
        <div class="list">部门<span class="must">*</span>
          <span class="item">{{this.department}}</span>
        </div>
        <div class="list">姓名<span class="must">*</span>
          <span class="item">{{this.username}}</span>
        </div>
        <div class="list">密码<span class="must">*</span>
          <span class="item">{{this.password}}</span>
        </div>
        <div class="list">角色<span class="must">*</span>
          <span class="item">{{this.roles}}</span>
        </div>
        <div class="list">邮箱
          <span class="item">{{this.email}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      username: '',
      department: '',
      password: '',
      roles: [],
      email: '',
      userList: [],
      isShowUserList: false,
      isShowUser: false
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$axios
        .get("/users?filter[order]='department'")
        .then(response => {
          console.log(response)
          this.userList = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    showUserList () {
      this.isShowUserList = !this.isShowUserList
      //   this.isAddRole = !this.isAddRole;
    },
    updateUser (item) {
      let userinfo = item
      this.$router.push({
        name: 'updateUser',
        params: userinfo
      })
    },
    showUser (data) {
      this.isShowUser = true
      this.isShowUserList = false
      this.username = data.username
      this.department = data.department
      this.password = data.password
      this.roles = data.roles
      this.email = data.email
      setTimeout(() => {
        this.isShowUser = false
        this.isShowUserList = true
      }, 3000)
    }
  }
}
</script>

<style scoped>
.item {
  margin-left: 20px;
  color: #000;
}

.department {
  flex: 3;
  color: cornflowerblue;
}

.username {
  flex: 2;
}

.button {
  flex: 4;
}

.list {
  line-height: 25px;
  color: mediumblue;
}

.must {
  color: crimson;
}
</style>
