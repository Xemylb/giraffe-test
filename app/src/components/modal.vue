<template>
    <transition name="modal" :duration="{ enter: 0, leave: 300 }">
        <div class="modal">
            <div class="modal__mask" @click="close"></div>
            <div class="modal__container">
                <span class="modal__close" @click="close">×</span>
                <div class="modal__body">
                    <slot name="modalBody"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      open: false
    }
  },
  methods: {
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="sass">
    @import "../assets/styles/variable"
    .modal
        z-index: 5
        position: fixed
        width: 100%
        height: 100%
        left: 0
        top: 0
        display: flex
        align-items: center
        justify-content: center

    .modal__mask
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(0, 0, 0, 0.5)
        display: flex
        z-index: 1
        opacity: 0.9
        align-items: center
        justify-content: center
        transition: opacity .3s ease

    .modal__container
        z-index: 9
        position: relative
        width: 600px
        max-width: 100%
        margin: 0 auto
        padding: 30px
        background-color: #fff
        border-radius: 2px
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33)
        transition: all .3s ease
        color: $black
        font-size: $forteen-px

    .modal__close
        position: absolute
        right: 15px
        top: 15px
        font-size: 22px
        color: $black
        opacity: 0.8
        cursor: pointer
        &:hover
            opacity: 1

    /* Animation */
    .modal-enter
        .modal__container
            -webkit-transform: scale(0)
            transform: scale(0)
            opacity: 0
        .modal__mask
            opacity: 0

    .modal-enter-to
        .modal__mask
            opacity: 1

        .modal__container
            -webkit-transform: scale(1)
            transform: scale(1)
            opacity: 1

    .modal-leave-active
        .modal__mask
            opacity: 0

        .modal__container
            -webkit-transform: scale(0)
            transform: scale(0)
            opacity: 0

    @media (max-width: 767px)
        .modal__container
            padding: 20px

        .modal__close
            top: 0
            right: 10px
</style>
