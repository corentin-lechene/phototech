<script setup lang="ts">

import {computed} from "vue";

type color = "secondary" | "success" | "info" | "warning" | "help" | "danger" | "contrast"

interface ProfileAvatarProps {
  image?: string;
  icon?: string;
  color?: color | undefined;
  label?: string;
  mini?: boolean;
}

const props = defineProps<ProfileAvatarProps>();
defineEmits(["onClick"]);

const avatarSize = computed(() => props.mini
    ? "h-3rem w-3rem"
    : "h-7rem w-7rem"
);


</script>

<template>
  <Button class="flex flex-column align-items-center gap-2" :severity="color" text @click="$emit('onClick', $event)">
    <Avatar
        v-if="image"
        :image="image"
        :class="avatarSize"
        shape="circle"
    />
    <Avatar
        v-else-if="icon"
        :class="avatarSize"
        class="text-black-alpha-90 bg-white"
        shape="circle"
        size="normal"
    >
      <template #icon>
        <i :class="icon" style="font-size: 1.5rem"></i>
      </template>
    </Avatar>
    <span v-if="label" class="font-bold">{{ label }}</span>
  </Button>
</template>

<style scoped>

</style>