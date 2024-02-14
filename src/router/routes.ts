import {RouteRecordRaw} from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import {AuthService} from "@/services/auth.service";
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/login" //todo après ça sera profiles
    },
    {
        path: "/login",
        component: LoginPage
    },
    {
        path: "/onboarding",
        component: () => import("@/views/Onboarding.vue"),
        beforeEnter:requiredAuth
    },
    {
        path: "/register",
        component: () => import("@/views/RegisterPage.vue"),

    },
    {
        path: "/profiles",
        component: () => import("@/views/ProfilesPage.vue"),
        beforeEnter:requiredAuth
    },
    {
        path: "/galleries",
        component: () => import("@/views/GalleriesPage.vue"),
        beforeEnter:requiredAuth
    },
    {
        path: "/galleries/:galleryId",
        component: () => import("@/views/GalleryDetailPage.vue"),
        beforeEnter:requiredAuth
    },
];
async function requiredAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const authService = new AuthService();

    if (await authService.isLoggedIn()) {
        next();
    } else {
        next("/login");
    }
}
export default routes;