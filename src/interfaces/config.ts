import { ListenOptions } from 'net'

export interface Configuration {
  keys: string[]
  proxy: boolean
  paths: {
    /** 项目根路径 */
    root: string
    /** 运行时目录 */
    runtime: string
    /** 公共目录 */
    public: string
    /** 上传目录 */
    uploads: string
  }
  listen: ListenOptions
}
