<template>
    <header class="navbar bg-primary navbar-expand-lg" id="header-navbar">
        <div class="clearfix">
          <div class="nav-no-collapse navbar-left pull-left">
            <ul class="nav navbar-inverse float-right">
              <li class="dropdown">
                <a class="navbar-brand nav-link" href="#" v:show="user.id" @click.prevent="logout">
                  logout
                </a>
              </li>
            </ul>
          </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'Navbar',
        props: {
            user: {}
        },
        data () {
            return {}
        },

        methods: {
            logout: function () {
                this.$http
                    .get('/users/sign_out.json', {params: {'id': this.user.id}})
                    .then(response => {
                        // redirect to home page
                        console.log("success");
                        window.location.href = '/';
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
            }
        }


    }
</script>