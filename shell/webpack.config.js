const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv && argv.mode === 'production';

  return {
    entry: './src/index.ts',
    mode: isProduction ? 'production' : 'development',
    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'shell',
        remotes: {},           // No remotes — shell is standalone for demo
        shared: {
          // NOT eager — this is the key fix for the "eager consumption" error
          react: {
            singleton: true,
            requiredVersion: '^18.0.0',
            eager: false,       // ← FIXED: was true, caused the error
          },
          'react-dom': {
            singleton: true,
            requiredVersion: '^18.0.0',
            eager: false,       // ← FIXED
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'React MFE Boilerplate',
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    optimization: {
      splitChunks: { chunks: 'all' },
    },
  };
};
