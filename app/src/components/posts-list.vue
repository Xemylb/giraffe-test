<template>
    <div class="post-list">
        <div class="container">
            <div class="custom-pagination">
                <div class="row align-items-center">
                    <div class="col-3 text-left"><a href="#" class="btn btn_green" v-show="pageNumber !== 0" @click.prevent="prevPage"><span class="d-none d-md-inline" >Prev page</span> <span class="d-inline d-md-none" > < </span></a></div>
                    <div class="col-6 text-center font-weight-bold text-blue">Page: {{pageNumber+1}} of {{pageCount}}</div>
                    <div class="col-3 text-right"> <a href="#" class="btn btn_green" v-show="pageNumber !== pageCount-1" @click.prevent="nextPage"><span class="d-none d-md-inline" >Next page</span> <span class="d-inline d-md-none" > > </span></a></div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-4" v-for="post in paginatedData">
                    <postPreview v-bind:post="post" :key="post.id"></postPreview>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import postPreview from '../components/post-preview.vue'

export default {
  name: 'HelloWorld',
  components: {
    postPreview
  },
  created () {
    this.posts = this.$store.getters.getPosts
    this.currentUser = this.$store.getters.ifAuthenticated
  },
  data () {
    return {
      currentUser: '',
      posts: [],
      pageNumber: 0
    }
  },
  computed: {
    pageCount () {
      let lenght = this.posts.length

      let size = 5
      return Math.ceil(lenght / size)
    },

    paginatedData () {
      const start = this.pageNumber * 5

      const end = start + 5
      return this.posts.slice(start, end)
    }
  },
  methods: {
    nextPage () {
      this.pageNumber++
    },
    prevPage () {
      this.pageNumber--
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
    @import "../assets/styles/variable"
    .post-list
        padding: 40px 0

    .custom-pagination
        background-color: $white
        padding: 15px
        margin-bottom: 20px
        border-radius: 0
    @media (max-width: 767px)
        .custom-pagination

</style>
