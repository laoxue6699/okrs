<template>
  <div class="centered-container">
    <mt-header fixed title="用户注册"></mt-header>
    <div :v-show="isAdmin" class="list right">
      <router-link to="/admin">后台管理</router-link>
      <router-link to="/register">用户注册</router-link>
      <router-link to="/home">okrs管理</router-link>
      
     </div> 
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
      <div class="list">角色<span class="must">*</span>
        <span class="item" @click="selectRole">{{this.roles}}</span>
      </div>
      <mt-checklist v-show="popupVisible2" class="page-part" title="" v-model="roles" :options="optionsRoles">
      </mt-checklist>
      <div class="list">邮箱
        <input class="input" type="text" placeholder="输入邮箱地址" v-model="email" />
      </div>
    </div>
    <div>
      <mt-button class="submit" size="large" type="primary" @click.native="submit">提交</mt-button>
      <mt-button class="submit" size="large" type="primary" @click.native="reset">重置</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      id: "",
      username: "",
      department: "",
      password: "",
      roles: [],
      email: "",
      popupVisible1: false,
      popupVisible2: false,
      errorMsg: [],
      showErrorMsg: false,
      optionsDepartment: [],
      optionsRoles: []
    };
  },
  created() {
    this.getDepartments();
    this.getRoles();
  },
  computed: {
    isAdmin: function() {
      return this.$store.state.isAdmin;
    }
  },
  methods: {
    getDepartments() {
      this.$axios
        .get("/departments")
        .then(response => {
          console.log(response);
          this.departmentList = response.data;
          let data = response.data;
          let values = [];
          for (let i = 0; i < data.length; i++) {
            values.push(data[i].item);
          }
          this.optionsDepartment = values;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectDepartment() {
      this.popupVisible1 = !this.popupVisible1;
    },
    getRoles() {
      this.$axios
        .get("/roles")
        .then(response => {
          console.log(response);
          this.roleList = response.data;
          let data = response.data.reverse();
          let values = [];
          for (let i = 0; i < data.length; i++) {
            values.push(data[i].item);
          }
          this.optionsRoles = values;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectRole() {
      this.popupVisible2 = !this.popupVisible2;
    },
    onRoleChange(picker, values) {
      this.role = values[0];
    },
    guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    },
    submit() {
      if (this.department === "") {
        this.errorMsg.push("所属部门不能为空！");
      }
      if (this.username === "") {
        this.errorMsg.push("用户名不能为空！");
      }
      if (this.password === "") {
        this.errorMsg.push("密码不能为空！");
      }
      if (this.roles === "") {
        this.errorMsg.push("角色不能为空！");
      }
      if (this.email !== "") {
        let reg = new RegExp(
          "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
        );
        if (reg.test(this.email)) {
          console.log("email ok");
        } else {
          console.log("email error!");
          this.errorMsg.push("邮箱地址格式错误！");
        }
      }
      if (this.errorMsg.length > 0) {
        this.showErrorMsg = true;
        setTimeout(() => {
          this.showErrorMsg = false;
          this.errorMsg = [];
        }, 3000);
      } else {
        console.log("验证通过！");
        // 生成uuid
        this.id = this.guid();
        // console.log("id", this.id);
        let userinfo = {};
        userinfo.id = this.id;
        userinfo.department = this.department;
        userinfo.username = this.username;
        userinfo.password = this.password;
        userinfo.roles = this.roles;
        userinfo.email = this.email;
        userinfo = JSON.stringify(userinfo);
        console.log(userinfo);
        this.$axios
          .post("/users", userinfo)
          .then(response => {
            // console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      this.reset();
    },
    reset() {
      this.department = "";
      this.roles = [];
      this.username = "";
      this.password = "";
      this.email = "";
    }
  }
};
</script>

<style scoped>
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
