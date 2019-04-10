<template>
  <div class="year">
    <div class="lists">
      <mt-cell title="年份管理" @click.native.native="showYearList"></mt-cell>

      <div class="list" v-show="isShowYearList" v-for="(item,index) in this.yearList" :key="index">
        <span class="item">{{item.item}}</span>
        <span>
          <mt-button size="small" type="primary" @click.native="updateYear(index,item.id)">修改</mt-button>
        </span>
        <mt-button size="small" type="danger" @click.native="delYear(index,item.id)">删除</mt-button>
      </div>
      <div class="list" v-show="isUpdateYear">
        <input class="input" type="text" placeholder="输入要修改的内容" v-model="year" />
        <mt-button size="small" type="primary" @click.native="updateYearYes">更新</mt-button>
        <mt-button size="small" type="primary" @click.native="updateYearNo">取消</mt-button>
      </div>
      <div class="list" v-show="isAddYear">
        <input class="input" type="text" placeholder="输入要添加的内容" v-model="year" />
        <mt-button size="small" type="primary" @click.native="addYear">添加</mt-button>
      </div>
    </div>

    <mt-popup v-model="popupVisible1" popup-transition="popup-fade">
      <p>添加内容不能为空！</p>
    </mt-popup>
    <mt-popup v-model="popupVisible2" popup-transition="popup-fade">
      <p>确定删除此条内容吗？</p>
      <mt-cell-swipe>
        <mt-button size="small" type="primary" @click.native="delYearYes">确定</mt-button>
        <mt-button size="small" type="primary" @click.native="delYearNo">取消</mt-button>
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
      isShowYearList: false,
      isAddYear: false,
      isUpdateYear: false,
      year: "",
      yearList: [],
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      index: -999,
      itemId: 0,
      yearData: {}
    };
  },
  created() {
    this.getYears();
  },
  methods: {
    getYears() {
      this.$axios
        .get("/years")
        .then(response => {
          console.log(response);
          this.yearList = response.data;
          if (this.yearList.length > 0) {
            this.yearId = this.yearList[this.yearList.length - 1].id;
          } else {
            this.yearId = 0;
          }
          console.log("this.yearId = ", this.yearId);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveYear() {
      this.$axios
        .post("/years", this.yearData)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showYearList() {
      this.isShowYearList = !this.isShowYearList;
      this.isAddYear = !this.isAddYear;
    },
    showAddYear() {
      this.isAddYear = true;
    },
    addYear() {
      if (this.year.length > 0) {
        let data = {};
        this.yearId += 1;
        data.id = this.yearId;
        data.item = this.year;
        this.yearData = JSON.stringify(data);
        this.yearList.push(data);
        this.saveYear();
        this.year = "";
      } else {
        this.popupVisible1 = true;
        setTimeout(() => {
          this.popupVisible1 = false;
        }, 2000);
      }
    },
    delYear(index, id) {
      this.popupVisible2 = true;
      this.index = index;
      this.itemId = id;
    },
    delYearYes() {
      console.log("deleted!");
      this.yearList.splice(this.index, 1);
      this.$axios
        .delete(`/years/${this.itemId}`)
        .then(response => {
          console.log(response);
          if (this.yearList.length > 0) {
            this.yearId = this.yearList[this.yearList.length - 1].id;
          } else {
            this.yearId = 0;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      this.popupVisible2 = false;
    },
    delYearNo() {
      this.popupVisible2 = false;
    },
    updateYear(index, id) {
      this.isUpdateYear = true;
      this.isAddYear = false;
      this.index = index;
      this.itemId = id;
    },
    updateYearYes() {
      console.log("updated!");
      // 更新的业务逻辑
      if (this.year.length > 0) {
        this.yearList[this.index].item = this.year;
        let data = {};
        data.id = this.yearId;
        data.item = this.year;
        this.yearData = JSON.stringify(data);
        this.$axios
          .patch(`/years/${this.itemId}`, this.yearData)
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

      this.isAddYear = true;
      this.isUpdateYear = false;
      this.year = "";
    },
    updateYearNo() {
      this.isAddYear = true;
      this.isUpdateYear = false;
      this.year = "";
    }
  }
};
</script>

<style scoped>
</style>
