import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/vigenere-cipher",
    children: [
        {
            path: "vigenere-cipher",
            component: () => import("@/components/VigenereCipher"),
            name: "vigenereCipher"
        }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
