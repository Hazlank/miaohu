<template>
  <!--:class="{'input_captchaT':registerData.captcha}"-->
  <div  :class="{'input_captchaT':captchaState,'label-error':captchaError}" class="div_input input_top  input_captcha" ref="Captcha"> 
    <input type="captcha" placeholder="验证码">
    <label>{{captchaError}}</label>
    <span class="captcha"><img :src='captchaAdress' alt="验证码" @click='changeCaptch'></span>
  </div>
</template>

<script>
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
        captchaState:false,
        captcha: false,
        captchaAdress: `${apiDomain}/captcha?${new Date().getTime()}`,
      }
    },
    methods: {
      changeCaptch() {
        this.captchaAdress = `${apiDomain}/captcha?${new Date().getTime()}`
      },
    }
  }
</script>
