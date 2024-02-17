<script lang="ts" setup>
import ProfileAvatar from "@/components/profiles/ProfileAvatar.vue";

const classics = [
    "https://randomuser.me/api/portraits/thumb/women/30.jpg",
    "https://randomuser.me/api/portraits/thumb/women/31.jpg",
    "https://randomuser.me/api/portraits/thumb/women/32.jpg",
    "https://randomuser.me/api/portraits/thumb/women/33.jpg",
    "https://randomuser.me/api/portraits/thumb/women/34.jpg",
    "https://randomuser.me/api/portraits/thumb/women/35.jpg",
    "https://randomuser.me/api/portraits/thumb/women/36.jpg",
    "https://randomuser.me/api/portraits/thumb/women/37.jpg",
];

const emit = defineEmits(['imageChoose']);


const chooseImageEvent = (e: Event, image: string) => {
  emit('imageChoose', image);
}

</script>

<template>
  <div class="flex flex-column gap-5 w-full h-full fixed px-8 ml-5">
    <div class="flex flex-row w-full h-fit">
      <div class="flex-grow-1 pr-2">
        <h1>Choisir un avatar</h1>
        <p>Choisissez une photo qui vous ressemble ou bien télécharger-là.</p>
      </div>
      <div class="flex justify-content-end pr-7" style="flex-grow: 3;">
        <span class="p-buttonset mt-4 mr-2">
          <Button icon-pos="right" label="Télécharger" class="h-3rem w-16rem"  icon="pi pi-cloud-upload" />
        </span>
      </div>
    </div>
    <div class="flex flex-column justify-content-around">
      <h2>Classiques</h2>
      <div class = "flex justify-content-start gap-4">
        <ProfileAvatar
            v-for="classic in classics"
            class="flex flex-column align-items-center gap-4"
            :image="classic"
            color="info"
            @on-click="chooseImageEvent($event, classic)"/>
      </div>
    </div>

    <div>
      <h2>Cartoons</h2>
      <div class = "flex justify-content-start gap-4">
        <ProfileAvatar
            v-for="classic in classics"
            class="flex flex-column align-items-center gap-4"
            :image="classic"
            color="info"
            @on-click="chooseImageEvent($event, classic)"/>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
