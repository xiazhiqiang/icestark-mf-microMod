# icestark-mf-microMod

icestark 微前端框架集成 module federation 及微模块验证

验证 Demo 环境：

- 主应用 main
- 子应用 child1
- 子应用 child2
- 微模块 microMod

## 本地调试

### child1 准备

- 构建 child1

```sh
cd child1 && npm run build
```

- 启动 child1 产物服务（为主应用集成做准备）

```sh
cd child1/build
npx http-server ./ -c-1 --cors='*' -p=8881
```

### child2 准备

- 构建 child2

```sh
cd child2 && npm run build
```

- 启动 child2 产物服务（为主应用集成做准备）

```sh
cd child2/build
npx http-server ./ -c-1 --cors='*' -p=8882
```

### microMod 准备

- 构建 microMod

```sh
cd microMod && npm run build
```

- 启动 microMod 产物服务（为应用集成做准备）

```sh
cd microMod/build
npx http-server ./ -c-1 --cors='*' -p=8883
```

### 主应用启动

- 启动 main

```sh
cd main && npm start
```

- 访问子应用

http://localhost:3333#/child1

## MF 验证场景

✅ 主应用共享模块，子应用 child1 使用模块，子应用 child2 使用模块
✅ 子应用 child1 共享模块，主应用使用模块
❎【不支持主子相互共享模块使用】子应用 child1 共享模块，主应用共享模块，子应用使用主应用共享的模块
❎【不支持子应用之间共享模块使用】子应用 child1 共享模块，子应用 child2 使用模块。

**结论：在 icestark 微前端框架中，集成 MF 只能够实现主应用 =》子应用或子应用 =》主应用单向的共享和使用模块，其他方式均不支持。**

## 微模块验证场景

✅ 主应用加载微模块渲染
✅ 子应用 child1 加载微模块渲染
❎ 主应用和子应用 child1 均加载相同的微模块渲染，切换子应用 child1=》child2 时，会卸载掉 child1 中的微模块样式，导致主应用渲染的微模块样式丢失

**结论：在 icestark 微前端框架中，通过 @ice/stark-module 加载渲染微模块，只能在各个子应用中加载使用，不能在主应用和子应用同时使用相同的微模块。**
