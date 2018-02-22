<template>
    <div class="progress-indicator">
        <!-- Progress -->
        <spinner
                :color="spinnerColor"
                :size="spinnerSize"
                :speed="spinnerSpeed"></spinner>
        <small class="ml-2 mt-2">{{message}}</small>
    </div>
</template>

<script>
    export default {
        name: 'ProgressLoader',

        props: {
            message: {
                type: String,
                default: 'Loading...'
            }
        },

        data () {
            return {
                spinnerColor: '#7d91a5',
                spinnerSize: 30,
                spinnerSpeed: 0.9
            }
        }
    }
</script>