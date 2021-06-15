import Vue from 'vue'
import App from './src/components/App.vue'

document.addEventListener('DOMContentLoaded', function(_) {
  new Vue({
    render: createElement => createElement(App),
  }).$mount('#app')
})
