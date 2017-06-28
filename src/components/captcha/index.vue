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
import { apiDomain } from "@/common/js/public.js";

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
