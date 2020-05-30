# koa-app

基于 typescript + koa 编写的 node 应用

[![lang](https://img.shields.io/badge/lang-typescript-informational)](https://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## 功能介绍

* 支持依赖注入
* 支持多应用模式
* 支持应用拓展
* 支持根据环境变量自动读取配置

## 目录结构

```bash
├── package.json
├── tsconfig.json
├── schema.prisma
├── .node-dev.json
├── public/                    # 静态目录
|   └── uploads/               # 上传目录
└── src/
    ├── setup.ts               # 项目启动前执行的脚本
    ├── main.ts                # 项目入口
    ├── app.ts                 # 主应用代码文件
    ├── apps/                  # 可选多应用，里面的子应用可以做成独立的 npm 模块，然后引入   
    |   ├── mobile/  
    |   |    ├── public/       # 静态资源，子应用可以部署自己的
    |   |    └── app.ts        # 子应用代码
    |   |
    |   └── admin/  
    |        ├── public/       # 静态资源，子应用可以部署自己的
    |        └── app.ts        # 子应用代码
    ├── config/                # node-config 配置目录，See: https://github.com/lorenwest/node-config/wiki/Configuration-Files
    |   ├── production.ts
    |   ├── development.ts
    |   └── default.ts
    ├── extend/                 # 拓展 koa 应用的配置文件
    |   ├── request.ts
    |   ├── response.ts
    |   ├── context.ts
    |   └── application.ts
    ├── framework/              # 基于 koa 封装的框架
    |   ├── app.ts
    |   ├── blueprints.ts
    |   ├── decorators.ts
    |   └── router.ts
    ├── interfaces/             # 定义目录
    |   ├── app.ts
    |   ├── blueprints.ts
    |   ├── decorators.ts
    |   └── router.ts
    ├── middleware/             # 中间件
    └── service/                # 内部服务
```

## 使用

```bash
# 安装依赖
$ npm install

# 创建数据库
$ npm run prisma:generate && npm run prisma:migrate:save && prisma:migrate:up

# 启动开发服务
$ npm run dev

# 启动调试模式，需要其他工具配合，如：vscode，chrome devtools
$ npm run debug
```

更多 `npm version` 的命令可使用 `npm version --help` 查看

## License

* MIT
