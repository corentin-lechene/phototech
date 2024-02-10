<script lang="ts" setup>

import {ref} from "vue";

interface PictureCardProps {
  image: string;
  title?: string;
  subtitle?: string;
}

defineProps<PictureCardProps>();
defineEmits(["onClick"]);

const menu = ref();
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Renommer',
        icon: 'pi pi-pencil',
        disabled: true
      },
      {
        label: 'Supprimer',
        icon: 'pi pi-trash',
      },
    ]
  }
]);

function openPictureMenu(event: Event) {
  menu.value.toggle(event);
}
</script>

<template>
  <div class="flex flex-column gap-2 border-round-2xl">
    <img
        class="w-auto h-auto border-round-2xl cursor-pointer"
        :src="image"
        alt="img"
        style="object-fit: cover; min-height: 15em; min-width: 15em; max-height: 15em; max-width: 15em"
        @click="$emit('onClick')"
    />
    <div class="flex justify-content-between mt-1">
      <div>
        <h3 class="m-0">{{ title }}</h3>
        <small class="font-medium text-white-alpha-70">{{ subtitle }}</small>
      </div>
      <i
          class="pi pi-ellipsis-v align-self-center cursor-pointer"
          style="font-size: 1.5rem"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          @click.stop="openPictureMenu"
      ></i>
    </div>
  </div>
  <Menu ref="menu" id="overlay_menu" :model="items" popup />
</template>

<style scoped>

</style>