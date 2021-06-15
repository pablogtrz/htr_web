<template>
  <div class="main">
    <h1 class="font-title text-center">
      HTR Washington
    </h1>
    <p class="font-body text-center">
      Herramienta de transcripción de texto en documentos históricos mediante
      inteligencia artificial.
    </p>
    <DragAndDrop class="drag-and-drop" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DragAndDrop from './DragAndDrop.vue'
import UploadIcon from './icon/UploadIcon.vue'
import { Model } from '../services/tensorflow'

export default Vue.extend({
  components: {
    DragAndDrop,
    UploadIcon,
  },
  async created() {
    const model = await Model.createFrom(
      'https://raw.githubusercontent.com/tensorflow/tfjs-examples/master/abalone-node/trainedModel/model.json'
    )
    model.summary()
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

.drag-and-drop {
  display: block;
  margin: 1rem 0;
}
</style>
