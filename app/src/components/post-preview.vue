<template>
    <div class="post-preview">
        <div class="post-preview__header">
            <span class="post-preview__author">{{author}}</span>
            <span class="post-preview__date">{{date}}</span>
        </div>
        <div class="post-preview__body">
            <h4 class="post-preview__title">{{title}}</h4>
            <div class="post-preview__description">{{description}}</div>
        </div>
        <div class="post-preview__control" v-if="isAuthor">
            <router-link class="post-preview__edit text-green" :to="{name: 'Edit', params: {id: id}}">Edit</router-link>
            <router-link class="post-preview__remove text-red" :to="{name: 'Delete', params: {id: id}}">Delete
            </router-link>
        </div>
        <router-link class="post-preview__link" tag="a" :to="{name: 'Post', params: {id: id}}"></router-link>
    </div>
</template>

<script>
    export default {
        name: 'post-preview',
        props: {
            post: Object
        },
        data() {
            return {
                id: this.post.id,
                title: this.post.title,
                author: this.post.author,
                description: this.post.description,
                date: this.post.date,
            }
        },
        computed: {
            isAuthor() {
                let currentUser = this.$store.getters.ifAuthenticated
                if (currentUser === this.author) {
                    return true
                }
            }
        },
        methods: {
            remove(id) {
                this.$store.dispatch('removePost', id)
            }
        }
    }
</script>
<style scoped lang="sass">
    @import "../assets/styles/variable"
    .post-preview
        padding: 30px 20px
        background-color: $white
        margin-bottom: 30px
        transition: transform 0.3s
        cursor: pointer
        position: relative
        &:hover
            transform: scale(1.1)

    .post-preview__header
        display: flex
        justify-content: space-between
        align-items: center
        font-size: 12px
        margin-bottom: 10px

    .post-preview__author
        color: $blue

    .post-preview__date
        color: $grey

    .post-preview__title
        color: $purple
        height: 58px
        overflow: hidden

    .post-preview__description
        height: 65px
        overflow: hidden

    .post-preview__control
        position: absolute
        top: 3px
        right: 20px
        z-index: 2

    .post-preview__edit
        margin-right: 15px

    .post-preview__link
        position: absolute
        width: 100%
        height: 100%
        left: 0
        top: 0

</style>
