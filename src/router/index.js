import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from '../views/Intro.vue'
import Survey from '../views/Survey.vue'
import Result from '../views/Result.vue'
import Guarantee from '../views/Guarantee.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'intro',
    component: Intro
  },
  {
    path: '/survey',
    name: 'survey',
    component: Survey
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/guarantee',
    name: 'guarantee',
    component: Guarantee
  },
]

const router = new VueRouter({
  routes
})

export default router
