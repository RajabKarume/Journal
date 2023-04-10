module.exports = [
    [
      '@rescripts/preset-create-react-app',
      {
        webpack: (config) => {
          config.resolve.fallback = {
            "assert": require.resolve("assert"),
            "buffer": require.resolve("buffer"),
            "crypto": require.resolve("crypto-browserify"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "path": require.resolve("path-browserify"),
            "stream": require.resolve("stream-browserify"),
            "tls": require.resolve("tls-browserify"),
            "tty": require.resolve("tty-browserify"),
            "util": require.resolve("util/"),
            "zlib": require.resolve("browserify-zlib")
          };
          return config;
        },
      },
    ],
  ];
  