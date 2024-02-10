<script setup lang="ts">
import {ref} from "vue";

interface Content{
  placeholder: string,
  messageError?: string
}
defineProps<Content>();

const s = ref('');
</script>

<template>
  <div class="card flex w-full">
    <div class="flex flex-column gap-2 w-full mb-3">
      <InputText v-model="s" :placeholder=placeholder class="h-3rem"/>
      <small v-if="messageError?.length != 0" class="align-self-start text-red-500">{{messageError}}</small>
    </div>
  </div>
</template>

<style scoped>

</style>