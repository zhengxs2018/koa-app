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

  @Get('home', '/')
  index(ctx: Context) {
    ctx.body = 'hello,world'
  }

  @Get('/urls')
  urls(ctx: Context) {
    ctx.body = {
      // 主页
      home: ctx.urlFor('.home'),
      // 移动端首页
      mobileHome: ctx.urlFor('mobile.home'),
      // 管理后台首页
      adminHome: ctx.urlFor('admin.home')
    }
  }

  @Get('/api/users')
  async users(ctx: Context) {
    ctx.body = await this.user.allUsers()
  }
}
