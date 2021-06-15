import Vue from 'vue'
import App from './src/components/App.vue'
import * as tf from '@tensorflow/tfjs'

document.addEventListener('DOMContentLoaded', function(_) {
  new Vue({
    render: createElement => createElement(App),
  }).$mount('#app')
})
