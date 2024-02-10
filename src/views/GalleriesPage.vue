<script lang="ts" setup>
import BaseHeader from "@/components/common/BaseHeader.vue";
import PictureCard from "@/components/pictures/PictureCard.vue";

//todo fetch galleries from server


</script>

<template>
  <BaseHeader avatar/>
  <div class="px-8 flex flex-column">
    <h1 class="font-bold">Mes albums</h1>
    <div class="flex flex-row flex-wrap gap-5">
      <PictureCard
          v-for="i in 10"
          :key="i"
          :image="`https://picsum.photos/536/35${i}`"
          title="Melissa"
          subtitle="2 photos"
          @on-click="$router.push(`/galleries/${i}`)"
      />
    </div>
  </div>
</template>

