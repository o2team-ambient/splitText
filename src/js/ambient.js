import './utils/raf'
import {
  O2_AMBIENT_INIT,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_MAIN
} from './utils/const'

import splitText from './utils/splitText'
import { TimelineMax } from 'gsap'

let wrapper = document.querySelector('.o2team_ambient_main')
if (!wrapper) {
  wrapper = document.createElement('div')
  wrapper.setAttribute('class', 'o2team_ambient_main')
  wrapper.setAttribute('id', 'o2team_ambient_main')
  document.body.insertAdjacentElement('beforeend', wrapper)
}

function range(min, max) {
  return min + Math.random() * (max - min);
}

class main {
  // wrapper = null
  // nodes = null
  // _dom = null
  // resizeSto = null
  // ratio = null
  // imgEle = null

  constructor () {
    this.wrapper = wrapper
    this.nodes = []
    this._dom=[]
    this.ratio = this.getRatio()
    this.copyConfig()
    this.createStyle()
    this.createText()
    this.ani()
    this.bindResize()
  }

  bindResize () {
    window.addEventListener('resize', () => {
      if (this.resizeSto) return
      this.ratio = this.getRatio()
      console.log(this.ratio)
      this.reset()

      this.resizeSto = setTimeout(() => {
        clearTimeout(this.resizeSto)
        this.resizeSto = null
      }, 200)
    })
  }

  getRatio () {
    return document.documentElement.clientWidth / 1200
  }

  createText () {
    this.text = this.config.text
    for (let i = 0; i < this.text.length; i++) {
      this.create(this.text[i],i)
      this.nodes[i] = new splitText(this._dom[i])
    }
  }

  copyConfig () {
    this.config = JSON.parse(JSON.stringify(window[O2_AMBIENT_CONFIG]))
  }

  aniIn (tl, nodes, type) {
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
          e.style.left = `${e.style._left * this.ratio}px`
          e.style.top = `${e.style._top * this.ratio}px`
          e.style.height = `${30 * this.ratio}px`
          e.style.width = `${5 * this.ratio}px`
          e.style.position = 'absolute'
        })
        tl.staggerFrom(nodes, .5 * d, {
          x: -500 * this.ratio,
          opacity: 0,
        }, 0.01 * d)
        tl.staggerTo(nodes, 0.2 * d, {
          height: 'auto',
          width: 'auto',
          background: 'transparent'
        }, 0.03 * d, '-=0.2')
        break;

      case 'type-5':
        tl.staggerFrom(nodes, 0.2 * d, { opacity: 0, scaleX: -1, cycle: { x: [-100 * this.ratio, -250 * this.ratio] } }, 0.05 * d)
        break;
      case 'type-6':
        tl.staggerFrom(nodes, 0.02 * d, { opacity: 0 }, 0)
        break;
    }
  }

  aniOut (tl, nodes, type) {
    let d = this.config.duration / 10

    switch (type) {
      case 'type-1':
        tl.staggerTo(nodes, 0.2 * d, { opacity: 0, scaleX: -1, x: -15 * this.ratio }, 0.1 * d, "+=2")
        break;

      case 'type-2':
        tl.staggerTo(nodes, 0.5 * d, {
          opacity: 0,
          y: 50 * this.ratio,
          ease: Back.easeIn.config(8),
        }, 0.1 * d, '+=1')
        break;

      case 'type-3':
        tl.staggerTo(nodes, 2 * d, {
          opacity: 0,
          cycle: {
            rotation: function () {
              return range(-2000, 2000) * this.ratio;
            },
            x: function () {
              return range(-500, 500) * this.ratio;
            },
            y: function () {
              return range(-200, 500) * this.ratio;
            },
          }
        }, 0.015 * d, "+=1");
        break;

      case 'type-4':
        tl.staggerTo(nodes, 0.02 * d, {
          height: `${30 * this.ratio}`,
          width: `${5 * this.ratio}`,
          background: this.config.color
        }, 0.02 * d, '+=1')

        tl.staggerTo(nodes, 0.5 * d, {
          x: 500 * this.ratio,
          opacity: 0
        }, 0.01 * d, '-=0.05')
        break;
      case 'type-5':
        tl.staggerTo(nodes, 0.02 * d, { opacity: 0 }, 0, `+=${d}`)
        break;
    }
  }

  ani () {
    let tl = new TimelineMax({ repeat: this.config.loop })
    this.tl = tl
    for (let i = 0; i < this.nodes.length; i++) {
      this.aniIn(tl, this.nodes[i], this.config.typeIn)

      this.config.isLeave && this.aniOut(tl, this.nodes[i], this.config.typeOut)

    }
  }

  clear () {
    this.styleDom.remove()
    for (let i=0;i<this._dom.length;i++){
      this._dom[i].remove()
      this._dom[i] = null
    }
    this.nodes = []
    this.tl.kill()
  }
  createStyle () {
    let { size, posX, posY, color, heightFloor, background } = this.config

    let str = `
      .o2team_ambient_main{
        height:${heightFloor * this.ratio}px;
      }
      .o2team_ambient_main .font{
        width:${this.config.width * this.ratio}px;
        text-align:${this.config.align};
        color:${color};
        font-size: ${size * this.ratio}px;
      }
      `
    if (posX || posY) {
      str += `
      .o2team_ambient_main .font{
        color:${color};
        left:${posX * this.ratio}px;
        top: ${posY * this.ratio}px;
        position:absolute;
      }
      `
    }
    if (background) {
      if (!this.imgEle) {
        this.imgEle = document.createElement('img')
        this.wrapper.appendChild(this.imgEle)
      }
      this.imgEle.setAttribute('src', background)
      this.imgEle.setAttribute('style', 'width: 100%;display: block;')
    } else {
      if (this.imgEle) {
        this.imgEle.remove()
        this.imgEle = null
      }
    }


    let styleDom = document.createElement('style')
    styleDom.innerHTML = str
    this.styleDom = styleDom
    this.wrapper.appendChild(styleDom)
  }
  create (text,i) {
    let config = this.config
    let div = document.createElement('div')
    div.setAttribute('class', 'font')
    div.innerHTML = text
    this._dom[i] = div
    this.wrapper.appendChild(div)
  }
  reset () {
    this.copyConfig()

    this.clear()
    this.createStyle()
    this.createText()

    this.ani()

    console.log('reset')
  }
}

// 初始化函数
export default function initAmbient() {
  // let xxx = new XXX()
  // 主函数暴露
  window[O2_AMBIENT_MAIN] = new main()
}

// 初始化函数
window[O2_AMBIENT_INIT] = initAmbient
