const path = require("path");

module.exports = {
    // Uncomment next line for debugging only
    // devtool: "eval-source-map",
    entry: {
        index: path.resolve(__dirname, "../src/index.js"),
        framework: ["react", "react-dom", "antd", "react-router-dom"],
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
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
    },
    externals: [],
};
