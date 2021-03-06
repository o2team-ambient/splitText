import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'

const name = 'ATAmbient'

export default [{
  input: 'src/rollup_index.js',
  output: {
    file: 'dist/index.dev.js',
    format: 'umd',
    name
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      comments: true
    }),
    postcss({})
  ]
}, {
  input: 'src/rollup_index.js',
  output: {
    file: 'dist/index.min.js',
    sourcemap: true,
    format: 'umd',
    name
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      presets: [["@babel/preset-env"]]
    }),
    postcss({}),
    uglify()
  ]
}]
