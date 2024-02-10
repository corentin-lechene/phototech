<script lang="ts" setup>
import {ref} from 'vue'
import BaseHeader from "@/components/common/BaseHeader.vue";
import ProfileAvatar from "@/components/profiles/ProfileAvatar.vue";
import router from "@/router";

//todo définir les models
interface Profile {
  id: string;
  pseudo: string;
  avatar: string;
}

//todo fetch profiles from server
const profiles = ref<Profile[]>([
  {
    id: "1",
    pseudo: "Corentin",
    avatar: "https://randomuser.me/api/portraits/thumb/women/30.jpg"
  },
  {
    id: "2",
    pseudo: "Melissa",
    avatar: "https://randomuser.me/api/portraits/thumb/women/31.jpg"
  },
  {
    id: "3",
    pseudo: "Abdallah",
    avatar: "https://randomuser.me/api/portraits/thumb/women/32.jpg"
  }
]);


function setProfile(profile: Profile) {
  console.log("Use PhotoTech for profile: ", profile);
  router.push("/galleries");
}
</script>

<template>
  <BaseHeader close-button @on-close-button="$router.back()" />
  <div class="flex flex-column align-items-center justify-content-center">
    <h1 class="font-bold">Choisissez votre profil</h1>
    <p class="font-medium m-0" style="letter-spacing: 0.075em;">
      Sauvegarder chaque instant, sans limite avec PhotoTech
    </p>
  </div>
  <div class="flex justify-content-center gap-5 mt-8">
    <ProfileAvatar
        v-for="profile in profiles"
        class="flex flex-column align-items-center gap-2"
        :image="profile.avatar"
        :label="profile.pseudo"
        color="info"
        @on-click="setProfile(profile)"
    />
  </div>
  <div class="flex justify-content-center gap-7 mt-5">
    <ProfileAvatar
        class="flex flex-column align-items-center gap-2"
        icon="pi pi-plus"
        label="Nouveau profil"
        @on-click="$router.push('/onboarding')"
    />
  </div>
</template>

