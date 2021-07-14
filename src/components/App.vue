<template>
  <div class="main">
    <h1 class="font-title text-center mb-3">Historical HTR</h1>
    <p class="font-body text-center mb-6">
      Herramienta de transcripción de texto en documentos históricos mediante
      inteligencia artificial.
    </p>
    <img src="../assets/image/test.png" ref="image" alt="" />
    <section class="drop">
      <p v-if="file">{{ file.name }}</p>
      <DragAndDrop v-else v-model="file" />
    </section>
    <ImageToTensor />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DragAndDrop from './DragAndDrop.vue'
import UploadIcon from './icon/UploadIcon.vue'
import AnimatedIcon from './icon/animated/AnimatedIcon.vue'
import ImageToTensor from './input/ImageToTensor.vue'

export default Vue.extend({
  components: {
    DragAndDrop,
    UploadIcon,
    AnimatedIcon,
    ImageToTensor,
  },
  data() {
    return {
      file: undefined as File | undefined,
    }
  },
})
</script>
<style lang="scss">
@import '~/src/assets/scss/main.scss';

.main {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  box-sizing: border-box;
  padding: 2rem 3rem;
}
</style>
