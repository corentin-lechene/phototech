import {NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from "vue-router";
import {useUserStore} from "@/stores/user.store";
import ProfilesPage from "@/views/ProfilesPage.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/profiles"
    },
    {
        path: "/login",
        name: "login",
        component: import("@/views/LoginPage.vue"),
        beforeEnter: requiredAuth
    },
    {
        path: "/onboarding",
        component: () => import("@/views/Onboarding.vue"),
        beforeEnter: requiredAuth
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/RegisterPage.vue"),
        beforeEnter: requiredAuth
    },
    {
        path: "/profiles",
        component: () => ProfilesPage,
        beforeEnter: requiredAuth
    },
    {
        path: "/galleries",
        component: () => import("@/views/GalleriesPage.vue"),
        beforeEnter: requiredAuth
    },
    {
        path: "/galleries/:galleryId",
        component: () => import("@/views/GalleryDetailPage.vue"),
        beforeEnter: requiredAuth
    },
];

async function requiredAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const userStore = useUserStore();

    if(!userStore.isLoggedIn && to.name !== "login") {
        return next("/login");
    }

    if(userStore.isLoggedIn && (to.name === "login" || to.name === "register")) {
        return next("/galleries");
    }
    return next();
}

export default routes;