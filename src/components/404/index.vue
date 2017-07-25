<template>
  <div class="wrapper">
    <div class="error-content">
      <div class="error-text">
        <h1>404</h1>
        <span>我要搞♂死你啊♂,来源链接是否正确？</span>
        <div class="label animated">
          <router-link to='/article'>回到首页</router-link>
          <div class="shadow">
          </div>
        </div>
      </div>
      <img src="/static/liukanshan.png">
    </div>
  </div>
</template>


<style lang="sass" scoped>
.wrapper
    overflow: hidden;
    text-align: center;
    height: 100%;
    width: 100%;
    background: #65B7F0
    &:before
          content: '';
          display: inline-block;
          height: 90%;
          vertical-align: middle;
          margin-right: -.25em;

.error-content
    display: inline-block;
    vertical-align: middle;

.error-text
    float: right;
    color: white;
    font-size: 30px;
    h1
        padding: 0 32px;
        font-size: 180px;
        letter-spacing: 15px;
        margin-top: 33px;
        margin-bottom: 10px;

.label
    animation-duration: .3s; 
    animation-fill-mode: both; 
    animation-iteration-count: infinite; 
    animation-duration: .6s; 
    cursor: pointer;
    position: relative;
    background: #F05F5B;
    width: 100%;
    font-size: 20px;
    padding: 15px 0;
    font-family: YouYuan;
    font-weight: 700;
    left: -28px;
    margin-top: 60px;
    &:before
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-bottom: 28px solid transparent;
        border-top: 28px solid transparent;
        border-left: 28px solid #65B7F0;
        top: 0px;
        left: 0px;
    &:after
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-bottom: 28px solid transparent;
        border-top: 28px solid transparent;
        border-left: 28px solid #F05F5B;
        top: 0px;
        right: -28px;
    &:hover
        animation-name: container;
        transform-origin: center bottom;
    
    a
        color: white;

.shadow
    width: 100%;
    height: 1px;
    box-shadow: -1px 2px 5px black;
    position: relative;
    top: 15px;


</style>

<style>
@keyframes container {
  0% {

    /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
    transform: rotate(1deg)
    /*设置只在Z轴上移动*/
  }
  8.3% {
    
    transform: rotate(2deg)
  }
  16.6% {
    
    transform: rotate(3deg)
  }
  24.9% {
    
    transform: rotate(2deg)
  }
  33.2% {
    
    transform: rotate(1deg)
  }
  41.5% {
    
    transform: rotate(0deg)
  }
  49.8% {
    /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
    transform: rotate(-1deg)
    /*设置只在Z轴上移动*/
  }
  58.1% {
    
    transform: rotate(-2deg)
  }
  66.4% {
    
    transform: rotate(-3deg)
  }
  74.7% {
    
    transform: rotate(-2deg)
  }
  83% {
    
    transform: rotate(-1deg)
  }
  91.3%{
     transform: rotate(0deg)
  }
  100%{
     transform: rotate(1deg)
  }
  /*70% {
    transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060deg);
    transform: translate3d(0, -15px, 0deg);
  }
  90% {
    transform: translate3d(0, -4px, 0deg);
  }*/
}

 
</style>

