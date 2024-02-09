<script lang="ts" setup>
import {ref} from 'vue'
import AppLogo from "@/components/AppLogo.vue";

const checked = ref(false);

</script>

<template>
  <div>
    <AppLogo />
    <Button label="Submit" />
  </div>
</template>

