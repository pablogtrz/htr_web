<template>
  <div class="drag-and-drop">
    <form ref="fileform" @drop="drop">
      <PictureIcon :size="48" />
      <h3>Arrastra</h3>
      <h3>Arrastra</h3>
      <h3>Arrastra</h3>
      <input
        type="file"
        name="file"
        @change="updateFile"
        style="display: none;"
      />
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PictureIcon from './icon/PictureIcon.vue'

export default Vue.extend({
  components: {
    PictureIcon,
  },
  props: {
    value: {
      type: File,
      default: undefined,
    },
  },
  computed: {
    file: {
      set(newValue: File) {
        this.$emit('input', newValue)
      },
      get(): File {
        return this.value
      },
    },
  },
  methods: {
    drop(event) {
      const file = event.dataTransfer.files[0]
      console.log(file)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/src/assets/scss/main.scss';

.drag-and-drop {
  padding: 1rem 3.5rem;
  border: 3px dashed $c-primary;
  border-radius: 10px;
  text-align: center;
  color: $c-primary;
  max-width: 25rem;
  cursor: pointer;
}

.drag-and-drop:hover {
  transition: 0.75s;
  background: darken(white, 7.5);
}

.drag-and-drop:-moz-drag-over {
  transition: 0.75s;
  background: darken($c-secondary, 55);
}
</style>
