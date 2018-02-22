import Csrf from '../utils/Csrf'

/**
 * Axios request interceptor which automatically adds csrf tokens to HTTP headers
 */
const CSRFInterceptor = {
    /**
     *
     * @param config
     * @returns {*}
     */
    accept (config) {
        let {method, params} = config;

        if (Csrf.shouldAddHeader(method, params)) {
            config.headers[Csrf.header] = Csrf.token();
        }

        return config;
    },

    /**
     *
     * @param error
     */
    reject (error) {
        // TODO do something with the error
        return Promise.reject(error);
    }

};

// ---------------------------------------------------------------------------


export default {

    /**
     * Attaches Request interceptors with Axios
     *
     * @param axios Axios instance
     */
    use (axios) {
        axios.interceptors.request.use(CSRFInterceptor.accept, CSRFInterceptor.reject)
    }
}
