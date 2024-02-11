<script setup lang="ts">

import {computed} from "vue";

type color = "secondary" | "success" | "info" | "warning" | "help" | "danger" | "contrast"

interface ProfileAvatarProps {
  image?: string;
  icon?: string;
  iconSize?: string;
  color?: color | undefined;
  label?: string;
  mini?: boolean;
  large?: boolean;
}

const props = defineProps<ProfileAvatarProps>();
defineEmits(["onClick"]);

const avatarSize = computed(() => {
    if(props.large) {
      return "h-13rem w-13rem";

    } else {
      return props.mini ? "h-3rem w-3rem" : "h-7rem w-7rem"
    }
});

const iconSize = computed(() =>
    props.large ? "font-size: 5.5rem" : "font-size: 1.5rem"
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
        <i :class="icon" :style="iconSize"></i>
      </template>
    </Avatar>
    <span v-if="label" class="font-bold">{{ label }}</span>
  </Button>
</template>

<style scoped>

</style>