<template>
  <div id="remap" style="width: 1920px;height: 800px;">
    <div id="canvas-frame" class="canvas_frame"></div>
  </div>
</template>

<script>
  import { remap3D } from '../assets/js/remap3D.js'
  import { Aobject } from '../assets/js/data1.js'
  export default {
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
          dataFlag:false,
          path: '',
          storeyId: null
        }
      }
    },
    methods: {

    },
    mounted () {
      this.$nextTick(() => {
        var threeBuild = new remap3D(this.isFlag)
        threeBuild.initmsj3D('remap', this.initOption, Aobject)
        threeBuild.start()
      })
    },
    watch : {
      isFlag: {
        handler (v, ov) {
          console.log(this.$router)
          if (this.$route.path === v.path) {

          } else {
            this.$router.push({path: v.path, query:{
              storeyId: v.storeyId
            }})
            v.path = this.$route.path
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
</style>
