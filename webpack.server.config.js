const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const CopyPlugin = require('copy-webpack-plugin');

const {
	resolve
} = path;

module.exports = (env = {}) => {
	const IS_PRODUCTION_MODE = !env.dev;

	return{
		entry: './server/index.js',
		target: 'node',
		output: {
			path: path.resolve(__dirname, 'server-dist'),
			filename: 'server.bundle.js',
			libraryTarget: 'commonjs2'
		},
		optimization: {
			minimize: IS_PRODUCTION_MODE
		},
		module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'ignore-loader'
				]
			}]
    },
    plugins: [
      new CopyPlugin([
        { from: 'tasks.json', to: '' },
      ])
    ],
		resolve: {
			extensions: ['.js', '.jsx', '.scss'],
			alias: {
				components: resolve(__dirname, 'react-app', 'components')
			}
		}
	}
};
