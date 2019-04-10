<template>
  <div class="role">
    <div class="lists">
      <mt-cell title="角色管理" @click.native="showRoleList"></mt-cell>

      <div class="list" v-show="isShowRoleList" v-for="(item,index) in this.roleList" :key="index">
        <span class="item">{{item.item}}</span>
        <span>
          <mt-button size="small" type="primary" @click.native="updateRole(index,item.id)">修改</mt-button>
        </span>
        <mt-button size="small" type="danger" @click.native="delRole(index,item.id)">删除</mt-button>
      </div>
      <div class="list" v-show="isUpdateRole">
        <input class="input" type="text" placeholder="输入要修改的内容" v-model="role" />
        <mt-button size="small" type="primary" @click.native="updateRoleYes">更新</mt-button>
        <mt-button size="small" type="primary" @click.native="updateRoleNo">取消</mt-button>
      </div>
      <div class="list" v-show="isAddRole">
        <input class="input" type="text" placeholder="输入要添加的内容" v-model="role" />
        <mt-button size="small" type="primary" @click.native="addRole">添加</mt-button>
      </div>
    </div>

    <mt-popup v-model="popupVisible1" popup-transition="popup-fade">
      <p>添加内容不能为空！</p>
    </mt-popup>
    <mt-popup v-model="popupVisible2" popup-transition="popup-fade">
      <p>确定删除此条内容吗？</p>
      <mt-cell-swipe>
        <mt-button size="small" type="primary" @click.native="delRoleYes">确定</mt-button>
        <mt-button size="small" type="primary" @click.native="delRoleNo">取消</mt-button>
      </mt-cell-swipe>
    </mt-popup>
    <mt-popup v-model="popupVisible3" popup-transition="popup-fade">
      <p>修改内容不能为空！</p>
    </mt-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowRoleList: false,
      isAddRole: false,
      isUpdateRole: false,
      role: "",
      roleList: [],
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      index: -999,
      itemId: 0,
      roleData: {}
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    getRoles() {
      this.$axios
        .get("/roles")
        .then(response => {
          console.log(response);
          this.roleList = response.data;
          if (this.roleList.length > 0) {
            this.roleId = this.roleList[this.roleList.length - 1].id;
          } else {
            this.roleId = 0;
          }
          console.log("this.roleId = ", this.roleId);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveRole() {
      this.$axios
        .post("/roles", this.roleData)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showRoleList() {
      this.isShowRoleList = !this.isShowRoleList;
      this.isAddRole = !this.isAddRole;
    },
    showAddRole() {
      this.isAddRole = true;
    },
    addRole() {
      if (this.role.length > 0) {
        let data = {};
        this.roleId += 1;
        data.id = this.roleId;
        data.item = this.role;
        this.roleData = JSON.stringify(data);
        this.roleList.push(data);
        this.saveRole();
        this.role = "";
      } else {
        this.popupVisible1 = true;
        setTimeout(() => {
          this.popupVisible1 = false;
        }, 2000);
      }
    },
    delRole(index, id) {
      this.popupVisible2 = true;
      this.index = index;
      this.itemId = id;
    },
    delRoleYes() {
      console.log("deleted!");
      this.roleList.splice(this.index, 1);
      this.$axios
        .delete(`/roles/${this.itemId}`)
        .then(response => {
          console.log(response);
          if (this.roleList.length > 0) {
            this.roleId = this.roleList[this.roleList.length - 1].id;
          } else {
            this.roleId = 0;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      this.popupVisible2 = false;
    },
    delRoleNo() {
      this.popupVisible2 = false;
    },
    updateRole(index, id) {
      this.isUpdateRole = true;
      this.isAddRole = false;
      this.index = index;
      this.itemId = id;
    },
    updateRoleYes() {
      console.log("updated!");
      // 更新的业务逻辑
      if (this.role.length > 0) {
        this.roleList[this.index].item = this.role;
        let data = {};
        data.id = this.roleId;
        data.item = this.role;
        this.roleData = JSON.stringify(data);
        this.$axios
          .patch(`/roles/${this.itemId}`, this.roleData)
          .then(response => {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.popupVisible3 = true;
        setTimeout(() => {
          this.popupVisible3 = false;
        }, 2000);
      }

      this.isAddRole = true;
      this.isUpdateRole = false;
      this.role = "";
    },
    updateRoleNo() {
      this.isAddRole = true;
      this.isUpdateRole = false;
      this.role = "";
    }
  }
};
</script>

<style scoped>
</style>
