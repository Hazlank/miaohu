<template>
  <!--:class="{'input_captchaT':registerData.captcha}"-->
  <div :class="{'input_captchaT':captchaState,'label-error':captchaError}" class="div_input input_top  input_captcha" ref="imageCaptcha">
    <input type="captcha" placeholder="验证码" v-model="captchaData">
    <label>{{captchaError}}</label>
    <span class="captcha">
      <img :src='captchaAdress' alt="验证码" @click='changeCaptch'>
    </span>
  </div>
</template>

<script>
import { bus } from "../login/bus";

export default {
  created() {
    this.$on('getCaptcha', function () {
      this.captchaState = true;
    })

  },
  mounted() {
    this.$ajax({
      method: 'get',
      url: `${apiDomain}captcha/sid`,
    }).then(data => {this.sessionId = data.data.result;this.captchaAdress=`${apiDomain}captcha?sid=${data.data.result}&time=${new Date().getTime()}`})
  },
  props: ['captchaError'],
  data() {
    return {
      sessionId: '',
      captchaData: '',
      captchaState: false,
      captcha: false,
      captchaAdress: '',
    }
  },
  methods: {
    changeCaptch() {
      this.captchaAdress = `${apiDomain}captcha?sid=${this.sessionId}&time=${new Date().getTime()}`
    },
  },
  watch: {
    captchaData(d) {
      bus.$emit('captchaData', d)
    }
  }
}
</script>


<style lang="sass" scoped>
input
    border: 0
    border-radius: 0
    box-shadow: none
    background: #fff
    padding: 1em .8em
    width: 100%
    box-sizing: border-box
    line-height: 19px
    color: #555
    outline: none
    font-size: 14px
    &::-webkit-input-placeholder
        color: #ccc;
        -webkit-text-fill-color: #ccc;

.div_input .captcha img
    position: absolute;
    top: 50%;
    right: .5em;
    margin-top: -19px;
    width: 100px;
    height: 38px;   

.input_captcha
    transition: height .7s cubic-bezier(0.42,0,0.58,1)       
    height: 0px
    overflow: hidden
    visibility: hidden
    border-top: none!important

.input_captchaT
    visibility: visible
    height: 46px
    border-top: 1px solid #e8e8e8!important

.input_captcha label 
    right: 85px 
    
.input_captcha.label-error label
    right: 93px 

</style>
