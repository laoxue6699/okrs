<template>
    <div class="admin">
        <mt-header fixed title="后台管理"></mt-header>
        <div :v-show="isAdmin" class="list right">
          <router-link to="/admin">后台管理</router-link>
      <router-link to="/register">用户注册</router-link>
      <router-link to="/home">okrs管理</router-link>

     </div>
        <department />
        <category />
        <year />
        <period />
        <role />
        <user />
    </div>
</template>

<script>
import Department from '../components/admin/Department.vue'
import Category from '../components/admin/Category.vue'
import Year from '../components/admin/Year.vue'
import Period from '../components/admin/Period.vue'
import Role from '../components/admin/Role.vue'
import User from '../components/admin/User.vue'
// import { create } from "domain";
export default {
  data () {
    return {}
  },
  computed: {
    isAdmin () {
      return this.$store.isAdmin
    }
  },
  components: {
    Department,
    Category,
    Year,
    Period,
    Role,
    User
  },
  created () {
    if (this.$store.state.userinfo.length > 0) {
      let roles = this.$store.state.userinfo[0].roles
      let role = roles.find(item => item === '公司级管理员')
      if (role !== '公司级管理员') {
        this.$router.push({
          name: 'login'
        })
      }
    } else {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
</style>
