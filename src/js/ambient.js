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
// wrapper.addEventListener('click', () => {
//   wrapper.style.display = 'none'
// })

function range(min, max) {
  return min + Math.random() * (max - min);
}

class main {
  constructor() {
    this.wrapper = wrapper
    this.nodes = []
    this._dom=[]
    this.copyConfig()
    this.createStyle()
    this.createText()
    this.ani()
  }
  createText() {
    this.text = this.config.text
    for (let i = 0; i < this.text.length; i++) {
      this.create(this.text[i],i)
      this.nodes[i] = new splitText(this._dom[i])
    }
  }
  copyConfig() {
    this.config = JSON.parse(JSON.stringify(window[O2_AMBIENT_CONFIG]))
  }

  aniIn(tl, nodes, type) {
    let d = this.config.duration / 10
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
      case 'type-6':
        tl.staggerFrom(nodes, 0.02 * d, { opacity: 0 }, 0)
        break;
    }
  }

  aniOut(tl, nodes, type) {
    let d = this.config.duration / 10

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
            rotation: function () {
              return range(-2000, 2000);
            },
            x: function () {
              return range(-500, 500);
            },
            y: function () {
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
      case 'type-5':
        tl.staggerTo(nodes, 0.02 * d, { opacity: 0 }, 0, `+=${d}`)
        break;
    }
  }

  ani() {
    let tl = new TimelineMax({ repeat: this.config.loop })
    this.tl = tl
    for (let i = 0; i < this.nodes.length; i++) {
      this.aniIn(tl, this.nodes[i], this.config.typeIn)

      this.config.isLeave && this.aniOut(tl, this.nodes[i], this.config.typeOut)

    }
  }

  clear() {
    this.styleDom.remove()
    for (let i=0;i<this._dom.length;i++){
      this._dom[i].remove()
      this._dom[i] = null
    }
    this.nodes = []
    this.tl.kill()
  }
  createStyle() {
    let { size, posX, posY, color, heightFloor, background } = this.config

    let str = `
      .o2team_ambient_main{
        height:${heightFloor}px;
        align-items: center;
        display:flex;
      }
      .o2team_ambient_main .font{
        width:${this.config.width}px;
        text-align:${this.config.align};
        color:${color};
        font-size: ${size}px;
      }
      `
    if (posX || posY) {
      str += `
      .o2team_ambient_main .font{
        color:${color};
        left:${posX}px;
        top: ${posY}px;
        position:absolute;
      }
      `
    }
    if (background) {
      str += `
      .o2team_ambient_main{
        background-image:url(${background});
        background-position:center;
        background-size:100% auto;
        background-repeat:no-repeat;
      }
      `
    }


    let styleDom = document.createElement('style')
    styleDom.innerHTML = str
    this.styleDom = styleDom
    this.wrapper.appendChild(styleDom)
  }
  create(text,i) {
    let config = this.config
    let div = document.createElement('div')
    div.setAttribute('class', 'font')
    div.innerHTML = text
    this._dom[i] = div
    this.wrapper.appendChild(div)
  }
  reset() {
    this.copyConfig()

    this.clear()
    this.createStyle()
    this.createText()

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