import {NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from "vue-router";
import {useUserStore} from "@/stores/user.store";
import ProfilesPage from "@/views/ProfilesPage.vue";
import LoginPage from "@/views/LoginPage.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/profiles"
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
        beforeEnter: isAuthenticated
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
        beforeEnter: isAuthenticated
    },
    {
        path: "/profiles",
        component: ProfilesPage,
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

async function requiredAuth(_: RouteLocationNormalized, __: RouteLocationNormalized, next: NavigationGuardNext) {
    const userStore = useUserStore();
    // userStore.logout();
    if(!userStore.isLoggedIn) {
        return next("/login");
    }

    return next();
}

async function isAuthenticated(_: RouteLocationNormalized, __: RouteLocationNormalized, next: NavigationGuardNext) {
    const userStore = useUserStore();

    if(userStore.isLoggedIn) {
        return next("/profiles");
    }

    return next();
}

export default routes;