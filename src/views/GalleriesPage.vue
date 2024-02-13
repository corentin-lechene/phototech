<script lang="ts" setup>
import {onMounted, ref} from "vue";
import BaseHeader from "@/components/common/BaseHeader.vue";
import PictureCard from "@/components/pictures/PictureCard.vue";
import {UserService} from "@/services/user.service";
import {Gallery} from "@/models";

const currentUserId = "ahqdE9y0DOtU12THxfZD"; //todo get from store
const currentProfileId = "W2DgPs91zBrNDyw8Kh5q"; //todo get from store

const openCreateAlbumDialog = ref(false);

const galleries = ref<Required<Gallery>[]>();
const albumName = ref("");

onMounted(() => {
  fetchGalleries();
});


function onCreateAlbum() {
  const userService = new UserService();
  userService
      .addGallery(currentUserId, currentProfileId, {title: albumName.value})
      .then(() => fetchGalleries())
      .then(() => openCreateAlbumDialog.value = false)
      .then(() => albumName.value = "")
      .catch(console.error);
}

function fetchGalleries() {
  const userService = new UserService();
  userService.getGalleriesByProfileId(currentUserId, currentProfileId)
      .then(response => galleries.value = response)
      .catch(console.error);
}

function deleteAlbum(galleryId: string) {
  const userService = new UserService();
  userService.deleteGallery(currentUserId, currentProfileId, galleryId)
      .then(() => fetchGalleries())
      .catch(console.error);
}

</script>

<template>
  <BaseHeader avatar/>
  <div class="px-8 mb-8 flex flex-column">
    <div class="flex justify-content-between align-items-center">
      <h1 class="font-bold">Mes albums</h1>
      <Button class="h-3rem" label="Créer un album" @click="openCreateAlbumDialog = true"/>
    </div>
    <div class="flex flex-row flex-wrap gap-5">
      <PictureCard
          v-for="(gallery, i) in galleries"
          :key="i"
          :image="`https://picsum.photos/536/35${i}`"
          :subtitle="gallery.images.length + ' photos'"
          :title="gallery.title"
          @on-click="$router.push(`/galleries/${gallery.id}`)"
          @on-delete="deleteAlbum(gallery.id)"
      />
    </div>
    <Dialog v-model:visible="openCreateAlbumDialog" :style="{ width: '25rem', backgroundColor: 'white !important' }" header="Nouvel album" modal>
      <div class="flex flex-column align-items-stretch gap-5" style="background-color: white !important;">
        <InputText v-model="albumName" class="flex-auto" placeholder="Nom de l'album"/>
        <Button
            :disabled="!albumName.trim()"
            label="Créer un nouvel album"
            type="button"
            @click="onCreateAlbum()"
        ></Button>

      </div>
    </Dialog>
  </div>
</template>

