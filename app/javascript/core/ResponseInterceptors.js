/**
 * Response interceptor which checks the response status code and if it is 401 (i.e Unauthenticated) then
 * attempts to redirect the user to login screen.
 */
const LoginRequired = {
    accept (config) {
        return config;
    },

    reject (error) {
        return Promise.reject(error);
    }
};

// To be used in future
const Unauthorized = {
    accept (config) {},
    reject (error) {}
};


export default {

    /**
     * Sets up response interceptors
     * @param axios
     */
    use (axios) {
        axios.interceptors.response.use(LoginRequired.accept, LoginRequired.reject);
    }
}
