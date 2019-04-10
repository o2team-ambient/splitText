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
    aniFolder
    styleFolder
    backgroundFolder

    constructor () {
      super()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      this.setAniGUI()
      this.setStyleGUI()
      this.setBgGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI () {
      // demo code
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI()
      gui.addCallbackFunc(this.resetCanvas.bind(this))

      gui.add(otherConfig, 'message').name('配置面板')

      this.isShowController && !this.isAmbientPlat && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        this.setBackgroundColor(val)
      })

      let f1=gui.addFolder('文案配置')
      
      f1.addGroup(config, 'text').name('文案列表').onFinishChange(val => {
        this.resetCanvas()
      })
      f1.open()
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)
    }

    setAniGUI () {
      this.aniFolder = this.gui.addFolder('动画设置')
      const config = this.config
      this.aniFolder.add(config, 'typeIn', {
          '从下方飘出': 'type-1',
          '弹簧型': 'type-2',
          '果冻甩': 'type-3',
          '左侧竖线滑出': 'type-4',
          '左侧翻转滑出': 'type-5',
          '无': 'type-6'
        })
        .name('进场动画')
        .onFinishChange(val => {
          this.resetCanvas()
        })

      this.aniFolder.add(config, 'typeOut', {
          '翻转向左淡出': 'type-1',
          '弹跳向下': 'type-2',
          '打散': 'type-3',
          '竖线右侧滑出': 'type-4',
          '无': 'type-5'
        })
        .name('退场动画')
        .onFinishChange(val => {
          this.resetCanvas()
        })

      this.aniFolder
        .add(config, 'loop', -1, 100, 1)
        .name('循环次数（-1为无限次）')
        .onFinishChange(val => {
          this.resetCanvas()
        })
      
      this.aniFolder
        .add(config, 'duration', 1, 20, 1)
        .name('动效持续时间')
        .onFinishChange(val => {
          this.resetCanvas()
        })
      this.aniFolder.open()
    }

    setStyleGUI () {
      this.styleFolder = this.gui.addFolder('字体样式')
      const config = this.config

      this.styleFolder
        .addColor(config, 'color')
        .name('文字颜色')
        .onFinishChange(val => {
          this.resetCanvas()
        })
      this.styleFolder
        .add(config, 'size', 16, 100, 1)
        .name('文字大小')
        .onChange(val => {
          this.resetCanvas()
        })
      this.styleFolder
        .add(config, 'width', 0, window.innerWidth, 1)
        .name('文字容器宽度')
        .onChange(val => {
          this.resetCanvas()
        })
      this.styleFolder
        .add(config, 'align', {
          '居中对齐': 'center',
          '靠左对齐': 'left',
          '靠右对齐': 'right',
        })
        .name('文字对齐方式')
        .onFinishChange(val => {
          this.resetCanvas()
        })
      
      this.styleFolder
        .add(config, 'posX', 0, window.innerWidth, 1)
        .name('X坐标')
        .onChange(val => {
          this.resetCanvas()
        })
      this.styleFolder
        .add(config, 'posY', 0, window.innerHeight, 1)
        .name('Y坐标')
        .onChange(val => {
          this.resetCanvas()
        })

      this.styleFolder.open()
    }

    setBgGUI () {
      this.backgroundFolder = this.gui.addFolder('背景设置')
      const config = this.config

      this.backgroundFolder
        .add(config, 'background')
        .name('背景图')
        .onFinishChange(val => {
          this.resetCanvas()
        })
      this.backgroundFolder
        .add(config, 'heightFloor', 0, 1000, 1)
        .name('楼层高度')
        .onFinishChange(val => {
          this.resetCanvas()
        })
      this.backgroundFolder.open()
    }

    initTextureGUI () {
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