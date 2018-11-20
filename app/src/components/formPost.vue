<template>
    <div class="form form-post">
        <h3 class="form__title">
            <slot name="title"></slot>
        </h3>
        <div class="form__item">
            <label class="form__label">Ad title*</label>
            <input v-model.trim="post.title"  type="text" class="form__input">
            <span class="form__error" v-show="errorTitle.flag && !post.title">{{errorTitle.text}}</span>
        </div>
        <div class="form__item">
            <label class="form__label">Short description*</label>
            <textarea v-model.trim="post.shortDescription" class="form__input" cols="30" rows="4"></textarea>
            <span class="form__error" v-show="errorShortDescr.flag && !post.shortDescription">{{errorShortDescr.text}}</span>
        </div>
        <div class="form__item">
            <label class="form__label">Full description*</label>
            <textarea v-model.trim="post.description"  class="form__input" cols="30" rows="7"></textarea>
            <span class="form__error" v-show="errorDescr.flag && !post.description">{{errorDescr.text}}</span>
        </div>
        <button type="button" class="btn btn_purple form__btn" v-if="id" @click="edit">Edit</button>
        <button type="button" class="btn btn_purple form__btn" v-else  @click="add">Create</button>

    </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/ru'
export default {
  name: 'form-post',
  components: {
    moment
  },
  props: ['id'],
  created () {
    if (this.id) {
      let posts = this.$store.getters.getPosts
      let that = this
      posts.find(function (elem) {
        if (elem.id == that.id) {
          that.post = { ...elem }
        }
      })
    }
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
      },
      errorTitle: {
        flag: false,
        text: 'Title is required'
      },
      errorShortDescr: {
        flag: false,
        text: 'Enter short description'
      },
      errorDescr: {
        flag: false,
        text: 'Enter full description'
      }
    }
  },
  computed: {
    getDate () {
      return moment(new Date()).format('DD/MM/YYYY')
    },
    getAuthor () {
      return this.$store.getters.ifAuthenticated
    },
    validation () {
      let that = this
      let flag = true
      if (!this.post.title) {
          console.log(111);
          that.errorTitle.flag = true
        flag = false
      }
      if (!this.post.shortDescription) {
          that.errorShortDescr.flag = true
        flag = false
      }
      if (!this.post.description) {
          that.errorDescr.flag = true
        flag = false
      }

      return flag
    }
  },
  methods: {
    add () {
      if (this.validation) {
        this.post.date = this.getDate
        this.post.author = this.getAuthor
        this.$store.dispatch('addPost', this.post)
      }
    },
    edit () {
      if (this.validation) {
        this.$store.dispatch('editPost', this.post)
      }
    }
  }
}
</script>

<style scoped lang="sass">
    @import "../assets/styles/variable"
    .form
        max-width: 600px
        background-color: $white
        padding: 30px
        margin: 0 auto

    .form__title
        color: $blue
        margin-bottom: 25px

    .form__label
        display: block
        font-weight: 600

    .form__item
        position: relative
        padding-bottom: 20px

    .form__input
        width: 100%
        padding: 5px
        border: 1px solid $border-color
        resize: none
    .form__error
        position: absolute
        bottom: 5px
        left: 0
        color: $red
        font-size: 12px
    .form__btn
        width: 100%
        padding: 10px

    @media (max-width: 767px)
        .form
            padding: 15px
</style>
