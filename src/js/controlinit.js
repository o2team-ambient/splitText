/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor() {
      this.message = '文字动效'
      this.backgroundColor = '#000'
      this.play = () => {
        if (!window[O2_AMBIENT_MAIN] || !window[O2_AMBIENT_MAIN].toggle || typeof window[O2_AMBIENT_MAIN].toggle !== 'function') return
        window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  // 主控制面板
  class Control extends Controller {
    constructor() {
      super()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI() {
      // demo code
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI()
      gui.addCallbackFunc(this.resetCanvas.bind(this))

      gui.add(otherConfig, 'message').name('配置面板')

      // gui.add(config, 'text').name('文字').onFinishChange(val => {
      //   this.resetCanvas()
      // })
      gui.addColor(config, 'color').name('文字颜色').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'size', 16, 100, 1).name('文字大小').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'width', 0, window.innerWidth, 1).name('文字容器宽度').onFinishChange(val => {
        this.resetCanvas()
      })

      gui.add(config, 'align', {
        '居中对齐': 'center',
        '靠左对齐': 'left',
        '靠右对齐': 'right',
      })
      .name('文字对齐方式')
      .onFinishChange(val => {
        this.resetCanvas()
      })

      gui.add(config, 'typeIn', {
        '类型一': 'type-1',
        '类型二': 'type-2',
        '类型三': 'type-3',
        '类型四': 'type-4',
        '类型五': 'type-5',
        '类型六': 'type-6',
      })
      .name('动画进场类型')
      .onFinishChange(val => {
        this.resetCanvas()
      })

      gui.add(config, 'typeOut', {
        '类型一': 'type-1',
        '类型二': 'type-2',
        '类型三': 'type-3',
        '类型四': 'type-4',
        '类型五': 'type-5',
      })
      .name('动画退场类型')
      .onFinishChange(val => {
        this.resetCanvas()
      })
      
      gui.add(config, 'posX', 0, window.innerWidth, 1).name('X坐标').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'posY', 0, window.innerHeight, 1).name('Y坐标').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'loop', -1, 100, 1).name('循环次数(无限-1)').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'isLeave').name('是否离场').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'background').name('背景图').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'heightFloor', 0, 1000, 1).name('楼层高度').onFinishChange(val => {
        this.resetCanvas()
      })
      gui.add(config, 'duration', 1, 20, 1).name('动效持续时间').onFinishChange(val => {
        this.resetCanvas()
      })

      this.isShowController && !this.isAmbientPlat && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        this.setBackgroundColor(val)
      })
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)
    }

    initTextureGUI() {
      // demo code
      const gui = this.gui
      const textures = this.config.textures
      const group = gui.addFolder('文字样式')
      textures && Object.keys(textures).forEach((key, idx) => {
        const textureController = group.add(textures, key).name(`纹理${idx + 1}`)
        textureController.onFinishChange(val => {
          this.resetCanvas()
        })
      })
      group.open()

      this.group = group
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit