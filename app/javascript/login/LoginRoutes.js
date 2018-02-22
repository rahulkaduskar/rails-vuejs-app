import Vue from 'vue/dist/vue.esm'
import VueRouter from 'vue-router/dist/vue-router.esm'

import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

export default {
    /**
     * Installs all the routes with the Vue
     *
     * @param base - Base URL, by default it is /app/
     * @returns {VueRouter} instance
     */
    create (base = '/') {
        Vue.use(VueRouter);
        
        let routes = [
            { path: '/', name: 'new-signup', component:  Signup },
            { path: '/users/sign_in', name: 'login', component: Login },
            { path: '/users/password/new', name: 'forgot-password', component: ForgotPassword },

            { path: '/users/password/edit', name: 'reset-password', component: ResetPassword,
                props: (route) => ({ password_token: route.query.reset_password_token }) }
        ];
        
        return new VueRouter({
            mode: 'history',
            base: base,
            routes: routes,
            linkActiveClass: 'active'
        });
    }
}
