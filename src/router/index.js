import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MatchList from '@/components/MatchList'
import Tips from '@/components/Tips'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/match-list',
      name: 'MatchList',
      component: MatchList
    },
    {
      path: '/tips',
      name: 'Tips',
      component: Tips
    }
  ]
})
