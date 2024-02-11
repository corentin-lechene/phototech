import {RouteRecordRaw} from "vue-router";
import LoginPage from "@/views/LoginPage.vue"; //todo après ça sera profiles

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
        component: () => import("@/views/Onboarding.vue")
    },
    {
        path: "/register",
        component: () => import("@/views/RegisterPage.vue")
    },
    {
        path: "/profiles",
        component: () => import("@/views/ProfilesPage.vue")
    },
    {
        path: "/galleries",
        component: () => import("@/views/GalleriesPage.vue")
    },
    {
        path: "/galleries/:galleryId",
        component: () => import("@/views/GalleryDetailPage.vue")
    },
];

export default routes;