import { resolve } from 'path'

import { injectable } from 'tsyringe'

import { Blueprint } from '../../interfaces/blueprints'
import { Context } from '../../interfaces/framework'

import { Get } from '../../framework/decorators'

@injectable<Blueprint>()
export class Mobile implements Blueprint {
  name = 'mobile'

  urlPrefix = '/m'

  staticFolder = resolve(__dirname, 'public')

  @Get('home', '/')
  index(ctx: Context) {
    ctx.body = '这是移动端首页'
  }
}
