<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
<style>
  body {
    margin: 0;
  }

  /*canvas {*/
    /*width: 100%;*/
    /*height: 100%*/
  /*}*/

  /*.canvas_frame {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow: hidden;*/
  /*}*/
  .toolbar {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 25px;
  }
</style>
