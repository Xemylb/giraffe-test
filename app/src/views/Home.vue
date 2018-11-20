<template>
    <div class="home">
        <Header></Header>
        <PostsList />
    </div>
</template>

<script>
// @ is an alias to /src
import PostsList from '@/components/posts-list'
import Header from '@/components/header'

export default {
  name: 'home',
  components: {
    PostsList, Header
  }
}
</script>
