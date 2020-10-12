const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "js/[name].[chunkhash:8].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.png$/,
                use: "url-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "public/index.html",
            inject: "body",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css",
        }),
    ],
    performance: {
        hints: "warning",
        maxEntrypointSize: 3000000,
        maxAssetSize: 2500000,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ["default", { discardComments: { removeAll: true } }],
                },
                canPrint: true,
            }),
        ],
        splitChunks: {
            chunks: "all",
            minSize: 20000,
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                framework: {
                    test: "framework",
                    name: "framework",
                    enforce: true,
                },
                vendors: {
                    priority: -10,
                    test: /node_modules/,
                    name: "vendor",
                    enforce: true,
                },
            },
        },
    },
});
