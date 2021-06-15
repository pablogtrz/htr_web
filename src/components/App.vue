<template>
  <div class="main">
    <h1 class="font-title text-center">
      HTR Washington
    </h1>
    <p class="font-body text-center">
      Herramienta de transcripción de texto en documentos históricos mediante
      inteligencia artificial.
    </p>
    <DragAndDrop />
    <Button>
      <UploadIcon class="align-middle" />
      <span class="align-middle">
        Subir imagen
      </span>
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Button from './Button.vue'
import DragAndDrop from './DragAndDrop.vue'
import UploadIcon from './icon/UploadIcon.vue'

export default Vue.extend({
  components: {
    Button,
    DragAndDrop,
    UploadIcon,
  },
})
</script>

<style lang="scss">
@import '~/src/assets/scss/main.scss';

.main {
  width: 100vw;
  height: 100vh;
  margin: 0;
  box-sizing: border-box;
  padding: 2rem 3rem;
}
</style>
