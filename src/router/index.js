import VueRouter from "vue-router";
import MainView from "../views/MainView";
import InfoView from "@/views/MainView/DailyView/GridView/InfoView";

const routes = [
    {path: "/", redirect: "/main"},
    {path: "/main", component: MainView},
    {path: "/gridInfo", component: InfoView},
];

export default new VueRouter({
    mode: "history",
    routes
});
