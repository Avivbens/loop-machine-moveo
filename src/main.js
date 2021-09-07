import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store/loop-machine.store.js'

Vue.config.productionTip = false

import './styles/main.scss'

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')
