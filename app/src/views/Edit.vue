<template>
    <div class="create">
        <Header></Header>
        <div class="container">
            <formEdit :id="id">
                <template slot="title">
                    {{text}}
                </template>
            </formEdit>
        </div>

    </div>
</template>

<script>
    import formEdit from '@/components/formPost'
    import Header from '@/components/header'
    export default {
        name: "create",
        beforeCreate(){
            let ifAuthenticated = this.$store.getters.ifAuthenticated;
            if(!ifAuthenticated){
                this.$router.push('/');
            }
        },
        components:{
            formEdit,Header
        },
        computed:{
            id(){
                return this.$route.params.id
            },
            text(){
                if(this.id){
                    return 'Edit announcement'
                }else{
                    return 'Create an announcement'
                }
            }
        }
    }
</script>

<style scoped lang="sass">
    .create
        .form
            margin-top: 40px
</style>