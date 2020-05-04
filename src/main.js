import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VeeValidate from 'vee-validate';

Vue.use(VueMaterial, VeeValidate);

new Vue({
  render: h => h(App),
}).$mount('#app')
