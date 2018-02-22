/**
 * Sets up HTTP adapter and the necessary configurations
 */

import Vue from 'vue/dist/vue.esm';
import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions'
import VueAxios from 'vue-axios'
import RequestInterceptors from './RequestInterceptors'
import ResponseInterceptors from './ResponseInterceptors'



export default {
    configure () {
        // add caching layer
        const http = axios.create({
            baseURL: BASE_URL, // coming from a constant defined in the main HTML layout
            // headers: { 'Cache-Control': 'no-cache'},
            adapter: cacheAdapterEnhancer(axios.defaults.adapter, true, 'cache', 60)
        });

        // attach interceptors
        RequestInterceptors.use(http);
        ResponseInterceptors.use(http);

        // attach with Vue so that we can use this.$http to make requests
        Vue.use(VueAxios, http);
    }
}
