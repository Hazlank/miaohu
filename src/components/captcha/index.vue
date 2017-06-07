<template>
  <!--:class="{'input_captchaT':registerData.captcha}"-->
  <div  :class="{'input_captchaT':captchaState,'label-error':captchaError}" class="div_input input_top  input_captcha" ref="imageCaptcha" > 
    <input type="captcha" placeholder="验证码" v-model="captchaData">
    <label>{{captchaError}}</label>
    <span class="captcha"><img :src='captchaAdress' alt="验证码" @click='changeCaptch'></span>
  </div>
</template>

<script>
  import { bus } from "../login/bus";
  import { apiDomain } from "@/common/js/public.js";

  export default {
    created() {
      this.$on('getCaptcha', function() {
        this.captchaState=true;
      })
    },
    props: ['captchaError'],
    data() {
      return {
        captchaData:'',
        captchaState:false,
        captcha: false,
        captchaAdress: `${apiDomain}/captcha?${new Date().getTime()}`,
      }
    },
    methods: {
      changeCaptch() {
        this.captchaAdress = `${apiDomain}/captcha?${new Date().getTime()}`
      },
    },
    watch:{
      captchaData(d){
        bus.$emit('captchaData', d)
      }
    }
  }
</script>
