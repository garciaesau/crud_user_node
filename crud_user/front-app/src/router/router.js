import Vue from "vue";
import Router from "vue-router";
import DeveloperList from "../components/DeveloperList";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "developers",
            component: DeveloperList
        }
    ]
})
