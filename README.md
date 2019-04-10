## 使用方法

```
jnpm i @o2team/ambient-splitText --save
```

```javascript
import ATAmbient from '@o2team/ambient-splitText'

ATAmbient({
  text: ['每满99减50','测试测试测试哦'],
  typeIn: 'type-1',
  typeOut: 'type-1',
  font:'',
  color:'#fff',
  size:50,
  posX: 172,
  posY: 352,
  isLeave: true,
  loop:-1,
  zIndex:1,
  duration:10,
  heightFloor:778,
  width:372,
  align:'center',
  background: '//jdc.jd.com/demo/ambient/splitText/bg.jpg' //url or color,
})
```

## 配置说明

| 字段 | 类型 | 可选值 | 效果 |
|-|-|-|-|
| loop | `boolean` | `true`, `false` | 是否循环 |

## 预览地址

https://o2team-ambient.github.io/xxx/dist/?controller=1

## 项目结构

```
├── config                  - 编译配置
│   ├── base.conf.js
│   └── custom.conf.js
├── info.json               - 组件信息
└── src
    ├── css
    │   ├── base.scss
    │   └── package.scss
    ├── index.ejs
    ├── index.js            - 主入口文件
    ├── rollup_index.js     - npm 包主入口文件
    ├── config.js           - 控制板参数配置文件（单独打包）
    ├── control.js          - 控制板入口文件（单独打包）
    └── js
        ├── ambient.js
        ├── controlinit.js  - 控制板自定义代码
        └── utils
            ├── const.js    - 字段常数
            ├── raf.js
            └── util.js
```

> 开发完毕之后，请新建 gh-pages 分支并 push --set-upstream，以获得线上 demo 页。每次更新后，测试完成即可合并至 gh-pages 发布。