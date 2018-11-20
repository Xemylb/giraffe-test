<template>
    <div class="form form-user">
        <form action="/" @submit.prevent="signIn">
            <h3 class="form__title">
                <slot name="title"></slot>
            </h3>
            <div class="form__item">
                <label class="form__label">Email*</label>
                <input v-model.trim="user.email" type="email" class="form__input">
                <span class="form__error" v-show="errorEmail.flag">{{errorEmail.text}}</span>
            </div>
            <div class="form__item">
                <label class="form__label">Password*</label>
                <input v-model.trim="user.password" type="password" class="form__input">
                <span class="form__error" v-show="errorPassword.flag">{{errorPassword.text}}</span>
            </div>
            <button type="submit" class="btn btn_purple form__btn">Sign In</button>
        </form>

    </div>
</template>

<script>

    let hash = require('hash.js');
    let sha256 = function (value) {
        return hash.sha256().update(value).digest('hex')
    };

    let emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    export default {
        name: "formUser",
        created() {
            this.users = this.$store.getters.getUsers;
        },
        data() {
            return {
                users: [],
                user: {
                    email: '',
                    password: '',
                },
                errorEmail: {
                    flag: false,
                    text: 'Invalid email',
                },
                errorPassword: {
                    flag: false,
                    text: 'Invalid password'
                },
            }
        },
        computed: {
            isValid() {
                if (!this.errorEmail.flag && !this.errorPassword.flag) {
                    return true;
                }
            },
            checkUser() {
                let password = '';
                this.users.find((elem) =>{
                    if(elem.email === this.user.email){
                        password = elem.password;
                    }
                });
                return password;
            }
        },
        methods: {
            signIn() {
                if(emailRegExp.test(this.user.email)){
                    this.errorEmail.flag = false;
                    if(this.checkUser){
                        if(this.checkUser === sha256(this.user.password)){
                            this.$store.dispatch('login', this.user, false);
                            this.close()
                        }else{
                            this.errorPassword.flag = true;
                        }
                    }else{
                        if(this.user.password){
                            this.user.password = sha256(this.user.password);
                            this.$store.dispatch('login', this.user, true);
                            this.close()
                        }else{
                            this.errorPassword.flag = true;
                        }
                    }
                }else{
                    this.errorEmail.flag = true;
                }
            },
            close(){
                this.$emit('close');
                this.user.email = '';
                this.user.password = '';
            }
        }
    }
</script>

<style scoped lang="sass">
    @import "../assets/styles/variable"
    .form
        max-width: 600px
        background-color: $white
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
</style>