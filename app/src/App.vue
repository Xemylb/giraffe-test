<template>
    <div id="app">
        <router-view ></router-view>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    // @ is an alias to /src
    export default {
        name: 'app',
    }
</script>
<style lang="sass">
    @import "assets/styles/variable"
    body
        background: linear-gradient(to top, rgba(162, 79, 193, 0.85) 0%, rgba(13, 127, 177, 0.85) 100%), #4489fe;
        min-height: 100vh
        font-size: 14px

    .text-blue
        color: $blue
    .text-purple
        color: $purple
    .text-red
        color: $red
    .text-green
        color: $green
    .btn_green
        background-color: $green
        border-color: $green
        color: $white
        &:hover
            background-color: $green_dark
            border-color: $green_dark
            color: $white
    .btn_red
        background-color: $red
        border-color: $red
        color: $white
        &:hover
            background-color: $red_dark
            border-color: $red_dark
            color: $white
    .btn_purple
        background-color: $purple
        border-color: $purple
        color: $white
        &:hover
            background-color: $purple_dark
            border-color: $purple_dark
            color: $white

</style>
