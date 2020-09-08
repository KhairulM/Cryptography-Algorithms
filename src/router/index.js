import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

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
      },
      {
        path: "playfair-cipher",
        component: () => import("@/components/PlayfairCipher"),
        name: "playfairCipher"
      },
      {
        path: "affine-cipher",
        component: () => import("@/components/AffineCipher"),
        name: "affineCipher"
      },
      {
        path: "hill-cipher",
        component: () => import("@/components/HillCipher"),
        name: "hillCipher"
      },
      {
        path: "super-encryption",
        component: () => import("@/components/SuperEncryption"),
        name: "superEncryption"
      },
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
