module.exports = {
    // your webpack config
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify')
      },
        
    }

  }
  