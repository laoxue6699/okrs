<template>
  <div>
    <mt-header fixed title="添加Okr"></mt-header>
    <div class="nav">
      <router-link to="/addOkrs">添加Okr</router-link> |
      <router-link to="/showOkrs">查看Okr</router-link> |
      <router-link to="/editOkrs">编辑Okr</router-link>
    </div>

    <div class="list errorMsg" v-show="showErrorMsg">{{errorMsg}}</div>

    <div class="lists">
      <h3 class="list title">{{title}}</h3>

      <div class="list">
        <span class="title">部门</span>
        <span class="item">{{department}}</span>
        <span class="title">分类</span>
        <span class="item" @click="selectCategory">{{category}}</span>
      </div>
      <mt-radio v-show="popupVisible1" class="page-part" title="" v-model="category" :options="optionsCategory">
      </mt-radio>
      <div class="list">

        <span class="title">年份</span>
        <span class="item" @click="selectYear">{{year}}</span>
        <span class="title">期间</span>
        <span class="item" @click="selectPeriod">{{period}}</span>
      </div>
      <mt-radio v-show="popupVisible2" class="page-part" title="" v-model="year" :options="optionsYear">
      </mt-radio>
      <mt-radio v-show="popupVisible3" class="page-part" title="" v-model="period" :options="optionsPeriod">
      </mt-radio>
      <div class="list">
        <span class="title">责任人</span>
        <span class="item">{{people}}</span>
      </div>

      <div class="list item title">Objective(目标)</div>
      <div class="list" v-for="(items,index) in this.objectives" :key="index">
        <span class="item" @click="showKeyResults(items)">{{index+1}}-{{items.item}}</span>
        <span>
          <mt-button size="small" type="danger" @click.native="delObjective(items,index)">删除</mt-button>
        </span>
      </div>
      <div class="list" v-show="!isShowKeyResults">
        <input class="input" type="text" placeholder="输入要添加的目标" v-model="objectiveItem" />
        <mt-button size="small" type="primary" @click.native="addObjective">添加</mt-button>
      </div>

      <div class="list errorMsg" v-show="showErrorMsg">{{errorMsg}}</div>

      <div v-show="isShowKeyResults">
        <!-- <div class="list">
          <span class="title">Objective</span>
          <span class="item ">{{objective}}</span>
        </div> -->
        <div class="list item title">KeyResults(关键结果)</div>
        <div class="list" v-for="(item,index) in this.keyResult" :key="index">
          <span class="item ">{{index+1}}-{{item.item}}</span>
          <span>
            <mt-button size="small" type="danger" @click.native="delKeyResult(item,index)">删除</mt-button>
          </span>
        </div>
        <div class="list">
          <input class="input" type="text" placeholder="输入要添加的关键结果" v-model="keyResultItem" />
          <mt-button size="small" type="primary" @click.native="addkeyResult">添加</mt-button>
        </div>
      </div>

    </div>
    <div>
      <mt-button class="submit" size="large" type="primary" @click.native="submit">提交</mt-button>
      <mt-button class="submit" size="large" type="primary" @click.native="cancel">不再添加</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addOkrs',
  data () {
    return {
      id: '',
      opid: '',
      okid: '',
      department: '',
      people: '',
      category: '',
      year: '',
      period: '',
      errorMsg: [],
      showErrorMsg: false,
      isShowKeyResults: false,
      popupVisible1: false,
      popupVisible2: false,
      popupVisible3: false,
      optionsCategory: [],
      optionsYear: [],
      optionsPeriod: [],
      objective: '',
      objectiveItem: '',
      keyResultItem: '',
      objectives: [],
      keyResult: [],
      keyResults: []
    }
  },
  created () {
    this.getCategory()
    this.getYear()
    this.getPeriod()
    this.id = this.guid()
    this.opid = this.id
    console.log('id=', this.id)
  },
  mounted () {
    if (this.$store.state.userinfo.length > 0) {
      console.log(this.$store.state.userinfo)
      this.department = this.$store.state.userinfo[0].department
      this.people = this.$store.state.userinfo[0].username
    } else {
      this.$router.push({
        name: 'login'
      })
    }
  },
  computed: {
    title: function () {
      return (
        this.people + this.year + this.period + 'okr(' + this.category + ')'
      )
    }
  },
  methods: {
    guid () {
      function S4 () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
      )
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
    selectCategory () {
      this.popupVisible1 = !this.popupVisible1
      if (this.popupVisible1 === true) {
        this.popupVisible2 = false
        this.popupVisible3 = false
      }
      setTimeout(() => {
        this.popupVisible1 = false
      }, 2000)
    },
    selectYear () {
      this.popupVisible2 = !this.popupVisible2
      if (this.popupVisible2 === true) {
        this.popupVisible1 = false
        this.popupVisible3 = false
      }
      setTimeout(() => {
        this.popupVisible2 = false
      }, 2000)
    },
    selectPeriod () {
      this.popupVisible3 = !this.popupVisible3
      if (this.popupVisible3 === true) {
        this.popupVisible1 = false
        this.popupVisible2 = false
      }
      setTimeout(() => {
        this.popupVisible3 = false
      }, 2000)
    },

    showKeyResults (items) {
      this.kpid = items.id
      let pid = items.id
      this.objective = items.item
      this.isShowKeyResults = !this.isShowKeyResults
      this.keyResult = []
      let data = this.keyResults
      for (let i = 0; i < data.length; i++) {
        if (data[i].pid === pid) {
          this.keyResult.push(data[i])
        }
      }
    },
    addObjective () {
      if (this.objectiveItem === '') {
        this.errorMsg.push('添加的目标内容不能为空！')
      }
      if (this.errorMsg.length > 0) {
        this.showErrorMsg = true
        setTimeout(() => {
          this.showErrorMsg = false
          this.errorMsg = []
        }, 3000)
      } else {
        let data = {}
        data.id = this.guid()
        this.kpid = data.id
        data.pid = this.opid
        data.item = this.objectiveItem
        this.objectives.push(data)
        console.log(data, '添加成功！')
        this.objectiveItem = ''
      }
    },
    delObjective (items, index) {
      // console.log(index, items);
      this.objectives.splice(index, 1)
      let kpid = items.id
      let data = this.keyResults
      console.log(data)
      let data1 = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].pid !== kpid) {
          data1.push(data[i])
        }
      }
      console.log(data1)
      this.keyResults = data1
      console.log(items.item, '目标删除成功！')
      this.isShowKeyResults = false
    },
    addkeyResult () {
      if (this.keyResultItem === '') {
        this.errorMsg.push('添加的关键结果内容不能为空！')
      }
      if (this.errorMsg.length > 0) {
        this.showErrorMsg = true
        setTimeout(() => {
          this.showErrorMsg = false
          this.errorMsg = []
        }, 3000)
      } else {
        let data = {}
        data.id = this.guid()
        data.pid = this.kpid
        data.ppid = this.opid
        data.item = this.keyResultItem
        this.keyResult.push(data)
        this.keyResults.push(data)
        console.log(data, '添加成功！')
        this.keyResultItem = ''
      }
    },
    delKeyResult (items, index) {
      // console.log(item, index);
      this.keyResult.splice(index, 1)
      let kid = items.id
      this.keyResults.splice(
        this.keyResults.findIndex(item => item.id === kid),
        1
      )

      console.log(items.item, index, '被删除')
    },
    submit () {
      if (this.category === '') {
        this.errorMsg.push('请选择分类！')
      }
      if (this.year === '') {
        this.errorMsg.push('请选择年份！')
      }
      if (this.period === '') {
        this.errorMsg.push('请选择期间！')
      }
      if (this.objectives.length < 1) {
        this.errorMsg.push('目标内容不能为空！')
      }
      // 此处可以做一个遍历，判断每一个目标下面都必须有一个以上的关键结果
      for (let i = 0; i < this.objectives.length; i++) {
        let pid = this.objectives[i].id
        let otitle = this.objectives[i].item
        let karr = this.keyResults.filter(item => item.pid === pid)
        console.log(otitle, karr)
        if (karr < 1) {
          this.errorMsg.push(otitle + '的关键结果不能为空！')
        }
      }
      if (this.errorMsg.length > 0) {
        this.showErrorMsg = true
        setTimeout(() => {
          this.showErrorMsg = false
          this.errorMsg = []
        }, 3000)
      } else {
        console.log('验证通过！')
        let data = {}
        data.id = this.id
        data.title = this.title
        data.department = this.department
        data.category = this.category
        data.year = this.year
        data.period = this.period
        data.people = this.people
        data = JSON.stringify(data)
        console.log('okr', data)

        this.$axios
          .post('/okrs', data)
          .then(response => {
            console.log('okr添加成功！')
          })
          .catch(function (error) {
            console.log(error)
          })

        for (let i = 0; i < this.objectives.length; i++) {
          data = {}
          data.id = this.objectives[i].id
          data.pid = this.objectives[i].pid
          data.item = this.objectives[i].item
          data = JSON.stringify(data)
          console.log('objective', data)

          this.$axios
            .post('/objectives', data)
            .then(response => {
              console.log('objectives添加成功！')
            })
            .catch(function (error) {
              console.log(error)
            })
        }

        for (let i = 0; i < this.keyResults.length; i++) {
          data = {}
          data.id = this.keyResults[i].id
          data.pid = this.keyResults[i].pid
          data.ppid = this.keyResults[i].ppid
          data.item = this.keyResults[i].item
          data = JSON.stringify(data)
          console.log('objective', data)

          this.$axios
            .post('/key-results', data)
            .then(response => {
              console.log('keyResults添加成功！')
            })
            .catch(function (error) {
              console.log(error)
            })
        }
        this.reset()
      }
    },
    reset () {
      this.id = this.guid()
      this.opid = this.id
      this.category = ''
      this.year = ''
      this.period = ''
      this.objective = ''
      this.objectives = []
      this.keyResult = []
      this.keyResults = []
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
.nav {
  padding-top: 15px;
}

.errorMsg {
  color: crimson;
  padding: 15px;
}

.item {
  text-align: left;
  flex: 2;
}

.title {
  color: cornflowerblue;
  flex: 1;
  text-align: left;
}

.submit {
  margin: 10px auto;
  width: 90%;
  text-align: center;
}
</style>
