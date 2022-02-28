const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    astrofusion: './src/components/index.js',
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[id].chunk.map',
    chunkFilename: '[id].chunk.js',
    path: path.resolve(__dirname, 'build/dist/'),
    library: 'Astrofusion', // Desired name for the global variable when using as a drop-in script-tag.
    libraryTarget: 'umd',
    globalObject: 'this',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react/jsx-runtime': path.resolve('./node_modules/react/jsx-runtime.js'),
    },
  },
  optimization: {
    usedExports: true,
    minimize: true,
    emitOnErrors: true,
    removeAvailableModules: true,
    minimizer: [
      new MiniCssExtractPlugin(),
      new TerserPlugin({
        terserOptions: {
          format: {
            // Tell terser to remove all comments except for the banner added via LicenseWebpackPlugin.
            // This can be customized further to allow other types of comments to show up in the final js file as well.
            // See the terser documentation for format.comments options for more details.
            comments: (astNode, comment) =>
              comment.value.startsWith('! licenses are at '),
          },
          // This option was added to fix the following error in 10n6:
          // Uncaught TypeError: Super expression must either be null or a function
          keep_fnames: true,
        },
        extractComments: false, // prevents TerserPlugin from extracting a [chunkName].js.LICENSE.txt file
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new LicenseWebpackPlugin({
      addBanner: true,
      renderBanner: (filename, modules) => {
        return '/*! licenses are at ' + filename + '*/';
      },
      handleMissingLicenseText: (packageName, licenseType) => {
        console.log('No license found for ' + packageName);
        return 'UNKNOWN';
      },
      licenseTextOverrides: {
        'styled-components':
          'https://github.com/styled-components/styled-components/blob/main/LICENSE',
        'use-onclickoutside': 'No license found',
        'use-latest': 'No license found',
        'are-passive-events-supported': 'No license found',
        'react-select':
          'MIT | https://github.com/JedWatson/react-select/blob/master/LICENSE',
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'astrofusion.css',
    }),
  ],
  module: {
    rules: [
      { oneOf: [{ type: 'javascript/auto' }] },
      {
        test: /\.(js|jsx)$/,
        exclude: [/\/node_modules\//, /\/demos\//],
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|webp|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        sideEffects: true,
      },
    ],
  },
};
