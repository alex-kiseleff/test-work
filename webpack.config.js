const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env) => {

	const isDev = env.mode === 'dev';

	return {
		mode: isDev
			? 'development'
			: 'production',
		devtool: isDev
			? 'source-map'
			: false,
		entry: {
			main: `${__dirname}/src/scripts/index.ts`
		},
		output: {
			path: `${__dirname}/dist`,
			filename: isDev
				? 'scripts/[name].bundle.js'
				: 'scripts/[contenthash].bundle.js',
			clean: true,
			assetModuleFilename: 'assets/[name][ext]'
		},
		devServer: {
			static: {
				directory: `${__dirname}/public`,
				publicPath: '/public'
			},
			hot: true,
			open: {
				app: 'chrome',
			},
			historyApiFallback: true
		},
		module: {
			rules: [
				{
					test: /\.(c|sc)ss$/i,
					use: [
						isDev
							? 'style-loader'
							: { loader: MiniCssExtractPlugin.loader, options: { publicPath: `${__dirname}/dist` } },
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.js$/i,
					exclude: /node_modules/,
					use: 'babel-loader'
				},
				{
					test: /\.ts$/i,
					exclude: /node_modules/,
					use: 'ts-loader'
				},
				{
					test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf)$/i,
					type: 'asset/inline',
				},
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: `${__dirname}/src/index.html`,
				filename: 'index.html',
				minify: {
					collapseWhitespace: true,
					collapseInlineTagWhitespace: true
				}
			}),
			...(isDev
				? []
				: [new MiniCssExtractPlugin({
					filename: 'styles/[contenthash].css',
					chunkFilename: '[id].css',
				})])
		],
		resolve: {
			extensions: ['.ts', '.js', '.json']
		},
		optimization: {
			minimize: isDev ? false : true,
			minimizer: [new CssMinimizerPlugin(), '...'],
		},
		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
		},
	}
}