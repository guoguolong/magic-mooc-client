const HtmlWebpackPlugin = require('html-webpack-plugin')
const { override, addLessLoader, overrideDevServer } = require("customize-cra");

const multipleEntry = require('react-app-rewire-multiple-entry')([
    {
        entry: './src/admin.tsx',
        template: 'public/admin.html',
        outPath: '/admin.html'
    }
]);

module.exports = {
    webpack: override(
        addLessLoader(),
        multipleEntry.addMultiEntry,
        (config, env) => {
            return config;
        }
    ),
    jest: function (config) {
        return config;
    },
    devServer: overrideDevServer(
        config => {
            return {
                ...config,
                historyApiFallback: {
                    disableDotRule: true,
                    rewrites: [
                        { from: /^\/admin/, to: '/admin.html' },
                        { from: /^\//, to: '/index.html' }
                    ]
                  }
            }
        }
    )
};