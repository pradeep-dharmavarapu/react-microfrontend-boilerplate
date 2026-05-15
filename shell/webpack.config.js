const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
  entry: './src/index.tsx',
    mode: isProduction ? 'production' : 'development',
    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
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
        remotes: {
          // Dynamic remotes — loaded at runtime from config
          // Allows independent deployments without rebuilding shell
          mfeDashboard: `promise new Promise(resolve => {
            const script = document.createElement('script');
            script.src = window.__MFE_CONFIG__?.dashboard || 'http://localhost:3001/remoteEntry.js';
            script.onload = () => resolve(window.mfeDashboard);
            document.head.appendChild(script);
          })`,
          mfeAnalytics: `promise new Promise(resolve => {
            const script = document.createElement('script');
            script.src = window.__MFE_CONFIG__?.analytics || 'http://localhost:3002/remoteEntry.js';
            script.onload = () => resolve(window.mfeAnalytics);
            document.head.appendChild(script);
          })`,
        },
        shared: {
          react: { singleton: true, requiredVersion: '^18.0.0', eager: true },
          'react-dom': { singleton: true, requiredVersion: '^18.0.0', eager: true },
          'react-router-dom': { singleton: true, requiredVersion: '^6.0.0' },
          redux: { singleton: true },
          'react-redux': { singleton: true, requiredVersion: '^9.0.0' },
          '@reduxjs/toolkit': { singleton: true },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        title: 'MFE Shell',
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: 'auto',
    },
  };
};
