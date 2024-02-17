<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import BaseHeader from "@/components/common/BaseHeader.vue";
import ProfileAvatar from "@/components/profiles/ProfileAvatar.vue";
import router from "@/router";
import {UserService} from "@/services/user.service";
import {Profile} from "@/models";
import {useUserStore} from "@/store/user.store";


const profiles = ref<Profile[]>();
const currentUserId = "ahqdE9y0DOtU12THxfZD"; //todo get from store

console.log("profile " + useUserStore().isLoggedIn);

onMounted(async () => {
  try {
    const userService = new UserService();
    profiles.value = await userService.getProfilesByUserId(currentUserId)
  } catch(e) {
      console.error(e);
  }
})

function setProfile(profile: Profile) {
  console.log("Use PhotoTech for profile: ", profile);
  router.push("/galleries");
}
</script>

<template>
  <BaseHeader close-button @on-close-button="$router.replace('/galleries')" />
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

