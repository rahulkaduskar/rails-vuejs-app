<template>
    <div class="login-form col-sm-5  mx-auto">
        <div class="">
            <h4 class="form-signin-heading">Register</h4>
            <form ref="form" class="" method="post" @submit.prevent="validate">
                <div class="form-group" v-if="result">
                    <p class="text-danger text-center">{{result}}</p>
                </div>
                <div class="form-group"
                    :class="{'has-danger': errors.has('name') }">
                    <input type="text"
                           class="form-control"
                           id="name"
                           placeholder="Your name"
                           name="user[name]"
                           v-validate="'required'"
                           data-vv-name="name"
                           data-vv-as="Name">

                    <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                </div>
                <div class="form-group"
                    :class="{'has-danger': errors.has('email') }">
                    <input type="email"
                           class="form-control"
                           id="email"
                           placeholder="Email"
                           name="user[email]"
                           v-validate="'required'" 
                           data-vv-name="email"
                           data-vv-as="Email">

                    <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                </div>
                <div class="form-group"
                           :class="{'has-danger': errors.has('password') }">
                    <input type="password"
                           class="form-control"
                           id="password"
                           placeholder="Password"
                           name="user[password]"
                           v-validate="'required|min:8'"
                           data-vv-name="password"
                           data-vv-as="Password">
                    <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                </div>
                <div class="form-group"
                           :class="{'has-danger': errors.has('password_confirmation')}">
                    <input type="password"
                           class="form-control"
                           id="confirm_password"
                           placeholder="Repeat Password"
                           name="user[password_confirmation]"
                           v-validate="'required|min:8|confirmed:user[password]'"
                           data-vv-name="password_confirmation"
                           data-vv-as="Password Comfirmation">
                    <span class="text-danger" v-show="errors.has('password_confirmation')">{{errors.first('password_confirmation') }}</span>
                </div>
                <button type="submit" class="btn btn-primary">Create Account</button>
                <div class="float-right mt-2 no-account">
                    <span class="float-left">Already have an account?</span>
                    <router-link :to="{ name: 'login' }"
                                 class="text-capitalize font-weight-bold pl-2">Login
                    </router-link>
                </div>
            </form>
        </div>

        <div class="mt-3">
            
        </div>
    </div>
</template>

<script>
    import Csrf from '../utils/Csrf';

    export default {
        name: 'Signup',
        prop: {
          errors: {}
        },
        
        data () {
            return {
                result: null
            }
        },

        created () {
        },

        computed: {
          isFormDirty() {
            return Object.keys(this.fields).some(key => this.fields[key].dirty);
          }
        },

        methods: {

            onValidationSuccess () {
                let formData = new FormData(this.$refs.form);
                Csrf.append(formData);

                this.$http
                    .post('/users.json', formData)
                    .then(response => {
                        // redirect to home page
                        window.location.href = '/home';
                    })
                    .catch(error => {
                        if (error.response) {
                            // HTTP error
                            let result = error.response.data;
                        } else if (error.request) {
                            this.result = 'No Network available.';
                        } else {
                            this.result = error.message;
                        }
                    })
            },

            onValidationFailure () {

            },

            /**
            * Performs validation before the form gets submitted.
            */
            validate () {
                this.$validator.validateAll().then((result) => {
                    if(!result){
                        return;
                    }
                    this.onValidationSuccess();
                }).catch(() => {
                });
            }
        }
    }
</script>

