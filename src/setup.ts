import 'reflect-metadata'

import { resolve } from 'path'

import mkdirp from 'mkdirp'
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

// 修改配置文件目录
process.env.NODE_CONFIG_DIR = resolve(__dirname, 'config')

// 引入配置模块
const config = require('config')

// 创建目录
mkdirp.sync(config.get('paths.runtime'))
mkdirp.sync(config.get('paths.public'))
mkdirp.sync(config.get('paths.uploads'))
