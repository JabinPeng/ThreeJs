<template>
  <div id="remap" style="width: 1920px;height: 800px;">
    <div id="canvas-frame" class="canvas_frame"></div>
    <panel v-if="isFlag.airPlan" @ms="ms" @kg = 'kg' @yy="yy" @or="or" :isRe="isRe" :T="T" :isOpen="isOpen" :isAi="isAi" @patternChange="patternChange" @tChange="tChange" :pattern="pattern" style="position: absolute;z-index: 101;opacity: .9;" :style="{top: (isFlag.Y) +'px', left: (isFlag.X) +'px'}"></panel>
    <div id="tip" :style="{top: (isFlag.Y) +'px', left: (isFlag.X + 100) +'px'}" style="width:300px; height:300px; position: fixed;display:table-cell;background-size: 100% 100%;" v-show="isFlag.dataFlag" >
      <p v-text="isFlag.facility" class="facilityName"></p>
      <p v-text="isFlag.message" class="facilityDetails"></p>
      <div id="btn" @click="close()">我知道了</div>
    </div>
    <div></div>
  </div>
</template>

<script>
  import { remap3D } from '../assets/js/remap3D.js'
  import { Aobjects } from '../assets/js/data.js'
  import panel from './iot/iotItem/my_panel'
  import kuang from '../assets/images/kuang.png'
export default {
  components: {
    panel
  },
  data () {
    return {
      initOption: {
        antialias: true,
        showHelpGrid: false,
        clearCoolr: 0xffffff,
        divHeight:800,
        divWidth:1920
      },
      isFlag: {
        dataFlag: false,
        X: 0,
        Y: 0,
        facility: '',
        message: '',
        airPlan: false
      },
      isOpen: false,
      isRe: false,
      isAi: false,
      T: 30,
      pattern: 'shouye'
    }
  },
  methods: {
    close () {
      this.isFlag.dataFlag = false
    },
    drag (e) {
      var odiv = e.path[1]
      var divX = e.clientX - odiv.offsetLeft
      var divY = e.clientY - odiv.offsetTop
      document.onmousemove = function (e) {
          e.stopPropagation()
          var L = e.clientX - divX;
          var T = e.clientY - divY;
          odiv.style.left = L + 'px'
          odiv.style.top = T + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      var threeBuild = new remap3D(this.isFlag)
      threeBuild.initmsj3D('remap', this.initOption, Aobjects)
      threeBuild.start()
    })
  },
  watch : {
    isFlag: {
      handler (v, ov) {
        if (v.X >= 1520) {
            v.X = 1520
        }
        if (v.X <= 0) {
          v.x = 0
        }
        if (v.Y >= 500) {
          v.Y = 500
        }
        if (v.Y <= 0) {
          v.Y = 0
        }
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
   color: #42b983;
 }
  #tip{
    background-image: url("../assets/images/kuang.png");
    color:#44F5F5;
    opacity: .9;
  }
  .facilityName{
    text-align: center;
    margin-top: 50px;
  }
  .facilityDetails{

  }
  #btn{
    width:120px;
    height:40px;
    margin: 140px auto;
    background-image: url("../assets/images/btn.png");
    background-size: 100% 100%;
    color: #000;
    line-height: 40px;
  }
</style>
