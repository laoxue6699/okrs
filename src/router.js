import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddOkrs from './views/okrs/AddOkrs.vue'
import ShowOkrs from './views/okrs/ShowOkrs.vue'
import EditOkrs from './views/okrs/EditOkrs.vue'
import Login from './views/users/Login.vue'
import Register from './views/users/Register.vue'
import UpdatePassword from './views/users/UpdatePassword.vue'
import UpdateUser from './views/users/UpdateUser.vue'
import Admin from './views/Admin.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/addOkrs',
    name: 'addOkrs',
    component: AddOkrs
  },
  {
    path: '/editOkrs',
    name: 'editOkrs',
    component: EditOkrs
  },
  {
    path: '/showOkrs',
    name: 'showOkrs',
    component: ShowOkrs
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/updatePassword',
    name: 'updatePassword',
    component: UpdatePassword
  },
  {
    path: '/updateUser',
    name: 'updateUser',
    component: UpdateUser
  }
  ]
})
