import Vue from 'vue'
import Router from 'vue-router'
import storey from '@/components/storey'
import build from '@/components/build'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'build',
      component: build
    },
    {
      path: '/storey',
      name: 'storey',
      component: storey
    }
  ]
})
