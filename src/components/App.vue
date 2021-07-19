<template>
  <div class="main">
    <h1 class="font-title text-center mb-3">Historical HTR</h1>
    <p class="font-body text-center mb-6">
      Herramienta de transcripción de texto en documentos históricos mediante
      inteligencia artificial.
    </p>
    <section class="mb-3">
      <ImageInput v-model="base64Image" />
    </section>
    <ImagePreview
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
import * as tfjs from '@tensorflow/tfjs'
import Model from '../services/model'
import { getTensorFrom } from '../services/tensorflow'

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
    async imageData(n: ImageData) {
      console.log(n)
      // this.grayscale(n.data)
      const model = await Model.createFrom('./keras_model/model.json')
      let tensor = await getTensorFrom(n)
      tensor = tensor.mean(2).toFloat().expandDims(0).expandDims(-1)
      const prediction = model.predict(tensor)
      prediction.print()
    },
  },
  methods: {
    grayscale(imageData: Uint8ClampedArray) {
      const newImageData = []
      imageData.forEach((pixel) => {})
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
