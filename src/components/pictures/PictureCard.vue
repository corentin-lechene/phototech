<script lang="ts" setup>

import {computed, ref} from "vue";

interface PictureCardProps {
  image: string;
  title?: string;
  subtitle?: string;
}

defineProps<PictureCardProps>();
const emit = defineEmits(["onClick", "onDelete", "onRename"]);

const menu = ref();
const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Renommer',
        icon: 'pi pi-pencil',
        command: () => emit('onRename')
      },
      {
        label: 'Supprimer',
        icon: 'pi pi-trash',
        command: () => emit('onDelete')
      },
    ]
  }
]);


const focused = ref(false);

function openPictureMenu(event: Event) {
  menu.value.toggle(event);
}
</script>

<template>
  <div class="flex flex-column gap-2 border-round-2xl p-1">
    <img
        class="w-auto h-auto border-round-2xl cursor-pointer border-2 border-transparent"
        :src="image"
        :class="focused ? 'extraClasses' : 'border-transparent'"
        alt="img"
        style="object-fit: cover; min-height: 12.5em; min-width: 12.5em; max-height: 12.5em; max-width: 12.5em"
        @click="$emit('onClick')"
        @mouseenter="focused = true"
        @mouseleave="focused = false"
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
.extraClasses {
  border: 2px solid #10b981 !important;
  transition: border-color 0.3s;
}
</style>