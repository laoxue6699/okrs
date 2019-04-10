<template>
  <div class="period">
    <div class="lists">
      <mt-cell title="期间管理" @click.native.native="showPeriodList"></mt-cell>

      <div class="list" v-show="isShowPeriodList" v-for="(item,index) in this.periodList" :key="index">
        <span class="item">{{item.item}}</span>
        <span>
          <mt-button size="small" type="primary" @click.native="updatePeriod(index,item.id)">修改</mt-button>
        </span>
        <mt-button size="small" type="danger" @click.native="delPeriod(index,item.id)">删除</mt-button>
      </div>
      <div class="list" v-show="isUpdatePeriod">
        <input class="input" type="text" placeholder="输入要修改的内容" v-model="period" />
        <mt-button size="small" type="primary" @click.native="updatePeriodYes">更新</mt-button>
        <mt-button size="small" type="primary" @click.native="updatePeriodNo">取消</mt-button>
      </div>
      <div class="list" v-show="isAddPeriod">
        <input class="input" type="text" placeholder="输入要添加的内容" v-model="period" />
        <mt-button size="small" type="primary" @click.native="addPeriod">添加</mt-button>
      </div>
    </div>

    <mt-popup v-model="popupVisible1" popup-transition="popup-fade">
      <p>添加内容不能为空！</p>
    </mt-popup>
    <mt-popup v-model="popupVisible2" popup-transition="popup-fade">
      <p>确定删除此条内容吗？</p>
      <mt-cell-swipe>
        <mt-button size="small" type="primary" @click.native="delPeriodYes">确定</mt-button>
        <mt-button size="small" type="primary" @click.native="delPeriodNo">取消</mt-button>
      </mt-cell-swipe>
    </mt-popup>
    <mt-popup v-model="popupVisible3" popup-transition="popup-fade">
      <p>修改内容不能为空！</p>
    </mt-popup>

  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowPeriodList: false,
      isAddPeriod: false,
      isUpdatePeriod: false,
      period: '',
      periodList: [],
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      index: -999,
      itemId: 0,
      periodData: {}
    }
  },
  created () {
    this.getPeriods()
  },
  methods: {
    getPeriods () {
      this.$axios
        .get('/periods')
        .then(response => {
          console.log(response)
          this.periodList = response.data
          if (this.periodList.length > 0) {
            this.periodId = this.periodList[this.periodList.length - 1].id
          } else {
            this.periodId = 0
          }
          console.log('this.periodId = ', this.periodId)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    savePeriod () {
      this.$axios
        .post('/periods', this.periodData)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    showPeriodList () {
      this.isShowPeriodList = !this.isShowPeriodList
      this.isAddPeriod = !this.isAddPeriod
    },
    showAddPeriod () {
      this.isAddPeriod = true
    },
    addPeriod () {
      if (this.period.length > 0) {
        let data = {}
        this.periodId += 1
        data.id = this.periodId
        data.item = this.period
        this.periodData = JSON.stringify(data)
        this.periodList.push(data)
        this.savePeriod()
        this.period = ''
      } else {
        this.popupVisible1 = true
        setTimeout(() => {
          this.popupVisible1 = false
        }, 2000)
      }
    },
    delPeriod (index, id) {
      this.popupVisible2 = true
      this.index = index
      this.itemId = id
    },
    delPeriodYes () {
      console.log('deleted!')
      this.periodList.splice(this.index, 1)
      this.$axios
        .delete(`/periods/${this.itemId}`)
        .then(response => {
          console.log(response)
          if (this.periodList.length > 0) {
            this.periodId = this.periodList[this.periodList.length - 1].id
          } else {
            this.periodId = 0
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      this.popupVisible2 = false
    },
    delPeriodNo () {
      this.popupVisible2 = false
    },
    updatePeriod (index, id) {
      this.isUpdatePeriod = true
      this.isAddPeriod = false
      this.index = index
      this.itemId = id
    },
    updatePeriodYes () {
      console.log('updated!')
      // 更新的业务逻辑
      if (this.period.length > 0) {
        this.periodList[this.index].item = this.period
        let data = {}
        data.id = this.periodId
        data.item = this.period
        this.periodData = JSON.stringify(data)
        this.$axios
          .patch(`/periods/${this.itemId}`, this.periodData)
          .then(response => {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.popupVisible3 = true
        setTimeout(() => {
          this.popupVisible3 = false
        }, 2000)
      }

      this.isAddPeriod = true
      this.isUpdatePeriod = false
      this.period = ''
    },
    updatePeriodNo () {
      this.isAddPeriod = true
      this.isUpdatePeriod = false
      this.period = ''
    }
  }
}
</script>

<style scoped>
</style>
