<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import BaseHeader from "@/components/common/BaseHeader.vue";
import {UserService} from "@/services/user.service";
import {Picture} from "@/models";

const currentUserId = "ahqdE9y0DOtU12THxfZD"; //todo get from store
const currentProfileId = "W2DgPs91zBrNDyw8Kh5q"; //todo get from store
const galleryId = ref("");

const pictures = ref<Required<Picture>[]>([]);
const imageUrl = ref("https://picsum.photos/536/354");

const openAddImageDialog = ref(false);

const router = useRouter();

const items = ref([
  { label: 'A ajouter le titre', command: () => router.replace('/galleries')},
]);

onMounted(() => {
  fetchPictures();
});


function onAddPicture() {
  const userService = new UserService();
  userService
      .addPicture(currentUserId, currentProfileId, galleryId.value, {
        url: imageUrl.value,
        //todo ajoute d'autre propriétés ici
      })
      .then(() => fetchPictures())
      .then(() => openAddImageDialog.value = false)
      .catch(console.error);
}

function onDeletePicture(pictureId: string) {
  const userService = new UserService();
  userService.deletePicture(currentUserId, currentProfileId, galleryId.value, pictureId)
      .then(() => fetchPictures())
      .catch(console.error);
}

function fetchPictures() {
  const route = useRoute();
  galleryId.value = route.params.galleryId as string;
  console.log("Gallery id: ", galleryId.value);

  const userService = new UserService();
  userService.getPicturesByGalleryId(currentUserId, currentProfileId, galleryId.value)
      .then(response => pictures.value = response)
      .catch(console.error);
}
</script>

<template>
  <div>
    <BaseHeader avatar/>
    <div class="px-8 mb-8 flex flex-column">
      <Breadcrumb :home="{ icon: 'pi pi-home' }" :model="items" />

      <div class="flex justify-content-between align-items-center">
        <h1 class="font-bold">À ajouter le titre</h1>
        <Button class="h-3rem" label="Ajouter une photo" @click="openAddImageDialog = true"/>
      </div>
      <div class="flex flex-row flex-wrap gap-5">
        <!-- todo rajouter ici chaques images       -->
      </div>
      <!--    https://primevue.org/image/#preview -->
    </div>

    <!-- todo créer la dialog pour ajouter une image (créer un composant pour Melissa)   -->
  </div>
</template>

<style scoped>
.p-breadcrumb {
  background-color: transparent;
}

.p-menuitem-text {
  color: #ff0000 !important;
  font-weight: 500;
}

</style>