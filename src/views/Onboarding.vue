<script lang="ts" setup>
import BaseHeader from "@/components/common/BaseHeader.vue";
import InputForm from "@/components/inputs/InputForm.vue";
import ProfileAvatar from "@/components/profiles/ProfileAvatar.vue";
import ChoosePictureModal from "@/components/modal/ChoosePictureModal.vue";
import {ref} from "vue";

const openChoosePictureModal = ref(false);
const imageChosen = ref('');
const disabled = ref(true);

const handleImageChosen = (image: string) => {
  imageChosen.value = image;
  openChoosePictureModal.value = false;
}

</script>

<template>
  <BaseHeader :backButton="true" class="px-8"/>
  <div class="flex flex-row h-full w-full fixed px-8">
  <!-- Div left -->
    <div class="h-full flex-grow-1 mt-6 pl-5 pr-2">
      <div class="w-fit mt-8">
        <h1 class="font-normal"> Ajoutez un nouveau profil </h1>
        <p class="text-sm font-semibold" style="letter-spacing: 0.05em;">Vous y êtes presque.. Choisissez votre Nom et votre photo de profil pour continuer.</p>
        <Divider class="my-5"/>
        <InputForm placeholder="Nom du profil"/>
        <Button :disabled="disabled" label="Confirmer" class="w-full h-3rem"/>

      </div>
    </div>
    <div class="flex justify-content-center align-items-center" style="flex-grow: 3;">

      <ProfileAvatar
          v-if="imageChosen"
          style="margin-bottom: 30%; margin-right: 25%;"
          :large = "true"
          icon="pi pi-plus"
          label="Nouveau profil"
          @on-click="openChoosePictureModal = true"
          :image="imageChosen"
      />
      <ProfileAvatar
          v-else
          style="margin-bottom: 30%; margin-right: 25%;"
          :large = "true"
          icon="pi pi-user"
          label="Nouveau profil"
          @on-click="openChoosePictureModal = true"
      />
    </div>
  </div>
  <div class="card flex justify-content-center">
    <Dialog v-model:visible="openChoosePictureModal" modal dismissableMask contentClass="style-modal" :style="{ width: '95%', height: '100%', backgroundColor: '#202639'}">
      <template #header > Choisir un avatar </template>
      <ChoosePictureModal @imageChoose="handleImageChosen($event)"/>
    </Dialog>
  </div>
</template>

<style >
  .style-modal {
    background-color: #202639;
    color: #ffffff;
  }

  .p-dialog-header {
    background-color: #202639 !important;
    color: #202639 !important;
  }
</style>
