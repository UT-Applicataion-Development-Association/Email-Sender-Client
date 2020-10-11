const path = require("path");

const PROJECT_ROOT = path.resolve(__dirname, "../");

module.exports = {
    // Uncomment next line for debugging only
    // devtool: "eval-source-map",
    entry: {
        index: path.resolve(__dirname, "../src/index.js"),
        framework: ["react", "react-dom", "antd", "react-router-dom"],
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
        filename: "index.bundle.js",
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
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images/",
                        limit: 8192,
                    },
                },
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name]_[hash].[ext]",
                        outputPath: "font/",
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".css", ".scss", ".less", ".png", ".svg"],
        alias: {
            Src: path.resolve(PROJECT_ROOT, "./src"),
            Components: path.resolve(PROJECT_ROOT, "./src/components"),
            Configs: path.resolve(PROJECT_ROOT, "./src/configs"),
            Libs: path.resolve(PROJECT_ROOT, "./src/libs"),
            Models: path.resolve(PROJECT_ROOT, "./src/models"),
            Pages: path.resolve(PROJECT_ROOT, "./src/pages"),
            Routes: path.resolve(PROJECT_ROOT, "./src/routes"),
            Services: path.resolve(PROJECT_ROOT, "./src/services"),
            Utils: path.resolve(PROJECT_ROOT, "./src/utils"),
        },
    },
    externals: [],
};
