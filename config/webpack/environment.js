const webpack = require('webpack');
const { environment } = require('@rails/webpacker')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const vue =  require('./loaders/vue')


//==> add loaders
environment.loaders.append('vue', vue);

// add common chunking
environment.plugins.append(
    'CommonsChunkVendor',
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    })
);

environment.plugins.append(
    'CommonsChunkManifest',
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    })
);

environment.plugins.append('lodash', new LodashModuleReplacementPlugin());

module.exports = environment
