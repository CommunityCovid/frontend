import VueRouter from 'vue-router'
import Main from "../views/Main";

const routes = [
    {path: "/main", component: Main},
    {path: '/', redirect: '/main'},
]

export default new VueRouter({
    mode: 'history',
    routes
})
