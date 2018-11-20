<template>
    <div class="post">
        <Header></Header>
        <div class="container">
            <div class="post__wrapper">
                <div class="post__header">
                    <div class="post__header-info">
                        <span class="post__author">
                            <span class="d-none d-md-inline">Автор:</span> {{post.author}}
                        </span>
                        <span class="post__date">Дата: {{post.date}}</span>
                    </div>
                    <div class="post__header-control" v-if="isAuthor">
                        <router-link class="post__edit text-green" :to="{name: 'Edit', params: {id: post.id}}">Edit</router-link>
                        <router-link class="post__delete text-red" :to="{name: 'Delete', params: {id: post.id}}">Delete</router-link>
                    </div>
                </div>
                <h1 class="post__title">{{post.title}}</h1>
                <div class="post__description">
                    {{post.description}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'
export default {
  name: 'post',
  components: {
    Header
  },
  mounted: function () {
    let that = this
    let posts = this.$store.getters.getPosts
    let id = this.$route.params.id
    posts.find(function (elem) {
      if (elem.id == id) {
        that.post = { ...elem }
      }
    })
  },
  data () {
    return {
      post: {
        id: '',
        title: '',
        author: '',
        date: '',
        shortDescription: '',
        description: ''
      }
    }
  },
  computed: {
    isAuthor () {
      let currentUser = this.$store.getters.ifAuthenticated
      if (currentUser === this.post.author) {
        return true
      }
    }
  }
}
</script>

<style scoped lang="sass">
    @import "../assets/styles/variable"
    .post__wrapper
        background-color: $white
        padding: 30px
        margin-top: 40px
    .post__header
        display: flex
        justify-content: space-between
        align-items: center
    .post__author
        color: $blue
        margin-right: 30px
    .post__date
        color: $grey
    .post__edit
        margin-right: 30px
    .post__title
        font-size: $twentytwo-px
        color: $purple
        margin: 30px 0
    @media (max-width: 767px)
        .post__wrapper
            padding: 15px
        .post__header
            align-items: flex-start
        .post__title
            margin: 15px 0
</style>
