import Vue from 'vue'
import Router from 'vue-router'
import Checklist from '@/components/Checklist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:app',
      name: 'Checklist',
      component: Checklist,
      props: true
    },
    {
      path: '/',
      redirect: '/tao'
    }
  ]
})
