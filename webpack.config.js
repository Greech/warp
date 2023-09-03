const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './games/planet-explorer/src/index.ts',
    devtool: 'inline-source-map',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            '@warp/core': path.resolve(__dirname, 'packages/core/public-api.ts'),
            '@warp/state': path.resolve(__dirname, 'packages/state/public-api.ts'),
        },
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'games/planet-explorer/src/dist'),
    },
    plugins: [
        new CopyWebPackPlugin({
            patterns:
                [
                    { from: "games/planet-explorer/src/assets", to: "assets" },
                    { from: "games/planet-explorer/src/index.html", to: "" },
                ]
        }
        )
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'games/planet-explorer/src/dist'), // Directory to serve
        },
        port: 8080, // Port number
        hot: true, // Enable hot module replacement
      },
};