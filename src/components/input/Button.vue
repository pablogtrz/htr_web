<template>
  <div class="button" v-on="$listeners">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '~/src/assets/scss/main.scss';

.button {
  background: $c-secondary;
  color: white;
  width: fit-content;
  max-width: 10rem;
  padding: 0.25rem 0.55rem;
  border-radius: 7.5px;
  cursor: pointer;
  box-sizing: content-box;
}

.button:hover {
  transition: 0.3s;
  background: darken($c-secondary, 10);
}
</style>
