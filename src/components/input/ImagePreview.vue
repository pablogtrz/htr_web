<template>
  <div>
    <canvas
      ref="canvas"
      width="720"
      height="300"
      class="image-preview"
    ></canvas>
    <img :src="base64Image" ref="image" style="display: none" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UploadIcon from '../icon/UploadIcon.vue'
import AnimatedIcon from '../icon/animated/AnimatedIcon.vue'

export default Vue.extend({
  components: {
    UploadIcon,
    AnimatedIcon,
  },
  props: {
    value: {
      type: ImageData,
    },
    base64Image: {
      type: String,
      required: true,
    },
    invert: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      canvas: {} as HTMLCanvasElement,
      ctx: {} as CanvasRenderingContext2D,
    }
  },
  async mounted() {
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')!
    this.ctx.filter = this.invert ? 'grayscale(1) invert(100%)' : 'grayscale(1)'
    await this.drawCanvas()
  },
  methods: {
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    async drawCanvas() {
      await Vue.nextTick()
      this.clearCanvas()
      const image = this.$refs.image as HTMLImageElement
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(image, 0, 0)
      const width = image.width > 720 ? image.width : 720
      this.$emit('input', this.ctx.getImageData(0, 0, width, image.height))

      // const model = await Model.createFrom('../../model/model.json')
      // let tensor = await getTensorFrom(
      //   this.ctx.getImageData(
      //     0,
      //     0,
      //     this.ctx.canvas.width,
      //     this.ctx.canvas.height
      //   )
      // )
      // this.invertCanvas()
    },
    invertCanvas() {
      // TODO: check if necessary
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
  watch: {
    async base64Image() {
      await this.drawCanvas()
    },
  },
})
</script>

<style lang="scss">
@import '~/src/assets/scss/main.scss';
.image-preview {
  border: 1px solid rgb(119, 119, 119);
}
</style>
