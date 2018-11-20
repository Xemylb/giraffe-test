import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Post from './views/Post.vue'
import Edit from './views/Edit.vue'
import Store from './store'

Vue.use(Router, Store)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/post:id',
      name: 'Post',
      component: Post,
      props: true
    },
    {
      path: '/edit',
      name: 'Create',
      component: Edit
    },
    {
      path: '/edit:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/delete:id',
      name: 'Delete',
      component: Post,
      beforeEnter: (to, from, next) => {
        Store.dispatch('removePost', to.params.id)
        next({ path: '/' })
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: (to, from, next) => {
        Store.dispatch('logout')
      }
    }
  ]
})
