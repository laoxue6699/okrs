<template>
  <div id="app">
    <div class="content">
      <div v-show="isLogin" class="list">
       <span  class="main-nav" @click="logout">退出</span>
       <span  class="main-nav" @click="goUpdatePassword">修改密码</span>
    </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    logout () {
      this.$store.commit('setuserinfo', {})
      this.$store.commit('setisAdmin', false)
      this.$store.commit('setisLogin', false)
      this.$router.push({
        name: 'login'
      })
    },
    goUpdatePassword () {
      this.$router.push({
        name: 'updatePassword'
      })
    }
  }
}
</script>

<style>
html,
body {
  background-color: #fafafa;
  -webkit-overflow-scrolling: touch;
  user-select: none;
}

a {
  color: inherit;
}

.content {
  margin-top: 50px;
  text-align: center;
}
.main-nav,
.right a {
  margin: 5px;
  padding: 0 5px;
  color: #26a2ff;
  text-decoration: none;
  border: #26a2ff 1px solid;
}
.mint-header.is-fixed {
  background-color: #003399;
}

h1.mint-header-title {
  font-size: 18px;
}
.lists {
  padding-top: 15px;
}

.list {
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin: 0 15px;
  border-bottom: 1px solid #ccc;
}

.mint-button--small {
  margin-left: 5px;
}

.input {
  flex: 1;
  height: 25px;
}

span.item {
  flex: 1;
}

.mint-cell {
  margin: 0 15px;
  border-bottom: 1px solid #ccc;
}

.mint-popup {
  padding: 10px;
  color: deepskyblue;
}
</style>
