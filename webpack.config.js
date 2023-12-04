import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default {
  mode: 'production',
  entry: './dist/index.js',
  module: {
    rules: [{
      test: /\.(js)$/,
      resolve: {
        fullySpecified: false
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': JSON.stringify('')
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ],
  resolve: {
    fallback: {
      path: false,
      fs: false,
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      zlib: require.resolve('browserify-zlib')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'bundle'),
    filename: 'index.js',
    library: {
      type: 'var',
      name: 'GTFSIO'
    }
  },
};
