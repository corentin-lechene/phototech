<script lang="ts" setup>
import {ref} from 'vue'
import BaseHeader from "@/components/common/BaseHeader.vue";
import ProfileAvatar from "@/components/profiles/ProfileAvatar.vue";

//todo fetch profiles from server
interface Profile {
  id: string;
  pseudo: string;
  avatar: string;
}

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

</script>

<template>
  <BaseHeader avatar/>

</template>

