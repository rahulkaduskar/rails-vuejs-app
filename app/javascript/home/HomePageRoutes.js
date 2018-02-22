import Vue from 'vue/dist/vue.esm'
import VueRouter from 'vue-router/dist/vue-router.esm'

import Signup from './home';

export default {
    /**
     * Installs all the routes with the Vue
     *
     * @param base - Base URL, by default it is /app/
     * @returns {VueRouter} instance
     */
    create (base = '/home') {
        Vue.use(VueRouter);
        
        let routes = [
            { path: '/home', name: 'home', component: home }
        ];
        
        return new VueRouter({
            mode: 'history',
            base: base,
            routes: routes,
            linkActiveClass: 'active'
        });
    }
}


export default routes;