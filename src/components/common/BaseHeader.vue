<script lang="ts" setup>

import AppLogo from "@/components/AppLogo.vue";
import ProfileAvatar from "@/components/profiles/ProfileAvatar.vue";
import {ref} from "vue";
import router from "@/router";

interface BaseHeaderProps {
  closeButton?: boolean;
  backButton?: boolean;
  avatar?: boolean;
}

defineProps<BaseHeaderProps>();
defineEmits(["onCloseButton", "onBackButton"]);

//todo fetch current user
const profile = ref({
  id: "1",
  pseudo: "corentin",
  avatar: "https://randomuser.me/api/portraits/thumb/women/30.jpg"
});


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
        command: () => router.push("/login")
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
    <Button v-if="closeButton" icon="pi pi-times" outlined rounded aria-label="Cancel"/>
    <Button v-else-if="backButton" icon="pi pi-arrow-left" outlined rounded aria-label="Cancel"/>
    <ProfileAvatar
        v-else-if="avatar && profile"
        :image="profile.avatar"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        mini
        @click="displayMenu"
    />
    <Menu ref="menu" id="overlay_menu" :model="items" popup />
  </div>
</template>