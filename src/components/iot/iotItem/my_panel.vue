<template>
  <div>
    <div class="my_panel_box" style="position: relative;z-index: 101">
      <div class="my_panel_wai" v-show="pattern != 'yuyue'">
        <div class="my_panel_nei weather" :class="{snow: (pattern == 'wendu' || pattern == 'shouye') && !isRe}">
          <div v-show="pattern == 'wendu' || pattern == 'shouye'" class="sb1" style="">
          </div>
          <div v-show="pattern == 'wendu' || pattern == 'shouye'" class="sb2" style="">
          </div>
          <img class="my_ty" v-if="(pattern == 'wendu' || pattern == 'shouye') && isRe" src="https://cdn.remapcity.com/fileserver/static/img/iot/air/ty3.png" style="position: absolute;width: 60px;height: 60px;top: 210px;left: 275px;">
          <img class="my_ty2" v-if="(pattern == 'wendu' || pattern == 'shouye') && isRe" src="https://cdn.remapcity.com/fileserver/static/img/iot/air/ty2.png" style="position: absolute;width: 60px;height: 60px;top: 210px;left: 275px;">
          <img class="my_ty3" v-if="(pattern == 'wendu' || pattern == 'shouye') && isRe" src="https://cdn.remapcity.com/fileserver/static/img/iot/air/g1.png" style="position: absolute;width: 440px;height: 440px;top: 10px;left: 71px;">
          <img class="my_ty4" v-if="(pattern == 'wendu' || pattern == 'shouye') && isRe" src="https://cdn.remapcity.com/fileserver/static/img/iot/air/g2.png" style="position: absolute;width: 440px;height: 440px;top: 10px;left: 71px;">
        </div>
        <div style="position: absolute;left: 52%;top: 170px;transform: translateX(-50%);font-size: 18px;color:#fff;" v-show="pattern == 'shouye' && !isAi">
          人工模式
        </div>
        <div style="position: absolute;left: 52%;top: 170px;transform: translateX(-50%);font-size: 18px;color:#fff;" v-show="pattern == 'shouye' && isAi">
          AI模式
        </div>
        <div style="color:#fff;position: absolute;top: 268px;left: 125px;" v-show="pattern == 'shouye'">
          室温17°C
        </div>
      </div>
      <canvas id="canvasId" class="xfcanvas" :style="{opacity: pattern == 'wendu' ? '1' : '0', zIndex: pattern == 'wendu' ? '0' : '-1'}" style="" width="500" height="500"></canvas>
      <canvas id="canvasOrder" class="xfcanvas" :style="{opacity: pattern == 'yuyue' ? '1' : '0', zIndex: pattern == 'yuyue' ? '0' : '-1'}" width="500" height="500"></canvas>
      <canvas id="canvasHome" class="xfcanvas" :style="{opacity: pattern == 'shouye' ? '1' : '0', zIndex: pattern == 'shouye' ? '0' : '-1'}" width="500" height="500"></canvas>
      <div style="position: absolute;top: 40%;left: 50%;transform: translate(-50%, -50%)" v-show="pattern == 'yuyue'">
        <div style="text-align: center;margin-bottom: 40px;font-size: 16px;color:#fff;">预约时间</div>
        <div class="my_move_box">
          <div class="clear my_move" :style="{left: selected == 0 ? '33%' : selected == 1 ? '0' : '-33%'}" style="width: 100%;">
            <span @click="selected = 0" :style="{color:selected == 0 ? '#fff' : ''}">今天</span>
            <span @click="selected = 1" :style="{color:selected == 1 ? '#fff' : ''}">明天</span>
            <span @click="selected = 2" :style="{color:selected == 2 ? '#fff' : ''}">后天</span>
          </div>
        </div>
      </div>
      <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);color:#fff;"  v-show="pattern == 'nenghao'">
        <div style="font-size: 40px;text-align: center;margin-top: 20px;">627°</div>
        <div style="text-align: center;margin-bottom: 40px;">今日用电 (kw/h)</div>
        <div id="nenghaoEcharts" style="width: 340px;height: 150px;margin: 0 auto;transform: translateX(-10px)"></div>
      </div>
      <img v-if="pattern != 'wendu' && pattern != 'nenghao' && pattern != 'yuyue' && pattern != 'shouye'" :src="bigimg" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%)"  alt="">
      <div style="position: absolute;bottom: 70px;left: 50%;transform: translateX(-50%);" v-if="pattern != 'wendu' && pattern != 'nenghao' && pattern != 'shouye'">
        <div style="font-size: 16px;margin-bottom: 20px;color:#fff;">{{msg}}</div>
        <div style="text-align: center;">
          <button style="background: #fff;border: none;padding: 5px 20px;border-radius: 4px;color:#000;font-size: 16px;" @click="queding">确定</button>
        </div>
      </div>
      <div  class="my_btn_box">
        <div class="my_btn moshi" @click="patternChange('moshi')" :style="{opacity: isAi ? '0.3' : '1'}" style="position: absolute;top: 150px;left: 82px;width: 48px;height: 48px;">
          <img :src="images.zr0" v-if="pattern != 'moshi' && isRe" alt="">
          <img :src="images.zr1" v-if="pattern == 'moshi' && isRe" alt="">
          <img :src="images.zl0" v-if="pattern != 'moshi' && !isRe" alt="">
          <img :src="images.zl1" v-if="pattern == 'moshi' && !isRe" alt="">
        </div>
        <div class="my_btn wendu" @click="patternChange('wendu')" :style="{opacity: isAi ? '0.3' : '1'}" style="position: absolute;top: 97px;left: 134px;width: 48px;height: 48px;">
          <img :src="images.wd0" v-if="pattern != 'wendu'" alt="">
          <img :src="images.wd1" v-if="pattern == 'wendu'"  alt="">
        </div>
        <div class="my_btn kaiguan" @click="patternChange('kaiguan')" :style="{opacity: isAi ? '0.3' : '1'}" style="position: absolute;top: 76px;left: 199px;width: 48px;height: 48px;">
          <img :src="images.kg0" v-if="pattern != 'kaiguan'" alt="">
          <img :src="images.kg1" v-if="pattern == 'kaiguan'"  alt="">
        </div>
        <div class="my_btn yuyue" @click="patternChange('yuyue')" :style="{opacity: isAi ? '0.3' : '1'}" style="position: absolute;top: 76px;left: 279px;width: 48px;height: 48px;">
          <img :src="images.yy0" v-if="pattern != 'yuyue'" alt="">
          <img :src="images.yy1" v-if="pattern == 'yuyue'"  alt="">
        </div>
        <div class="my_btn nenghao" @click="patternChange('nenghao')" :style="{opacity: isAi ? '0.3' : '1'}" style="position: absolute;top: 107px;left: 346px;width: 48px;height: 48px;">
          <img :src="images.nh0" v-if="pattern != 'nenghao'" alt="">
          <img :src="images.nh1" v-if="pattern == 'nenghao'"  alt="">
        </div>
        <div class="my_btn or" @click="patternChange('or')" style="position: absolute;top: 150px;left: 393px;width: 48px;height: 48px;">
          <img :src="images.rg0" v-if="pattern != 'or' && !isAi" alt="">
          <img :src="images.rg1" v-if="pattern == 'or' && !isAi"  alt="">
          <img :src="images.ai0" v-if="pattern != 'or' && isAi" alt="">
          <img :src="images.ai1" v-if="pattern == 'or' && isAi"  alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .my_move_box{
    width: 200px;
    height: 50px;
    position: relative;
    line-height: 50px;
    font-size: 16px;
    overflow: hidden;
  }
  .my_move_box span{
    float: left;
    width: calc(100% / 3);
    text-align: center;
    cursor: pointer;
    color: #6c8ace;
    transition: all .4s;
  }
  .clear:after{
    content: '';
    clear: both;
    display: inline-block;
  }
  .my_move{
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.4s;
  }
  .my_move_box:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to left, #0d0f41, #ffffff 50%, #0d0f41);
  }
  .my_move_box:before{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to left, #0d0f41, #ffffff 50%, #0d0f41);
  }
</style>
<script>
  var ai0 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/ai0.png'
  var ai1 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/ai1.png'
  var bl0 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/bl0.png'
  var bl1 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/bl1.png'
  var kg0 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/kg0.png'
  var kg1 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/kg1.png'
  var nh0 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/nh0.png'
  var nh1 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/nh1.png'
  var rg0 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/rg0.png'
  var rg1 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/rg1.png'
  var wd0 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/wd0.png'
  var wd1 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/wd1.png'
  var yy0 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/yy0.png'
  var yy1 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/yy1.png'
  var zl0 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/zl0.png'
  var zl1 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/zl1.png'
  var zr0 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/zr0.png'
  var zr1 = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/zr1.png'
  var zhire = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/zhire.png'
  var zhileng = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/zhileng.png'
  var kai = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/kai.png'
  var guan = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/guan.png'
  var ai = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/ai.png'
  var rg = 'https://cdn.remapcity.com/fileserver/static/img/iot/rjy/rg.png'
  import echarts from 'echarts'
  export default {
    props: {
      pattern: {
        type: String
      },
      isRe: {},
      isOpen: {},
      isAi: {},
      T: {}
    },
    data () {
      return {
        images: {
          ai0: ai0,
          ai1: ai1,
          bl0: bl0,
          bl1: bl1,
          kg0: kg0,
          kg1: kg1,
          nh0: nh0,
          nh1: nh1,
          rg0: rg0,
          rg1: rg1,
          wd0: wd0,
          wd1: wd1,
          yy0: yy0,
          yy1: yy1,
          zl0: zl0,
          zl1: zl1,
          zr0: zr0,
          zr1: zr1,
          zhire: zhire,
          zhileng: zhileng,
          kai: kai,
          guan: guan,
          ai: ai,
          rg: rg
        },
        bigimg: null,
        msg: null,
        selected: 1,
        yuyueList: [
          {key: 0, value: false},
          {key: 1, value: false},
          {key: 2, value: false},
          {key: 3, value: false},
          {key: 4, value: false},
          {key: 5, value: false},
          {key: 6, value: false},
          {key: 7, value: false},
          {key: 8, value: false},
          {key: 9, value: false},
          {key: 10, value: false},
          {key: 11, value: false},
          {key: 12, value: false},
          {key: 13, value: false},
          {key: 14, value: false},
          {key: 15, value: false},
          {key: 16, value: false},
          {key: 17, value: false},
          {key: 18, value: false},
          {key: 19, value: false},
          {key: 20, value: false},
          {key: 21, value: false},
          {key: 22, value: false},
          {key: 23, value: false}
        ]
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.setCanvas(this.T2deg(this.T))
        this.setEcharts()
        this.setOrder()
        this.setHome(this.T)
      })
    },
    methods: {
      deg2T (n) {
        var t = ~~((n - 0.15) / 0.05) + 16
        if (t > 30) {
          t = 30
        } else if (t < 16) {
          t = 16
        }
        return t
      },
      T2deg (n) {
        return (n - 16) * 0.05 + 0.15
      },
      setEcharts () {
        this.myEcharts = echarts.init(document.getElementById('nenghaoEcharts'))
        this.myEcharts.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            height: 160
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: false,
                textStyle: {
                  color: '#969292'
                }
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: 'rgba(106,106,106,0.1)'
                }
              },
              nameTextStyle: {
                color: '#fff'
              }
            }
          ],
          series: [
            {
              name: '用电量',
              type: 'line',
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#f66',
                  lineStyle: {
                    width: 1
                  }
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255,0,0,0.3)'
                  }, {
                    offset: 1,
                    color: 'rgba(255,255,255,0)'
                  }])
                }
              },
              // data: res.data.data[0].rentRate
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        })
      },
      setCanvas (deg) {
        var _this = this
        var canvas = document.getElementById('canvasId')
        var ctx = canvas.getContext('2d')
        var ox = canvas.offsetWidth / 2
        var oy = canvas.offsetHeight / 2
        var or = 220
        var br = 14
        var moveFlag = false
        function offset (r, d) {
          return {
            x: -Math.sin(r) * d,
            y: Math.cos(r) * d
          }
        }
        function draw (n) {
          var g = ctx.createLinearGradient(180, 360, 270, 0)
          g.addColorStop(0, '#e216ee')
          g.addColorStop(1, '#01feff')
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.strokeStyle = g
          ctx.lineWidth = 8
          ctx.beginPath()
          ctx.arc(ox, oy, or, 0, 2 * Math.PI, true)
          ctx.stroke()
          // ctx.strokeStyle = "#f66";
          ctx.strokeStyle = g
          ctx.lineWidth = 8
          ctx.beginPath()
          ctx.arc(ox, oy, or, 0.5 * Math.PI, (n * 2 + 0.5) * Math.PI, false)
          ctx.stroke()
          ctx.fillStyle = '#fff'
          // 字
          ctx.font = '100px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          var t = _this.deg2T(n)
          ctx.fillText(t, ox, oy)
          ctx.font = '10px Arial'
          for (var i = 0; i < 15; i++) {
            var deg = 0.15 + i * 0.05
            ctx.fillText(Math.round(i + 16), setScale(deg).x, setScale(deg).y)
          }
          ctx.font = '30px Arial'
          ctx.fillText('°C', 320, 230)
          ctx.fillStyle = '#12dfff'
          ctx.beginPath()
          var d = offset(n * 2 * Math.PI, or)
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 0
          ctx.shadowBlur = 50
          ctx.shadowColor = 'rgba(18, 223, 255, 1)'
          ctx.arc(ox + d.x, oy + d.y, br, 0, 2 * Math.PI, true)
          ctx.fill()
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 0
          ctx.shadowBlur = 0
          ctx.shadowColor = 'rgba(18, 223, 255, 1)'
        }
        var on = ('ontouchstart' in document) ? {
          start: 'touchstart', move: 'touchmove', end: 'touchend'
        } : {
          start: 'mousedown', move: 'mousemove', end: 'mouseup'
        }
        function setScale (n) {
          return {
            x: ox - (Math.sin(Math.PI * 2 * n) * (or + 20)),
            y: oy + (Math.cos(Math.PI * 2 * n) * (or + 20))
          }
        }
        function getXY (e, obj) {
          var et = e.touches ? e.touches[0] : e
          var x = et.clientX
          var y = et.clientY
          return {
            x: x - obj.getBoundingClientRect().left + (document.body.scrollLeft || document.documentElement.scrollLeft),
            y: y - obj.getBoundingClientRect().top + (document.body.scrollTop || document.documentElement.scrollTop)
          }
        }
        canvas.addEventListener(on.start, function (e) {
          moveFlag = true
        }, false)
        canvas.addEventListener(on.move, function (e) {
          if (moveFlag) {
            var k = getXY(e, canvas)
            var r = Math.atan2(k.x - ox, oy - k.y)
            draw((Math.PI + r) / (2 * Math.PI))
          }
        }, false)
        canvas.addEventListener(on.end, function (e) {
          moveFlag = false
          var k = getXY(e, canvas)
          var r = Math.atan2(k.x - ox, oy - k.y)
          var T = _this.deg2T((Math.PI + r) / (2 * Math.PI))
          _this.$emit('tChange', T)
        }, false)
        draw(deg)
      },
      setOrder () {
        var _this = this
        console.log(_this)
        var canvas = document.getElementById('canvasOrder')
        var ctx = canvas.getContext('2d')
        var ox = canvas.offsetWidth / 2
        var oy = canvas.offsetHeight / 2
        var or = 248
        function draw (n) {
          var deg = Math.PI / 180
          for (var i = 0; i < _this.yuyueList.length; i++) {
            ctx.fillStyle = '#172f65'
            if (_this.yuyueList[i].value) {
              ctx.fillStyle = '#1c96ff'
            }
            ctx.sector(ox, oy, or, ((i * 15 + 1) + 90) * deg, (((i + 1) * 15 - 1) + 90) * deg)
            ctx.fill()
            ctx.beginPath()
          }
          ctx.arc(ox, oy, 220, 0, 2 * Math.PI)
          ctx.fillStyle = '#0d0f41'
          ctx.fill()
          ctx.beginPath()
          for (var k = 0; k < _this.yuyueList.length; k++) {
            ctx.fillStyle = '#fff'
            ctx.textAlign = 'center'
            ctx.font = '14px Arial'
            ctx.fillText(k, setScale((k / 24)).x, setScale((k / 24)).y)
          }
        }
        function getXY (e, obj) {
          var et = e.touches ? e.touches[0] : e
          var x = et.clientX
          var y = et.clientY
          return {
            x: x - obj.getBoundingClientRect().left + (document.body.scrollLeft || document.documentElement.scrollLeft),
            y: y - obj.getBoundingClientRect().top + (document.body.scrollTop || document.documentElement.scrollTop)
          }
        }
        function setScale (n) {
          return {
            x: ox - (Math.sin(Math.PI * 2 * n) * (210)),
            y: oy + (Math.cos(Math.PI * 2 * n) * (210)) + 5
          }
        }
        canvas.addEventListener('click', function (e) {
          var k = getXY(e, canvas)
          var r = Math.atan2(k.x - ox, oy - k.y)
          var n = (Math.PI + r) / (2 * Math.PI)
          console.log(~~(n * 24))
          _this.yuyueList[~~(n * 24)].value = !_this.yuyueList[~~(n * 24)].value
          draw(n)
        })
        draw(1)
      },
      setHome (t) {
        var canvas = document.getElementById('canvasHome')
        var ctx = canvas.getContext('2d')
        var ox = canvas.offsetWidth / 2
        var oy = canvas.offsetHeight / 2
        var or = 220
        function draw (n) {
          var g = ctx.createLinearGradient(180, 360, 270, 0)
          g.addColorStop(0, '#e216ee')
          g.addColorStop(1, '#01feff')
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.strokeStyle = g
          ctx.lineWidth = 8
          ctx.beginPath()
          ctx.arc(ox, oy, or, 0, 2 * Math.PI, true)
          ctx.stroke()
          // ctx.strokeStyle = "#f66";
          ctx.strokeStyle = g
          ctx.lineWidth = 8
          ctx.beginPath()
          ctx.arc(ox, oy, or, 0.5 * Math.PI, (n * 2 + 0.5) * Math.PI, false)
          ctx.stroke()
          ctx.fillStyle = '#fff'
          // 字
          ctx.font = '100px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(n, ox, oy)
          ctx.font = '30px Arial'
          ctx.fillText('°C', 320, 230)
          ctx.fillStyle = '#12dfff'
          ctx.beginPath()
        }
        draw(t)
      },
      patternChange (e) {
        if (e === this.pattern) {
          this.$emit('patternChange', 'shouye')
          return
        }
        if (this.isAi) {
          if (e === 'or') {
            this.$emit('patternChange', e)
            this.bigimg = this.images.rg
            this.msg = '确定切换人工模式吗?'
          }
          return
        }
        this.$emit('patternChange', e)
        this.imgAndHint(e)
      },
      imgAndHint (e) {
        console.log(this.isRe)
        if (e === 'moshi') {
          if (this.isRe) {
            this.bigimg = this.images.zhileng
            this.msg = '是否切换到制冷模式?'
          } else {
            this.bigimg = this.images.zhire
            this.msg = '是否切换到制热模式?'
          }
        }
        if (e === 'kaiguan') {
          if (this.isOpen) {
            this.bigimg = this.images.kai
            this.msg = '确定关机吗?'
          } else {
            this.bigimg = this.images.guan
            this.msg = '确定开机吗?'
          }
        }
        if (e === 'yuyue') {
          this.msg = '确定预约当前选中时间段吗?'
        }
        if (e === 'or') {
          if (this.isAi) {
            this.bigimg = this.images.rg
            this.msg = '确定切换人工模式吗?'
          } else {
            this.bigimg = this.images.ai
            this.msg = '确定切换AI模式吗?'
          }
        }
      },
      queding () {
        if (this.pattern === 'moshi') {
          this.$emit('ms')
        }
        if (this.pattern === 'kaiguan') {
          this.$emit('kg')
        }
        if (this.pattern === 'yuyue') {
          this.$emit('yy', this.yuyueList)
        }
        if (this.pattern === 'or') {
          this.$emit('or')
        }
      }
    },
    watch: {
      T: function (vn, vl) {
        this.setHome(vn)
      },
      isRe: function (v) {
        this.imgAndHint(this.pattern)
      },
      isOpen: function (v) {
        this.imgAndHint(this.pattern)
      },
      isAi: function (v) {
        console.log(v)
        this.imgAndHint(this.pattern)
      }
    }
  }
</script>

<style scoped>
  .my_panel_box{
    background: #0a142a;
    border: 2px solid #2196f3;
    border-radius: 50%;
    width: 516px;
    height: 516px;
    user-select:none;
  }
  .xfcanvas {
    position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)
  }
  .my_panel_wai{
    position: absolute;width: 500px;height: 500px;background: #172f65;border-radius: 50%;top: 50%;left: 50%;transform: translate(-50%, -50%)
  }
  .my_panel_nei{
    position: absolute;width: 440px;height: 440px;background: #0d0f41;border-radius: 50%;top: 50%;left: 50%;transform: translate(-50%, -50%);
    overflow: hidden;
  }
  .sb1 {
    background-image: url('https://cdn.remapcity.com/fileserver/static/img/iot/air/sb3.png');width: 532px;height: 165px;position: absolute;bottom: 0;left: 0;z-index: 1;
    animation: sb1 130s linear infinite;
  }
  .sb2 {
    background-image: url('https://cdn.remapcity.com/fileserver/static/img/iot/air/sb4.png');width: 532px;height: 165px;position: absolute;bottom: 0px;left: 0;z-index: 1;
    animation: sb2 100s linear infinite;
  }
  .my_btn{
    cursor: pointer;
    transition: all .3s;
  }
  .my_btn:hover{
    /*transform: scale(1.2);*/
  }
  @keyframes sb1 {
    0% {
      background-position: 0 0;
    }
    50%{
      background-position: 5000px 0;
    }
    100%{
      background-position: 10000px 0;
    }
  }
  @keyframes sb2 {
    0% {
      background-position: 0 0;
    }
    50%{
      background-position: -5000px 0;
    }
    100%{
      background-position: -10000px 0;
    }
  }
</style>
<style scoped>
  .weather {
    position: relative; overflow: hidden;
  }
  /* pseudo elements: positioning and setup */
  .weather:before, .weather:after {
    content: "";
    position: absolute; left: -50%; top: -50%; right: -50%; bottom: -50%;
    z-index: 1;
    pointer-events: none;

    background: transparent repeat;
    opacity: 0.7;

    -webkit-transform: rotate(10deg);
    -moz-transform: rotate(10deg);
    -ms-transform: rotate(10deg);
    -o-transform: rotate(10deg);
    transform: rotate(10deg);

    -webkit-animation-name: weather;
    -webkit-animation-timing-function: linear;
    -webkit-animation-iteration-count: infinite;
    animation-name: weather;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .weather:after {
    opacity: 0.8;
    -webkit-animation-name: weather2;
    animation-name: weather2;
  }
  /* rain (fast, rain.png) */
  .weather.rain:after {
    background-image: url(https://cdn.remapcity.com/fileserver/static/img/iot/air/x1.png);
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
  }
  .weather.rain:before {
    background-image: url(https://cdn.remapcity.com/fileserver/static/img/iot/air/x2.png);
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
  }
  .weather.rain:after {
    -webkit-animation-duration: 15s;
    animation-duration: 15s;
  }
  .weather.snow:before {
    z-index: 0;
    background-image: url(https://cdn.remapcity.com/fileserver/static/img/iot/air/x1.png);
    -webkit-animation-duration: 120s;
    animation-duration: 120s;
  }
  .weather.snow:after {
    z-index: 0;
    background-image: url(https://cdn.remapcity.com/fileserver/static/img/iot/air/x2.png);
    -webkit-animation-duration: 120s;
    animation-duration: 120s;
  }
  .weather.snow:after {
    -webkit-animation-duration: 90s;
    animation-duration: 90s;
  }
  /* animation keyframes */
  @-webkit-keyframes weather {
    from { background-position: 0 0px; }
    to { background-position: 0 10000px; }
  }
  @keyframes weather {
    from { background-position: 0 0px; }
    to { background-position: 0 10000px; }
  }
  @-webkit-keyframes weather2 {
    from { background-position: 64px 64px; }
    to { background-position: 64px 10000px; }
  }
  @keyframes weather2 {
    from { background-position: 64px 64px; }
    to { background-position: 64px 10000px; }
  }
  .my_ty {
    transform-origin: 50% 50%;
    animation: z 100s linear infinite
  }
  .my_ty2 {
    opacity: 1;
    animation: s 2s linear infinite
  }
  .my_ty3 {
    transform-origin: 233px 228px;
    transform: scale(1.5);
    opacity: .3;
    animation: z1 40s linear infinite;
  }
  .my_ty4{
    transform-origin: 234px 226px;
    transform: scale(1.5);
    opacity: .2;
    animation: z2 40s linear infinite;
  }
  @keyframes s {
    0% { opacity: 1 }
    50% { opacity: 0.5 }
    100% { opacity: 1 }
  }
  @keyframes z {
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
  }
  @keyframes z1 {
    from { transform:scale(1.5) rotate(0deg) }
    to { transform:scale(1.5) rotate(360deg) }
  }
  @keyframes z2 {
    from { transform:scale(1.5) rotate(360deg) }
    to { transform:scale(1.5) rotate(0deg) }
  }
</style>
