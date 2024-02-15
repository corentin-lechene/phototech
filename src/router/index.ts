import {createRouter, createWebHistory} from "vue-router";
import routes from "./routes";
import {useUserStore} from "@/services/store.service";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach(async (to, from) => {
    const userStore = useUserStore();

    // ici on peut faire des vérifications avant chaque changement de route
    // et rediriger l'utilisateur si besoin
    if (
        // make sure the user is authenticated
        // !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        // to.name !== 'Login'
        true
    ) {
        // redirect the user to the login page
        return { name: 'Login' }
    }
})


export default router