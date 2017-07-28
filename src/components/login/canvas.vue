<template>
    <div id="c_piture">
        <canvas id="backdrop"></canvas>
    </div>
</template>



<script>
import { backdrop } from "@/common/js/backdrop.js"

export default{
    mounted(){
        backdrop();
    }
}
</script>