import './utils/raf'
import {
  O2_AMBIENT_INIT,
  O2_AMBIENT_CONFIG
} from './utils/const'

import splitText from './utils/splitText'
import { TimelineMax } from 'gsap'


// 判断是否可点，被点中则隐藏
const wrapper = document.querySelector('.o2team_ambient_main')
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

function ani_1() {
  let dom = document.querySelector('.f1')
  let nodes = new splitText(dom)
  console.log(nodes)
  let tl = new TimelineMax({ repeat: -1 })
  tl.staggerFrom(nodes, 0.2, { opacity: 0, scaleX: -1, cycle: { x: [-100, -250] } }, 0.05)

  tl.staggerTo(nodes, 0.2, { opacity: 0, scaleX: -1, x: -15 }, 0.1, 2)
}

function ani_2() {
  let dom = document.querySelector('.f2')
  let nodes = new splitText(dom)
  console.log(nodes)
  let tl = new TimelineMax({ repeat: -1 })

  tl.staggerFrom(nodes, 0.5, { opacity: 0, scale: 0, y: 100 }, 0.05)

  tl.staggerTo(nodes, 0.5, { opacity: 0, y: 50, ease: Back.easeIn.config(8), delay: 1, }, 0.1, 2)
}

function ani_3() {
  let dom = document.querySelector('.f3')
  let nodes = new splitText(dom)
  console.log(nodes)
  let tl = new TimelineMax({ repeat: -1 })

  tl.staggerFrom(nodes, 1, { y: 100, rotation: 90, opacity: 0, ease: Elastic.easeOut }, 0.03);

  tl.staggerTo(nodes, 2, {
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
      // physics2D: function() {
      //   return { angle: range(240, 320), velocity: range(300, 600), gravity: 800 };
      // }
    }
  }, 0.015, 3);

  function range(min, max) {
    return min + Math.random() * (max - min);
  }
}

function ani_4() {
  let dom = document.querySelector('.f4')
  let nodes = new splitText(dom)
  console.log(nodes)
  let tl = new TimelineMax({ repeat: -1 })

  tl.staggerFrom(nodes, .5, { scale: 4, autoAlpha: 0, rotationX: -180, transformOrigin: "100% 50%", ease: Back.easeOut }, 0.1);
  // tl.staggerTo(nodes, 0.5, { opacity: 0, y: 50, ease: Back.easeIn.config(8), delay: 1, }, 0.1, 2)
}

function ani_5() {
  let dom = document.querySelector('.f5')
  let nodes = new splitText(dom)
  nodes.forEach((e) => {
    e.style._left = e.offsetLeft
    e.style._top = e.offsetTop
    e.style.overflow = 'hidden'
    e.style.background = '#fff'
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
  let tl = new TimelineMax({ repeat: -1 })

  tl.staggerFrom(nodes, .5, {
    x: -500,
    opacity: 0,
  }, 0.01)

  tl.staggerTo(nodes, 0.2, { height: 'auto', width: 'auto', background: 'transparent' }, 0.03, '-=0.2')

  tl.staggerTo(nodes, 0.02, { height: '30', width: '5', background: '#fff' }, 0.02, '+=1')

  tl.staggerTo(nodes, 0.5, {
    x: 500,
    opacity: 0
  }, 0.01,'-=0.05')

}
// 初始化函数
function initAmbient() {
  // let xxx = new XXX()
  // 主函数暴露
  // window[O2_AMBIENT_MAIN] = 

  ani_1()
  ani_2()
  ani_3()
  ani_4()
  ani_5()
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