<template>
  <div>
    <Lottie :options="options" :height="size" :width="size" />
  </div>
</template>

<script>
import Vue from 'vue'
import Lottie from 'vue-lottie'
import Icons from '../../../assets/animated_icons'

export default Vue.extend({
  components: {
    Lottie,
  },
  props: {
    size: {
      type: Number,
      default: 24,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      animationData: undefined,
    }
  },
  computed: {
    options() {
      return {
        animationData: Icons[this.name],
      }
    },
  },
})
</script>

<style type="text/css">
.st0 {
  fill: #121331;
}
.st1 {
  fill: #08a88a;
}
.st2 {
  fill: none;
  stroke: #08a88a;
  stroke-width: 12.25;
  stroke-miterlimit: 14;
}
.st3 {
  fill-opacity: 0;
}
.st4 {
  fill: #131432;
}
.st5 {
  fill: none;
}
</style>
