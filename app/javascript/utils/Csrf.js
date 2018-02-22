/**
 * CSRF Util
 */
export default {
    /*
     * The name of the HTTP header which will carry token value
     */
    header: 'X-CSRF-Token',

    /*
     * For which method types the CSRF is applicable for non cross-domain requests
     */
    forMethodTypes: /^post|put|patch|delete$/i,

    /**
     * Determines whether the given HTTP method requires a CSRF token to be added to the request or not
     *
     * @param method Name of the method i.e GET, POST etc
     * @returns {boolean}
     */
    isRequired (method) {
        return this.forMethodTypes.test(method);
    },

    /**
     * Determines whether to add the header values in the HTTP request or not
     *
     * @param method
     * @param params
     * @returns {boolean}
     */
    shouldAddHeader (method, params = {}) {
        let param = this.param();

        if (params instanceof FormData) {
            if (this.isRequired(method)) {
                // check if the parameter is already present in the
                return !!params.get(param);
            }
        }

        return this.isRequired(method) ? true : !!params[param];
    },

    /**
     * Returns the CSRF Token value extracted from the <meta> tags
     * @returns {String}
     */
    token () {
        return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    },

    /**
     * Returns the CSRF Token param name to be used in form submission, extracted from <meta> tags
     * @returns {String}
     */
    param () {
        return document.querySelector('meta[name="csrf-param"]').getAttribute('content');
    },

    /**
     * Appends the CSRF values to the FormData Object
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData}
     *
     * @param {FormData} formData
     */
    append (formData) {
        formData.append(this.param(), this.token());
        return formData;
    }
}
