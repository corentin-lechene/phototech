<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import BaseHeader from "@/components/common/BaseHeader.vue";
import {UserService} from "@/services/user.service";
import {Picture} from "@/models";
import {ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import {getFirebase} from "@/services/firebase.service";
import {useUserStore} from "@/stores/user.store";

const { storage } = getFirebase;

const currentUser = useUserStore().currentUser
const currentProfile = useUserStore().currentProfile
const galleryId = ref("");
const galleryTitle = ref("");
const pictures = ref<Required<Picture>[]>([]);
const openAddImageDialog = ref(false);
const router = useRouter();
const route = useRoute();
const selectedFile = ref<File | null>(null);
const uploadedImageUrl = ref('');
const fileInput = ref();
const menu = ref();
const currentPictureId = ref('');

const items = ref([
  {label: 'A ajouter le titre', command: () => router.replace('/galleries')},
]);

const item = computed(() => [
  {
    label: 'Options',
    items: [
      {
        label: 'Supprimer',
        icon: 'pi pi-trash',
        command: handleDelete(currentPictureId.value)
      },
    ]
  }
]);

async function fetchPictures() {
  try {
    pictures.value = await userService.getPicturesByGalleryId(currentUser.id, currentProfile.id, galleryId.value);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  galleryId.value = route.params.galleryId as string;
  fetchPictures();
});

const userService = new UserService();

async function onDelete(pictureId: string) {
  const picture = pictures.value.find(picture => picture.id === pictureId);
  if (!picture) {
    console.error("Picture not found!");
    return;
  }
  const pictureRef = storageRef(storage, picture.url);

  await deleteObject(pictureRef)
  try {
    await userService.deletePicture(currentUser.id, currentProfile.id, galleryId.value, pictureId);
    pictures.value = pictures.value.filter(p => p.id !== pictureId);
  } catch (error) {
    console.error("There was an error deleting the picture:", error);
  }
}

async function onAddPicture(downloadURL: string) {
  try {
    const newPicture = {
      id: Date.now().toString(),
      url: downloadURL,
      createdAt: new Date()
    };
    await userService.addPicture(currentUser.id, currentProfile.id, galleryId.value, newPicture);
    pictures.value.push(newPicture);
  } catch (error) {
    console.error('Error saving picture:', error);
  }
}

async function onUpload(file: File) {
  if (!galleryId.value) {
    console.error("Gallery ID is null");
    return;
  }

  const storageReference = storageRef(storage, `images/${galleryId.value}`);
  try {
    const snapshot = await uploadBytes(storageReference, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    await onAddPicture(downloadURL);
    openAddImageDialog.value = false;
  } catch (error) {
    console.error('Upload failed', error);
  }
}

async function onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (target?.files && target.files.length > 0) {
    const file = target.files[0];
    selectedFile.value = file;
    uploadedImageUrl.value = URL.createObjectURL(file);
    await onUpload(file)
  } else {
    console.error('No files selected.');
  }
}

function triggerFileSelect() {
  fileInput.value?.click();
}

function handleDelete(pictureId: string) {
  return () => {
    if (menu.value) {
      menu.value.hide();
    }
    onDelete(pictureId);
  };
}

function openPictureMenu(pictureId: string, event: Event) {
  currentPictureId.value = pictureId;
  menu.value.toggle(event);
}

</script>

<template>
  <div>
    <BaseHeader avatar/>
    <div class="px-8 mb-8 flex flex-column">
      <Breadcrumb :home="{ icon: 'pi pi-home' }" :model="items"/>
      <div class="flex justify-content-between align-items-center">
        <h1 class="font-bold">{{ galleryTitle }}</h1>
        <Button class="h-3rem" label="Ajouter une photo" @click="openAddImageDialog = true"/>
      </div>
      <div class="flex flex-row flex-wrap gap-5">
        <div v-for="picture in pictures" :key="picture.id" class="picture-card" >
          <Image :src="picture.url" alt="Image" width="200" preview />
          <i
              class="pi pi-ellipsis-v align-self-center cursor-pointer"
              style="font-size: 1.5rem; padding-left:10px"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              @click.stop="openPictureMenu(picture.id, $event)"
          ></i>
        </div>
        <Menu ref="menu" id="overlay_menu" :model="item" popup />
      </div>
    </div>
    <!-- Dialog for adding a new image -->
    <Dialog :visible="openAddImageDialog" @hide="openAddImageDialog = false" modal dismissableMask>
      <input type="file" ref="fileInput" @change="onFileSelected" accept="image/*" hidden>
      <FileUpload name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000">
        <template #header>
          <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
            <div class="flex gap-2">
              <Button @click="triggerFileSelect" icon="pi pi-images" rounded outlined></Button>
              <Button icon="pi pi-times" rounded outlined severity="danger" @click="openAddImageDialog = false" />
            </div>
          </div>
        </template>
        <template #empty>
          <div class="flex align-items-center justify-content-center flex-column">
            <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"/>
            <p>Drag an image here to upload</p>
          </div>
        </template>
      </FileUpload>
    </Dialog>
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

.picture-card {
  margin-top: 30px;
  border-radius: 15px;
  overflow: hidden;
  height: auto;
  position: relative;
}

.pi-ellipsis-v {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

</style>