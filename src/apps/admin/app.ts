import { resolve } from 'path'

import { injectable } from 'tsyringe'

import { Blueprint } from '../../interfaces/blueprints'
import { Context } from '../../interfaces/framework'

import { Get } from '../../framework/decorators'

@injectable<Blueprint>()
export class Admin implements Blueprint {
  name = 'admin'

  staticFolder = resolve(__dirname, 'public')

  @Get('home', '/')
  index(ctx: Context) {
    ctx.body = '这是管理后台首页'
  }
}
