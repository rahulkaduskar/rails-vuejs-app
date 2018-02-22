<template>
    <div>
        <navbar :user="user" v:show="user.id"></navbar>
        <div class="container d-flex align-items-center h-100">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    const Navbar = () =>import("./components/Navbar.vue").then(m => m.default);

    export default {
        name: 'App',
        components: {Navbar},
        data () {
            return {
                user: this.user || {}
            }

        },

        mounted: function(){
            if(typeof DATA != "undefined"){
                this.user = DATA.user;
                console.log(this.user);
            }
        }
    }
</script>