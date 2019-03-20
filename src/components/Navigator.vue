<template>
  <div>
    <div class="hidden-panel"></div>
    <div :class="[isNavigatorActive ? 'active':'' , 'navi-fixed']">
      <div></div>
      <router-link to="/user/dashboard/port/" class="rotate-menu-1">港口预警</router-link>
      <router-link to="/user/dashboard/trans/" class="rotate-menu-2">交通轨迹</router-link>
      <div class="divider"></div>
      <div class="divider rotate2"></div>
      <div class="divider rotate1"></div>
    </div>
  </div>
</template>
<script>
/**
 * navigator
 *  导航器
 * @author hafrans
 * @email hafrans@163.com
 *
 */

export default {
  inheritAttrs: false,
  data() {
    return {
      isNavigatorActive: true
    };
  }
};
</script>

<style lang="less" scoped>
@basic-color: #282c34;
@layer-color: #dc4e41;
@text-color: darkgray;
@nav-size: 40em;
@layer-size : 0.75 * @nav-size;


a{
  // background: red; //for debug only.
    position: absolute;
    text-decoration: none;
    font-size: 2em;
    color:#EEEEEF;
    display: block;
    width: 90%;
    height: 2.25em;
    position: absolute;
    left: 0%;
    top: 46.5% ;
    text-align: right;
    padding-right:10%; 
}
a:hover{
    color:#333;
}

.navi-fixed {
  position: fixed;
  width: @nav-size;
  height: @nav-size;
  background: lighten(@basic-color, 5%);
  color: @text-color;
  border-radius: @nav-size / 2;
  transition: all 0.3s;
  left: -0.75 * @nav-size;
  top: -0.75 * @nav-size;
  opacity: 0;
  z-index: 3000;

  > div:first-child {
    position: absolute;
    width: @layer-size;
    height: @layer-size;
    background: @layer-color;
    border-radius: 50%;
    left: (@nav-size - @layer-size) /2;
    top: (@nav-size - @layer-size) /2;
  }
}
.divider {
  width: @nav-size;
  height: 0.2em;
  background: #888;
  transform-origin: 50% 50%;
  position: absolute;
  left: 0;
  top: (100% - 0.2em) / 2;
}

.rotate1 {
  transform: rotate(45deg);
}

.rotate-menu-1{
    transform: rotate(17.5deg);
}

.rotate-menu-2{
    transform: rotate(58.5deg);
}

.rotate2 {
  transform: rotate(90deg);
}
.hidden-panel {
//   background: #aaa;
  width: @nav-size;
  height: @nav-size;
  position: fixed;
  left: -0.75 * @nav-size;
  top: -0.75 * @nav-size;
  transition: all 0.3s;
  z-index: 100;
  opacity: 0;
}

.hidden-panel:hover {
  opacity: 0.8;
}
.hidden-panel:hover +div.navi-fixed{
  opacity: 0.8;
}

.navi-fixed:hover {
  opacity: 1;
  left: -0.5 * @nav-size;
  top: -0.5 * @nav-size;
}

.hidden-panel-semiopaque {
  opacity: 0.45;
}

.hidden-panel-active {
  left: -0.5 * @nav-size;
  top: -0.5 * @nav-size;
}
</style>


