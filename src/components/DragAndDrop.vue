<template>
  <div
    class="drag-and-drop"
    id="drag-and-drop"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <PictureIcon class="block mx-auto" :size="64"></PictureIcon>
    <h3 class="mb-1">{{ message }}</h3>
    <p class="my-1">o</p>
    <input
      ref="fileInput"
      type="file"
      name="file"
      style="display: none"
      @change="setFile"
      accept=".jpg,.jpeg,.png"
    />
    <Button class="block mx-auto" @click="searchFile">
      <div class="align-middle inline-block">
        <UploadIcon />
      </div>
      <span class="align-middle inline-block">Subir imagen</span>
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PictureIcon from './icon/PictureIcon.vue'
import UploadIcon from './icon/UploadIcon.vue'
import Button from './Button.vue'

const DRAG_MESSAGE = 'Arrastra una imagen'
const DROP_MESSAGE = 'Suelta la imagen'

export default Vue.extend({
  components: {
    PictureIcon,
    UploadIcon,
    Button,
  },
  props: {
    value: {
      type: File,
      default: undefined,
    },
  },
  data() {
    return {
      message: DRAG_MESSAGE,
    }
  },
  computed: {
    file: {
      set(newValue: File | undefined) {
        this.$emit('input', newValue)
      },
      get(): File | undefined {
        return this.value
      },
    },
  },
  methods: {
    searchFile() {
      const fileInput = this.$refs.fileInput as HTMLInputElement
      if (fileInput) {
        fileInput.click()
      }
    },
    drop(event: DragEvent) {
      const file = event.dataTransfer?.files[0]
      console.log(file)
    },
    dragover() {
      document.getElementById('drag-and-drop')?.classList.add('dragover')
      this.message = DROP_MESSAGE
    },
    dragleave() {
      document.getElementById('drag-and-drop')?.classList.remove('dragover')
      this.message = DRAG_MESSAGE
    },
    setFile() {
      const fileInput = this.$refs.fileInput as HTMLInputElement
      this.file = fileInput.files?.item(0)!
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/src/assets/scss/main.scss';

.drag-and-drop {
  display: block;
  margin: 4px auto 0;
  padding: 1rem 3.5rem;
  border-radius: 10px;
  text-align: center;
  color: $c-primary;
  max-width: 25rem;
  transition: 0.5s;
  border: 1px darken(white, 10) solid;
}

.dragover {
  margin: 0px auto;
  transition: 0.15s;
  padding: calc(1rem - 1px) 3.5rem;
  border: 2px darken(white, 20) dashed;
  background: lighten(white, 10);
  cursor: grabbing;
}
</style>
