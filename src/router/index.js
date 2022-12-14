import VueRouter from "vue-router";
import MainView from "../views/MainView";
import InfoView from "@/views/MainView/GridView/InfoView";

const routes = [
    {path: "/", redirect: "/main"},
    {path: "/main", component: MainView},
    {path: "/gridInfo", component: InfoView},
];

export default new VueRouter({
    // mode: "history",
    mode: "hash",
    routes
});
