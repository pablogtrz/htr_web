<template>
  <div class="main">
    <h1 class="font-title text-center mb-3">Historical HTR</h1>
    <p class="font-body text-center mb-6">
      Herramienta de transcripción de texto en documentos históricos mediante
      inteligencia artificial.
    </p>
    <img src="../assets/image/test.png" ref="image" alt="" />
    <section class="drop">
      <ImageInput v-model="base64Image" />
    </section>
    <ImagePreview
      v-if="image"
      v-model="imageData"
      :base64Image="base64Image"
      :invert="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ImageInput from './input/ImageInput.vue'
import UploadIcon from './icon/UploadIcon.vue'
import AnimatedIcon from './icon/animated/AnimatedIcon.vue'
import ImagePreview from './input/ImagePreview.vue'

export default Vue.extend({
  components: {
    ImageInput,
    UploadIcon,
    AnimatedIcon,
    ImagePreview,
  },
  data() {
    return {
      base64Image: '',
      image: undefined as HTMLImageElement | undefined,
      tensor: undefined,
      imageData: undefined,
    }
  },
  mounted() {
    this.image = this.$refs.image as HTMLImageElement
  },
  watch: {
    imageData(n: any) {
      console.log('imgdata', n)
    },
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
