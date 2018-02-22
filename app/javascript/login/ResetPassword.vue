<template>

    <div class="col-sm-5 mx-auto login-cont">
        <form ref="form" class="form-signin"  method="post" @submit.prevent="validate">
            <h4 class="form-signin-heading">Reset Your Password</h4>
            <div class="form-group">
                <p>
                  Enter password to reset your password
                </p>
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
                <span class="text-danger" v-show="errors.has('password_confirmation')">{{ errors.first('password_confirmation') }}</span>
                <input type="hidden" v-model="password_token" name="user[reset_password_token]"/>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Reset Password</button>
        </form>
    </div>

</template>

<script>
    import Csrf from '../utils/Csrf';

    export default {
        name: 'ResetPassword',

        props: {
            password_token: {
                type: String,
                required: true
            }
        },

        data () {
            return {
                result: null,
            }
        },

        mounted () {
            
        },

        methods: {
            onValidationSuccess () {
                let formData = new FormData(this.$refs.form);
                Csrf.append(formData);

                this.$http
                    .post('/users/password/', formData)
                    .then(response => {
                        // redirect to home page
                        console.log("success");
                    })
                    .catch(error => {
                        if (error.response) {
                            // HTTP error
                            let data = error.response.data;
                            if (data.error) {
                                this.result = data.error;
                            }
                        } else if (error.request) {
                            this.result = 'No Network available.';
                        } else {
                            this.result = error.message;
                        }
                    })
            },

            /**
             * Performs validation before the form gets submitted. For it to work, it needs to be
             * set as the event handler like this `@submit.prevent="validate"`
             */
            validate () {
                this.$validator.validateAll().then((result) => {
                    return result ? this.onValidationSuccess() : this.onValidationFailure();
                });
            },
            
        }
    }
</script>
<style>
    .login-cont{
        border: 1px solid #DFDFDF;
    }

    .form-signin {
      max-width: 330px;
      padding: 15px;
      margin: 0 auto;
    }
    .form-signin .form-signin-heading,
    .form-signin .checkbox {
      margin-bottom: 10px;
    }
    .form-signin .checkbox {
      font-weight: normal;
    }
    .form-signin .form-control {
      position: relative;
      height: auto;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      padding: 10px;
      font-size: 16px;
    }
    .form-signin .form-control:focus {
      z-index: 2;
    }
    .form-signin input[type="email"] {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
      margin-bottom: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    body,html {
      height: 100%;
    }
</style>