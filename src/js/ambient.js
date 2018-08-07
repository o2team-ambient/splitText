import './utils/raf'
import {
  O2_AMBIENT_INIT,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_MAIN
} from './utils/const'

import splitText from './utils/splitText'
import { TimelineMax } from 'gsap'


// 判断是否可点，被点中则隐藏
const wrapper = document.querySelector('.o2team_ambient_main')
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

function range(min, max) {
  return min + Math.random() * (max - min);
}

class main {
  constructor() {
    this.wrapper = wrapper
    this.copyConfig()
    this.createStyle()
    this.create(this.config.text)
    this.ani()
  }
  copyConfig() {
    this.config = JSON.parse(JSON.stringify(window[O2_AMBIENT_CONFIG]))
  }

  aniIn(tl, nodes, type) {
    let d = this.config.duration/10
    switch (type) {
      case 'type-1':
        tl.staggerFrom(nodes, 0.5 * d, { opacity: 0, scale: 0, y: 100 }, 0.05 * d)
        break;


      case 'type-2':
        tl.staggerFrom(nodes, .5 * d, {
          scale: 4,
          autoAlpha: 0,
          rotationX: -180,
          transformOrigin: "100% 50%",
          ease: Back.easeOut
        }, 0.1 * d);
        break;

      case 'type-3':
        tl.staggerFrom(nodes, 1 * d, { y: 100, rotation: 90, opacity: 0, ease: Elastic.easeOut }, 0.03 * d);
        break;

      case 'type-4':
        nodes.forEach((e) => {
          e.style._left = e.offsetLeft
          e.style._top = e.offsetTop
          e.style.overflow = 'hidden'
          e.style.background = this.config.color
          e.style.lineHeight = 1
          // e.style.letterSpacing = '10px'
        })
        nodes.forEach((e) => {
          e.style.left = e.style._left + 'px'
          e.style.top = e.style._top + 'px'
          e.style.height = '30px'
          e.style.width = '5px'
          e.style.position = 'absolute'
        })
        tl.staggerFrom(nodes, .5 * d, {
          x: -500,
          opacity: 0,
        }, 0.01 * d)
        tl.staggerTo(nodes, 0.2 * d, {
          height: 'auto',
          width: 'auto',
          background: 'transparent'
        }, 0.03 * d, '-=0.2')
        break;

      case 'type-5':
        tl.staggerFrom(nodes, 0.2 * d, { opacity: 0, scaleX: -1, cycle: { x: [-100, -250] } }, 0.05 * d)
        break;
    }
  }

  aniOut(tl, nodes, type) {
    let d = this.config.duration/10

    switch (type) {
      case 'type-1':
        tl.staggerTo(nodes, 0.2 * d, { opacity: 0, scaleX: -1, x: -15 }, 0.1 * d, "+=2")
        break;

      case 'type-2':
        tl.staggerTo(nodes, 0.5 * d, {
          opacity: 0,
          y: 50,
          ease: Back.easeIn.config(8),
        }, 0.1 * d, '+=1')
        break;

      case 'type-3':
        tl.staggerTo(nodes, 2 * d, {
          opacity: 0,
          cycle: {
            rotation: function() {
              return range(-2000, 2000);
            },
            x: function() {
              return range(-500, 500);
            },
            y: function() {
              return range(-200, 500);
            },
          }
        }, 0.015 * d, "+=1");
        break;

      case 'type-4':
        tl.staggerTo(nodes, 0.02 * d, {
          height: '30',
          width: '5',
          background: this.config.color
        }, 0.02 * d, '+=1')

        tl.staggerTo(nodes, 0.5 * d, {
          x: 500,
          opacity: 0
        }, 0.01 * d, '-=0.05')
        break;
    }
  }

  ani() {
    let tl = new TimelineMax({ repeat: this.config.loop })
    let nodes = new splitText(this._dom)

    this.aniIn(tl, nodes, this.config.typeIn)

    this.config.isLeave && this.aniOut(tl, nodes, this.config.typeOut)
  }

  clear() {
    this._dom.remove()
    this._dom = null
  }
  createStyle() {
    let { size, posX, posY, color, heightFloor } = this.config

    let str = `
      .o2team_ambient_main .font{
        color:${color};
        left:${posX}px;
        top: ${posY}px;
        font-size: ${size}px;
        padding-top:${heightFloor}px;
        position:absolute;
      }
    `
    let styleDom = document.createElement('style')
    styleDom.innerHTML = str
    this.wrapper.appendChild(styleDom)

  }
  create() {
    let config = this.config
    let div = document.createElement('div')
    div.setAttribute('class', 'font')
    div.innerHTML = config.text
    this._dom = div
    this.wrapper.appendChild(div)
  }

  reset() {
    this.copyConfig()

    this.clear()
    this.createStyle()
    this.create()

    this.ani()

    console.log('reset')
  }
}

// 初始化函数
function initAmbient() {
  // let xxx = new XXX()
  // 主函数暴露
  window[O2_AMBIENT_MAIN] = new main()
}

// 初始化函数
window[O2_AMBIENT_INIT] = initAmbient

try {
  // 保证配置读取顺序
  let csi = setInterval(() => {
    if (!window[O2_AMBIENT_CONFIG]) return
    clearInterval(csi)
    initAmbient()
  }, 1000)
} catch (e) {
  console.log(e)
}