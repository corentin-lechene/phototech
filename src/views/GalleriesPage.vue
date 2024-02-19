<script lang="ts" setup>
import {onMounted, ref} from "vue";
import BaseHeader from "@/components/common/BaseHeader.vue";
import PictureCard from "@/components/pictures/PictureCard.vue";
import {UserService} from "@/services/user.service";
import {Gallery} from "@/models";
import {useUserStore} from "@/stores/user.store";

const currentUser = useUserStore().currentUser;
const currentProfile = useUserStore().currentProfile;

const openCreateAlbumDialog = ref(false);
const openRenameAlbumDialog = ref(false);
const openDetailAlbumDialog = ref(false);

const selectedGallery = ref<Required<Gallery>>();

const galleries = ref<Required<Gallery>[]>();
const inputName = ref("");

onMounted(() => {
  fetchGalleries();
});


function onRenameAlbum() {
  const gallery = selectedGallery.value;
  if(!gallery) return;

  gallery.title = inputName.value;
  const userService = new UserService();
  userService
      .updateGallery(currentUser.id, currentProfile.id, gallery)
      .then(() => openRenameAlbumDialog.value = false)
      .then(() => inputName.value = "")
      .then(() => fetchGalleries())
      .catch(console.error);
}

function onCreateAlbum() {
  const userService = new UserService();
  userService
      .addGallery(currentUser.id, currentProfile.id, {title: inputName.value})
      .then(() => openCreateAlbumDialog.value = false)
      .then(() => inputName.value = "")
      .then(() => fetchGalleries())
      .catch(console.error);
}

function fetchGalleries() {
  const userService = new UserService();
  userService.getGalleriesByProfileId(currentUser.id, currentProfile.id)
      .then(response => galleries.value = response)
      .catch(console.error);
}

function deleteAlbum(galleryId: string) {
  const userService = new UserService();
  userService.deleteGallery(currentUser.id, currentProfile.id, galleryId)
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
          :subtitle="`${gallery.images.length} photo${gallery.images.length > 1 ? 's' : ''}`"
          :title="gallery.title"
          @on-info="selectedGallery = gallery; openDetailAlbumDialog = true"
          @on-click="$router.push(`/galleries/${gallery.id}`)"
          @on-rename="selectedGallery = gallery; inputName = gallery.title; openRenameAlbumDialog = true"
          @on-delete="deleteAlbum(gallery.id)"
      />
    </div>
    <Dialog v-model:visible="openRenameAlbumDialog" :style="{ width: '25rem', backgroundColor: 'white !important' }" header="Renommer" modal>
      <div v-if="selectedGallery" class="flex flex-column align-items-stretch gap-5" style="background-color: white !important;">
        <InputText v-model="inputName" class="flex-auto" placeholder="Nom de l'album" />
        <Button
            :disabled="!inputName.trim()"
            label="Modifier l'album"
            type="button"
            @click="onRenameAlbum()"
        ></Button>
      </div>
    </Dialog>
    <Dialog v-model:visible="openCreateAlbumDialog" :style="{ width: '25rem', backgroundColor: 'white !important' }" header="Nouvel album" modal>
      <div class="flex flex-column align-items-stretch gap-5" style="background-color: white !important;">
        <InputText v-model="inputName" class="flex-auto" placeholder="Nom de l'album"/>
        <Button
            :disabled="!inputName.trim()"
            label="Créer un nouvel album"
            type="button"
            @click="onCreateAlbum()"
        ></Button>
      </div>
    </Dialog>

    <Dialog v-model:visible="openDetailAlbumDialog" :style="{ width: '25rem', backgroundColor: 'white !important' }" header="Détails de l'album" modal>
      <div v-if="selectedGallery" class="px-2">
        <h2 class="mt-0 capitalize">{{selectedGallery.title}}</h2>
        <div class="text-md font-semibold">Nombre de photo :</div>
        <p class="mt-1">{{`${selectedGallery.images.length} photo${selectedGallery.images.length > 1 ? 's' : ''}`}}</p>
        <div class="text-md font-semibold">Créer le :</div>
        <p class="mt-1">{{selectedGallery.createdAt}}</p>
      </div>
    </Dialog>
  </div>
</template>

