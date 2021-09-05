import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import app from '../views/loop-machine.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/app',
        name: 'app',
        component: app
    }
]

const router = new VueRouter({
    routes
})

export default router
