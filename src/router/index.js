import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MatchList from '@/components/MatchList'
import Tips from '@/components/Tips'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Profile from '@/components/Profile'
import Competition from '@/components/Competition'
import Groups from '@/components/Groups'
import PlayerTips from '@/components/PlayerTips'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
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
    },
    {
      path: '/competition',
      name: 'Competition',
      component: Competition
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Groups
    },
    {
      path: '/player-tips',
      name: 'PlayerTips',
      component: PlayerTips
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

export default router
