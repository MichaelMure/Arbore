import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.config.base'

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: ['babel-polyfill', './app/main.contactAdder'],

  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'contactAdder.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'babel-loader' },
          { loader: `ifdef-loader?json={"isElectron":${false}}` },
        ],
        exclude: /node_modules/
      },
    ]
  },

  plugins: [
    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  target: 'node',
});
