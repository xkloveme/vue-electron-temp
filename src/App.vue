<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { remote } from 'electron'

export default {
  data () {
    return {
      win: remote.getCurrentWindow(),
      originSize: true
    }
  },
  methods: {
    autoMaximize () {
      if (this.originSize) this.win.maximize()
      else this.win.restore()
      this.originSize = !this.originSize
    }
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}

// 取消一些默认效果，使得应用看起来更加原生
// Cancel default effects to make apps look more native
input { outline: none; }

a { outline: none; text-decoration: none; -webkit-user-drag: none; color: #B2CCD6; }

img { -webkit-user-drag: none; }

#app {
  // height: 100vh;
  padding: 0 20px;
  // width: 100vw;
  // background-color: #2D3A41;
  color: #000;
  background: #fff;
  // ok
  font-family: 'Microsoft YaHei', 'Avenir', 'Helvetica', 'Arial', 'sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-user-select: none;
  -webkit-user-select: none;
  // 如果你想让应用中的所有文字无法被选取，就设为none
  // If you want all text in the app to be unselectable, set it to none
  user-select: none;
}

#app-bar {
  // background-color: #263238;
  color: #B2CCD6;
  display: flex;
  // 如果你想让某区域可以拖动，将其设为drag
  // 但是设为drag的区域无法被点击，请注意
  // 可以设置为no-drag来恢复点击
  // If you want to make a region draggable, set it to drag
  // But the area set as drag cannot be clicked, please note
  // can be set to no-drag to resume clicks
  -webkit-app-region: drag;
  height: 32px;
}

#app-title {
  flex: 1;
  padding: 7px 15px;
  font-size: 12px;
  line-height: 18px;
}

#app-action {
  padding: 0;
  font-size: 16px;
  display: flex;
  -webkit-app-region: no-drag;
  text-align: center;
}

.app-action-button {
  padding: 0 8px;
  color: #FFF;
  transition: .2s ease;
  opacity: 0.7;
  line-height: 32px;
}

.app-action-button:hover {
  background-color: #436677;
  opacity: 1;
}

.app-action-button:active {
  background-color: #3A4A52;
}

.button-red:hover {
  background-color: red;
}

.button-red:active {
  background-color: #C11818;
}

#routers {
  text-align: center;

  a {
    font-weight: bold;
    color: #2B8059;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
