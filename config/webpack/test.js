const environment = require('./environment')

module.exports = environment.toWebpackConfig()
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
