<script lang="ts" setup>

import AppLogo from "@/components/AppLogo.vue";
import ProfileAvatar from "@/components/profiles/ProfileAvatar.vue";
import {ref} from "vue";
import {AuthService} from "@/services/auth.service";
import {useUserStore} from "@/stores/user.store";
import {useRouter} from "vue-router";

interface BaseHeaderProps {
  closeButton?: boolean;
  backButton?: boolean;
  avatar?: boolean;
}

const router = useRouter();

defineProps<BaseHeaderProps>();
const emit = defineEmits(["onCloseButton", "onBackButton"]);

const onBackButtonClicked = () => {
  emit('onBackButton');
}

const currentProfile = ref(useUserStore().currentProfile);


const menu = ref();
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Changer de profil',
        icon: 'pi pi-users',
        command: () => router.push("/profiles")
      },
      {
        label: 'Déconnexion',
        icon: 'pi pi-sign-out',
        command: async () => {
          const authService = new AuthService();
          await authService.signOut();
          await router.replace("/login");
        }
      }
    ]
  }
]);


function displayMenu(event: Event) {
  menu.value.toggle(event);
}

</script>

<template>
  <div class="flex justify-content-between p-5 align-items-center">
    <AppLogo/>
    <Button v-if="closeButton" icon="pi pi-times" outlined rounded aria-label="Cancel" @click="$emit('onCloseButton')"/>
    <Button v-else-if="backButton" icon="pi pi-arrow-left" outlined rounded aria-label="Cancel" @click="onBackButtonClicked()"/>
    <ProfileAvatar
        v-else-if="avatar && currentProfile"
        :image="currentProfile.avatar"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        mini
        @click="displayMenu"
    />
    <Menu ref="menu" id="overlay_menu" :model="items" popup />
  </div>
</template>