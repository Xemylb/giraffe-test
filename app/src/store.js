import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import './database/index'

Vue.use(Vuex, router)

export default new Vuex.Store({
  state: {
    posts: [],
    users: [],
    currentUser: localStorage.getItem('currentUser') || ''
  },
  getters: {
    getPosts (state) {
      state.posts = localStorage.getObject('posts')
      return state.posts
    },

    getUsers (state) {
      state.users = localStorage.getObject('users')
      return state.users
    },

    ifAuthenticated (state) {
      return state.currentUser
    }
  },
  mutations: {
    addPost (state, newPost) {
      let posts = localStorage.getObject('posts')
      newPost.id = Number(posts[posts.length - 1].id) + 1
      posts.push(newPost)
      localStorage.setObject('posts', posts)
      state.posts.push(newPost)
      router.push('/')
      router.push('/post' + newPost.id)
    },
    editPost (state, post) {
      let posts = localStorage.getObject('posts')
      let id = post.id
      posts.find(function (elem) {
        if (elem.id == id) {
          elem.title = post.title
          elem.shortDescription = post.shortDescription
          elem.description = post.description
        }
      })
      state.posts.find(function (elem) {
        if (elem.id == id) {
          elem.title = post.title
          elem.shortDescription = post.shortDescription
          elem.description = post.description
        }
      })
      localStorage.setObject('posts', posts)
      router.push('/post' + id)
    },
    removePost (state, id) {
      let posts = localStorage.getObject('posts')
      let i = posts.map(elem => elem.id).indexOf(id)
      posts.splice(i, 1)
      localStorage.setObject('posts', posts)
      state.posts.splice(i, 1)
    },
    login (state, user, newUser) {
      if (newUser) {
        let users = localStorage.getObject('users')
        users.push(user)
        localStorage.setObject('users', users)
        state.users.push(newUser)
      }
      localStorage.setItem('currentUser', user.email)
      state.currentUser = user.email
    },
    logout (state) {
      localStorage.removeItem('currentUser')
      state.currentUser = ''
    }
  },
  actions: {
    addPost (context, post) {
      context.commit('addPost', post)
    },
    editPost (context, post) {
      context.commit('editPost', post)
    },
    removePost (context, id) {
      context.commit('removePost', id)
    },
    addUser (context, newUser) {
      context.commit('addUser', newUser)
    },
    login (context, user) {
      context.commit('login', user)
    },
    logout (context) {
      context.commit('logout')
    }
  }
})
