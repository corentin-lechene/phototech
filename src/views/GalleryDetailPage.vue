<script setup lang="ts">

import BaseHeader from "@/components/common/BaseHeader.vue";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const pictures = ref([]);
const galleryId = ref("");

onMounted(() => {
  //todo fetch pictures from server
  const route = useRoute();
  galleryId.value = route.params.galleryId as string;
})
</script>

<template>
  <div>
    <BaseHeader avatar />
    {{ galleryId }}

<!--    https://primevue.org/image/#preview -->
  </div>
</template>

<style scoped>

</style>