<template>
  <div>
    <mt-header fixed title="okr详情"></mt-header>
    <!-- <div class="nav">
      <router-link to="/addOkrs">添加Okr</router-link> |
      <router-link to="/showOkrs">查看Okr</router-link> |
      <router-link to="/editOkrs">编辑Okr</router-link>
    </div> -->

    <div class="lists">
      <h3 class="list title">{{title}}</h3>
      <div class="list">
        <span class="title">部门</span>
        <span class="item">{{department}}</span>
        <span class="title">分类</span>
        <span class="item">{{category}}</span>
      </div>
      <div class="list">

        <span class="title">年份</span>
        <span class="item">{{year}}</span>
        <span class="title">期间</span>
        <span class="item">{{period}}</span>
      </div>
      <div class="list">

        <span class="title">责任人</span>
        <span class="item">{{people}}</span>
      </div>
      <div class="list item title">Objective(目标)</div>
      <div class="list" v-for="(items,index) in this.objectives" :key="index">
        <span class="item" @click="showKeyResults(items)">{{items.item}}</span>
        <!-- <span>
          <mt-button size="small" type="primary" @click.native="showKeyResults(items)">查看</mt-button>
        </span> -->
      </div>
      <div v-show="isShowKeyResults">
        <!-- <div class="list">
          <span class="title">Objective</span>
          <span class="item ">{{objective}}</span>
        </div> -->
        <div class="list item title">KeyResults(关键结果)</div>
        <div class="list" v-for="(item,index) in this.keyResult" :key="index">
          <div>{{item}}</div>
        </div>
      </div>

    </div>
    <mt-button class="submit" size="large" type="primary" @click.native="goEditOkrs">修改</mt-button>
    <mt-button class="submit" size="large" type="primary" @click.native="goBack">返回</mt-button>
  </div>
</template>

<script>
export default {
  name: 'showOkrs',
  data () {
    return {
      okr: {},
      department: '',
      people: '',
      category: '',
      year: '',
      period: '',
      isShowKeyResults: false,
      objective: '',
      objectives: [],
      keyResult: [],
      keyResults: []
    }
  },
  created () {
    if (this.$route.params.okr) {
      console.log(this.$route.params.okr)
      let okr = this.$route.params.okr
      this.okr = okr
      this.id = okr.id
      this.department = okr.department
      this.people = okr.people
      this.category = okr.category
      this.year = okr.year
      this.period = okr.period
      this.$axios
        .get(`/objectives?filter[where][pid]=${this.id}`)
        .then(response => {
          console.log(response)
          this.objectives = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
      this.$axios
        .get(`/key-results?filter[where][ppid]=${this.id}`)
        .then(response => {
          console.log(response)
          this.keyResults = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      this.$router.push({
        name: 'home'
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
    showKeyResults (items) {
      let pid = items.id
      this.objective = items.item
      this.isShowKeyResults = !this.isShowKeyResults
      this.keyResult = []
      let data = this.keyResults
      for (let i = 0; i < data.length; i++) {
        if (data[i].pid === pid) {
          this.keyResult.push(data[i].item)
        }
      }
    },
    goEditOkrs () {
      this.$router.push({
        name: 'editOkrs',
        params: {
          okr: this.okr,
          objectives: this.objectives,
          keyResults: this.keyResults
        }
      })
    },
    goBack () {
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
