<script setup lang="ts">

type inputType = "Password" | "Normal";

interface Content{
  placeholder: string,
  messageError?: string,
  inputValue: string,
  type?: inputType
}
defineProps<Content>();

const inputValue = defineModel('inputValue')

</script>

<template>
  <div class="card flex w-full">
    <div class="flex flex-column gap-2 w-full mb-4">
      <Password v-if="type == 'Password'" v-model="inputValue" :placeholder=placeholder :feedback="false" class="h-3rem"/>
      <InputText v-else v-model="inputValue" :placeholder=placeholder class="h-3rem"/>
      <small v-if="messageError" class="align-self-start text-red-500">{{messageError}}</small>
    </div>
  </div>
</template>

<style scoped>

</style>