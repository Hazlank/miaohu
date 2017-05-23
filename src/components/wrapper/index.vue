<template>
    <div class="miaohu-wrapper" v-show='wrapper'> 
      
        <div class="wrapper-index">
        </div>
        <phone-wrapper v-if="wrapperRegister"></phone-wrapper>
        <question-wrapper v-if="wrapperQuestion"></question-wrapper>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import phoneWrapper from "./phoneWrapper"
import questionWrapper from "./questionWrapper"

export default{
        computed:{
            ...mapGetters(["wrapper","wrapperRegister","wrapperQuestion"]),
        },
        components: {
            phoneWrapper,
            questionWrapper
        }
}
</script>

<style lang='sass'>
.miaohu-wrapper
    position: fixed
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    overflow: auto;
</style>