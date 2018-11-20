<template>
    <div class="header">
        <div class="header__left">
            <div class="header__logo">
                <router-link to="/"><img class="img-fluid" alt="Vue logo" src="../assets/images/logo.png"/></router-link>
            </div>
            <div class="nav">
                <router-link to="/">Home</router-link>
                |
                <router-link to="/edit">Create Ad</router-link>
            </div>
        </div>
        <div class="header__right">
            <div class="header__account">
                <div class="header__logout" v-if="currentUser"><strong class="d-none d-md-inline">Account:</strong> {{currentUser}}<router-link class="btn btn_red header__btn-logout" :to="{name: 'Logout'}">Logout</router-link></div>
                <div class="header__login" v-else><button class="btn btn_green" @click="showModal = !showModal">Login</button></div>
            </div>
        </div>

        <modal @close="close" v-show="showModal">
            <template slot="modalBody">
                <formUser @close="close">
                    <template slot="title">
                        Enter to your Account
                    </template>
                </formUser>
            </template>
        </modal>
    </div>
</template>

<script>
import modal from '@/components/modal'
import formUser from '@/components/formUser'

export default {
  name: 'desktopHeader',
  components: { modal, formUser },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    currentUser () {
      let currentUser = this.$store.getters.ifAuthenticated
      if (currentUser) {
        return currentUser
      }
    }
  },
  methods: {
    close () {
      this.showModal = !this.showModal
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
    @import "../assets/styles/variable"
    .header
        display: flex
        justify-content: space-between
        align-items: center
        padding: 10px 30px
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.24)
        background-color: #fff
    .nav
       padding: 15px
       a
           font-weight: bold
           color: $black
           padding: 0 5px
           &.router-link-exact-active
               color: $blue

    .header__left, .header__right
        display: flex
        align-items: center

    .header__btn-logout
        margin-left: 30px

    .header__logo
        max-width: 50px
        margin-right: 20px

    @media (max-width: 991px)
        .header__logo
            margin-right: 15px
        .nav
            padding: 15px 0

    @media (max-width: 767px)
        .header
            display: block
        .header__right,.header__left
            justify-content: center
</style>
