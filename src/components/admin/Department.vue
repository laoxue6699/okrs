<template>
  <div class="department">
    <div class="lists">
      <mt-cell title="部门管理" @click.native.native="showDepartmentList"></mt-cell>

      <div class="list" v-show="isShowDepartmentList" v-for="(item,index) in this.departmentList" :key="index">
        <span class="item">{{item.item}}</span>
        <span>
          <mt-button size="small" type="primary" @click.native="updateDepartment(index,item)">修改</mt-button>
        </span>
        <mt-button size="small" type="danger" @click.native="delDepartment(index,item.id)">删除</mt-button>
      </div>
      <div class="list" v-show="isUpdateDepartment">
        <input class="input" type="text" :placeholder="this.department" v-model="department" />
        <mt-button size="small" type="primary" @click.native="updateDepartmentYes">更新</mt-button>
        <mt-button size="small" type="primary" @click.native="updateDepartmentNo">取消</mt-button>
      </div>
      <div class="list" v-show="isAddDepartment">
        <input class="input" type="text" placeholder="输入要添加的内容" v-model="department" />
        <mt-button size="small" type="primary" @click.native="addDepartment">添加</mt-button>
      </div>
    </div>

    <mt-popup v-model="popupVisible1" popup-transition="popup-fade">
      <p>添加内容不能为空！</p>
    </mt-popup>
    <mt-popup v-model="popupVisible2" popup-transition="popup-fade">
      <p>确定删除此条内容吗？</p>
      <mt-cell-swipe>
        <mt-button size="small" type="primary" @click.native="delDepartmentYes">确定</mt-button>
        <mt-button size="small" type="primary" @click.native="delDepartmentNo">取消</mt-button>
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
      isShowDepartmentList: false,
      isAddDepartment: false,
      isUpdateDepartment: false,
      department: "",
      departmentList: [],
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      index: -999,
      itemId: 0,
      departmentData: {}
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    getDepartments() {
      this.$axios
        .get("/departments")
        .then(response => {
          console.log(response);
          this.departmentList = response.data;
          if (this.departmentList.length > 0) {
            this.departmentId = this.departmentList[
              this.departmentList.length - 1
            ].id;
          } else {
            this.departmentId = 0;
          }
          console.log("this.departmentId = ", this.departmentId);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveDepartment() {
      this.$axios
        .post("/departments", this.departmentData)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showDepartmentList() {
      this.isShowDepartmentList = !this.isShowDepartmentList;
      this.isAddDepartment = !this.isAddDepartment;
    },
    showAddDepartment() {
      this.isAddDepartment = true;
    },
    addDepartment() {
      if (this.department.length > 0) {
        let data = {};
        this.departmentId += 1;
        data.id = this.departmentId;
        data.item = this.department;
        this.departmentData = JSON.stringify(data);
        this.departmentList.push(data);
        this.saveDepartment();
        this.department = "";
      } else {
        this.popupVisible1 = true;
        setTimeout(() => {
          this.popupVisible1 = false;
        }, 2000);
      }
    },
    delDepartment(index, id) {
      this.popupVisible2 = true;
      this.index = index;
      this.itemId = id;
    },
    delDepartmentYes() {
      console.log("deleted!");
      this.departmentList.splice(this.index, 1);
      this.$axios
        .delete(`/departments/${this.itemId}`)
        .then(response => {
          console.log(response);
          if (this.departmentList.length > 0) {
            this.departmentId = this.departmentList[
              this.departmentList.length - 1
            ].id;
          } else {
            this.departmentId = 0;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      this.popupVisible2 = false;
    },
    delDepartmentNo() {
      this.popupVisible2 = false;
    },
    updateDepartment(index, item) {
      this.isShowDepartmentList = false;
      this.isUpdateDepartment = true;
      this.isAddDepartment = false;
      this.index = index;
      this.itemId = item.id;
      this.department = item.item;
    },
    updateDepartmentYes() {
      console.log("updated!");
      // 更新的业务逻辑
      if (this.department.length > 0) {
        this.departmentList[this.index].item = this.department;
        let data = {};
        data.id = this.departmentId;
        data.item = this.department;
        this.departmentData = JSON.stringify(data);
        this.$axios
          .patch(`/departments/${this.itemId}`, this.departmentData)
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

      this.isShowDepartmentList = true;
      this.isAddDepartment = true;
      this.isUpdateDepartment = false;
      this.department = "";
    },
    updateDepartmentNo() {
      this.isShowDepartmentList = true;
      this.isAddDepartment = true;
      this.isUpdateDepartment = false;
      this.department = "";
    }
  }
};
</script>

<style scoped>
</style>
