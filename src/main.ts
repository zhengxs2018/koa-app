import { container } from 'tsyringe'

import { PrismaClient } from '@prisma/client'

import { App } from './interfaces/app'

import { runServer} from './framework/server'
import { createApp } from './framework/app'
import { registerBlueprint } from './framework/blueprints'

import { Blog } from './app'

import { Admin } from './apps/admin/app'
import { Mobile } from './apps/mobile/app'

// 全局依赖
container.registerInstance(PrismaClient, new PrismaClient())

// 创建服务
const server = createApp(<App>Blog)

// 注册子应用
registerBlueprint(server, Admin)
registerBlueprint(server, Mobile)

// 启动服务
runServer(server)
