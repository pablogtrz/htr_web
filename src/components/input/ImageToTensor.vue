<template>
  <div>
    <img src="../../assets/image/test.png" ref="image" alt="" />
    <canvas ref="canvas" width="400" height="1000"></canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DragAndDrop from '../DragAndDrop.vue'
import UploadIcon from '../icon/UploadIcon.vue'
import AnimatedIcon from '../icon/animated/AnimatedIcon.vue'
import { Model } from '../../services/model'
import { getTensorFrom } from '../../services/tensorflow'

export default Vue.extend({
  components: {
    DragAndDrop,
    UploadIcon,
    AnimatedIcon,
  },
  data() {
    return {
      file: undefined as File | undefined,
      canvas: {} as HTMLCanvasElement,
      ctx: {} as CanvasRenderingContext2D,
    }
  },
  async mounted() {
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')!
    this.ctx.filter = 'grayscale(1) invert(100%)'
    // const model = await Model.createFrom(
    //   'https://raw.githubusercontent.com/tensorflow/tfjs-examples/master/abalone-node/trainedModel/model.json'
    // )
    const image = this.$refs.image as HTMLImageElement
    this.fillCanvas(image)

    const model = await Model.createFrom('../../model/model.json')
    let tensor = await getTensorFrom(
      this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    )
    console.log(tensor)
    console.log(tensor.toString())
    this.invertCanvas()
  },
  methods: {
    fillCanvas(image: HTMLImageElement) {
      this.ctx.drawImage(image, 0, 0)
    },
    invertCanvas() {
      const imageData = this.ctx.getImageData(
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
      )
      const pixels = imageData.data

      for (let i = 0; i < pixels.length; i += 4) {
        const lightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3

        pixels[i] = lightness
        pixels[i + 1] = lightness
        pixels[i + 2] = lightness
      }
      this.ctx.putImageData(imageData, 0, 0)
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
