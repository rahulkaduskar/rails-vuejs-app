<template>

    <div class="col-sm-5 mx-auto login-cont">
        <form ref="form" class="form-signin"  method="post" @submit.prevent="validate">
            <h4 class="form-signin-heading">Reset Your Password</h4>
            <div class="form-group">
                <p>
                  Enter your email and we'll send you a link to reset your password
                </p>
            </div>
            <div class="form-group"
                :class="">
                <input type="email"
                       class="form-control"
                       id="email"
                       placeholder="Email"
                       name="user[email]"
                       v-validate="'required'" 
                       data-vv-name="email"
                       data-vv-as="Email">

            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Reset Password</button>
        </form>
    </div>

</template>

<script>
    import Csrf from '../utils/Csrf';

    export default {
        name: 'ForgotPassword',

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