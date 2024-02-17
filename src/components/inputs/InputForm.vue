<script setup lang="ts">

type inputType = "password" | "text" | 'email';

interface Content{
  placeholder: string,
  messageError?: string,
  inputValue: string,
  type?: inputType
}
withDefaults(defineProps<Content>(), {
  type: "text"
});

const inputValue = defineModel('inputValue')

</script>

<template>
  <div class="flex flex-column gap-2 w-full mb-4">
    <InputText :type="type" v-model="inputValue" :placeholder=placeholder class="w- h-3rem"/>
    <small v-if="messageError" class="align-self-start text-red-500">{{messageError}}</small>
  </div>
</template>

<style scoped>

</style>