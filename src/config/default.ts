import { dirname, join } from 'path'

import { deferConfig as defer } from 'config/defer'
import toInteger from 'lodash/toInteger'

import { Configuration } from '../interfaces/config'

export default {
  proxy: false,
  keys: [
    '7baec477dfb106dc4c194d7f4d15b29583e5932e',
    'e6dca5fdbd70f605539f13157b006ee0660e960a',
  ],
  paths: {
    root: dirname(dirname(__dirname)),
    runtime: defer(function resolver(this: Configuration) {
      return join(this.paths.root, 'run')
    }),
    public: defer(function resolver(this: Configuration) {
      return join(this.paths.root, 'public')
    }),
    uploads: defer(function resolver(this: Configuration) {
      return join(this.paths.public, 'uploads')
    }),
  },
  listen: {
    port: toInteger(process.env.PORT || 8080),
  },
} as Partial<Configuration>
