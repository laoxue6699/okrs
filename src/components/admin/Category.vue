<template>
  <div class="category">
    <div class="lists">
      <mt-cell title="分类管理" @click.native.native="showCategoryList"></mt-cell>

      <div class="list" v-show="isShowCategoryList" v-for="(item,index) in this.categoryList" :key="index">
        <span class="item">{{item.item}}</span>
        <span>
          <mt-button size="small" type="primary" @click.native="updateCategory(index,item.id)">修改</mt-button>
        </span>
        <mt-button size="small" type="danger" @click.native="delCategory(index,item.id)">删除</mt-button>
      </div>
      <div class="list" v-show="isUpdateCategory">
        <input class="input" type="text" placeholder="输入要修改的内容" v-model="category" />
        <mt-button size="small" type="primary" @click.native="updateCategoryYes">更新</mt-button>
        <mt-button size="small" type="primary" @click.native="updateCategoryNo">取消</mt-button>
      </div>
      <div class="list" v-show="isAddCategory">
        <input class="input" type="text" placeholder="输入要添加的内容" v-model="category" />
        <mt-button size="small" type="primary" @click.native="addCategory">添加</mt-button>
      </div>
    </div>

    <mt-popup v-model="popupVisible1" popup-transition="popup-fade">
      <p>添加内容不能为空！</p>
    </mt-popup>
    <mt-popup v-model="popupVisible2" popup-transition="popup-fade">
      <p>确定删除此条内容吗？</p>
      <mt-cell-swipe>
        <mt-button size="small" type="primary" @click.native="delCategoryYes">确定</mt-button>
        <mt-button size="small" type="primary" @click.native="delCategoryNo">取消</mt-button>
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
      isShowCategoryList: false,
      isAddCategory: false,
      isUpdateCategory: false,
      category: "",
      categoryList: [],
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      index: -999,
      itemId: 0,
      categoryData: {}
    };
  },
  created() {
    this.getCategorys();
  },
  methods: {
    getCategorys() {
      this.$axios
        .get("/categories")
        .then(response => {
          console.log(response);
          this.categoryList = response.data;
          if (this.categoryList.length > 0) {
            this.categoryId = this.categoryList[
              this.categoryList.length - 1
            ].id;
          } else {
            this.categoryId = 0;
          }
          console.log("this.categoryId = ", this.categoryId);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    saveCategory() {
      this.$axios
        .post("/categories", this.categoryData)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    showCategoryList() {
      this.isShowCategoryList = !this.isShowCategoryList;
      this.isAddCategory = !this.isAddCategory;
    },
    showAddCategory() {
      this.isAddCategory = true;
    },
    addCategory() {
      if (this.category.length > 0) {
        let data = {};
        this.categoryId += 1;
        data.id = this.categoryId;
        data.item = this.category;
        this.categoryData = JSON.stringify(data);
        this.categoryList.push(data);
        this.saveCategory();
        this.category = "";
      } else {
        this.popupVisible1 = true;
        setTimeout(() => {
          this.popupVisible1 = false;
        }, 2000);
      }
    },
    delCategory(index, id) {
      this.popupVisible2 = true;
      this.index = index;
      this.itemId = id;
    },
    delCategoryYes() {
      console.log("deleted!");
      this.categoryList.splice(this.index, 1);
      this.$axios
        .delete(`/categories/${this.itemId}`)
        .then(response => {
          console.log(response);
          if (this.categoryList.length > 0) {
            this.categoryId = this.categoryList[
              this.categoryList.length - 1
            ].id;
          } else {
            this.categoryId = 0;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      this.popupVisible2 = false;
    },
    delCategoryNo() {
      this.popupVisible2 = false;
    },
    updateCategory(index, id) {
      this.isUpdateCategory = true;
      this.isAddCategory = false;
      this.index = index;
      this.itemId = id;
    },
    updateCategoryYes() {
      console.log("updated!");
      // 更新的业务逻辑
      if (this.category.length > 0) {
        this.categoryList[this.index].item = this.category;
        let data = {};
        data.id = this.categoryId;
        data.item = this.category;
        this.categoryData = JSON.stringify(data);
        this.$axios
          .patch(`/categories/${this.itemId}`, this.categoryData)
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

      this.isAddCategory = true;
      this.isUpdateCategory = false;
      this.category = "";
    },
    updateCategoryNo() {
      this.isAddCategory = true;
      this.isUpdateCategory = false;
      this.category = "";
    }
  }
};
</script>

<style scoped>
</style>
