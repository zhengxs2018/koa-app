import config from 'config'

import { injectable, inject } from 'tsyringe'

import { App } from './interfaces/app'
import { Context } from './interfaces/framework'

import { Get } from './framework/decorators'

import { UserService } from './service/user'

@injectable<App>()
export class Blog implements App {
  /** 静态目录 */
  staticFolder: string = config.get('paths.public')

  constructor(@inject(UserService) private user: UserService) {}

  @Get('/')
  index(ctx: Context) {
    ctx.body = 'hello,world'
  }

  @Get('/api/users')
  async users(ctx: Context) {
    ctx.body = await this.user.allUsers()
  }
}
