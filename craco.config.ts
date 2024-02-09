import { PlatformPath } from 'node:path';

const path: PlatformPath = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@utils': path.resolve(__dirname, 'src/helpers'),
            '@model': path.resolve(__dirname, 'src/model'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@store': path.resolve(__dirname, 'src/store'),
            '@components': path.resolve(__dirname, 'src/components'),
        },
    },
};