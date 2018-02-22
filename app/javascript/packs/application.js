import Vue from 'vue/dist/vue.esm';

// Application Styles
import '../app.scss'

import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

import Http from '../core/http';
import LoginRoutes from '../login/LoginRoutes';
import App from '../App';
import Login from '../Login';

// setup HTTP adapter
Http.configure();

let router = LoginRoutes.create('/');

if(typeof DATA != "undefined"){
	const vueapp = new Vue({
	    App,
	    router,
		propsData: DATA,
	    render: h => h(App)
	});
	document.addEventListener('DOMContentLoaded', () => {
	    vueapp.$mount('#login');
	});
}else{
	const vueapp = new Vue({
	    Login,
	    router,
	    render: h => h(Login)
	});
	document.addEventListener('DOMContentLoaded', () => {
	    vueapp.$mount('#login');
	});
}




