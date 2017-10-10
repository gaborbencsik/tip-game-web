import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MatchList from '@/components/MatchList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Hello
    },
    {
      path: '/match-list',
      name: 'MatchList',
      component: MatchList
    }
  ]
})
