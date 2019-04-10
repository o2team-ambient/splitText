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
  color: '#fff',
  size: 50,
  posX: 172,
  posY: 352,
  loop: -1,
  duration: 10,
  heightFloor: 778,
  width: 372,
  align: 'center',
  background: '//jdc.jd.com/demo/ambient/splitText/bg.jpg' //url or color,
})
```

## 配置说明

| 字段 | 类型 | 可选值 | 效果 |
|-|-|-|-|
| text | `array<string>` | - | 文案列表 |
| typeIn | `string` | `{ '从下方飘出': 'type-1', '弹簧型': 'type-2', '果冻甩': 'type-3', '左侧竖线滑出': 'type-4', '左侧翻转滑出': 'type-5', '无': 'type-6' }` | 进场动画 |
| typeOut | `string` | `{ '翻转向左淡出': 'type-1', '弹跳向下': 'type-2', '打散': 'type-3', '竖线右侧滑出': 'type-4', '无': 'type-5' }` | 退场动画 |
| color | `string` | 带 `#` 的色值 | 文字颜色 |
| size | `number` | 16-100 | 文字大小 |
| posX | `number` | - | X坐标 |
| posY | `number` | - | Y坐标 |
| loop | `number` | - | 循环次数（-1为无限次） |
| duration | `number` | 1-20 | 动效持续时间 |
| heightFloor | `number` | - | 楼层高度 |
| width | `number` | - | 文字容器宽度 |
| align | `string` | `{ '居中对齐': 'center', '靠左对齐': 'left', '靠右对齐': 'right', }` | 文字对齐方式 |
| background | `string` | 带 `#` 的色值 / 图片 url | 背景图 |

## 预览地址

https://o2team-ambient.github.io/splitText/dist/?controller=1

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