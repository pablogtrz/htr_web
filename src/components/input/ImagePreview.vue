<template>
  <div>
    <canvas
      ref="canvas"
      width="400"
      height="1000"
      class="image-to-tensor"
    ></canvas>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DragAndDrop from '../DragAndDrop.vue'
import UploadIcon from '../icon/UploadIcon.vue'
import AnimatedIcon from '../icon/animated/AnimatedIcon.vue'

export default Vue.extend({
  components: {
    DragAndDrop,
    UploadIcon,
    AnimatedIcon,
  },
  props: {
    value: {
      type: ImageData,
    },
    image: {
      type: HTMLImageElement,
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
  mounted() {
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')!
    this.ctx.filter = this.invert ? 'grayscale(1) invert(100%)' : 'grayscale(1)'
    this.drawCanvas()
  },
  methods: {
    drawCanvas() {
      this.ctx.drawImage(this.image, 0, 0)
      this.$emit(
        'input',
        this.ctx.getImageData(
          0,
          0,
          this.ctx.canvas.width,
          this.ctx.canvas.height
        )
      )

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
    image() {
      this.drawCanvas()
    },
  },
})
</script>

<style lang="scss">
@import '~/src/assets/scss/main.scss';
.image-to-tensor {
  border: 1px solid rgb(119, 119, 119);
}
</style>
