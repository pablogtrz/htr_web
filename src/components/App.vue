<template>
  <h1>Prueba</h1>
</template>

<script lang="ts">
import Vue from 'vue'
import { Model } from '../services/tensorflow'

export default Vue.extend({
  async created() {
    const model = await Model.createFrom(
      'https://raw.githubusercontent.com/tensorflow/tfjs-examples/master/abalone-node/trainedModel/model.json'
    )
    model.summary()
    console.log(model.predict([[1]]))
  },
})
</script>

<style lang="scss" scoped>
html,
body {
  color: green;
}
</style>
