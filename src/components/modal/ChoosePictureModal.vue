<script lang="ts" setup>
import ProfileAvatar from "@/components/profiles/ProfileAvatar.vue";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {onMounted, ref} from "vue";
import {AvatarService} from "@/services/avatar.service";
import {v4 as uuidv4} from 'uuid';
import {useUserStore} from "@/stores/user.store";

const currentUser = useUserStore().currentUser;

const avatars = ref<{name: string, url: string}[]>([]);
const classics = [
    "https://randomuser.me/api/portraits/women/0.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/0.jpg",
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
];
const legos = [
  "https://randomuser.me/api/portraits/lego/0.jpg",
  "https://randomuser.me/api/portraits/lego/1.jpg",
  "https://randomuser.me/api/portraits/lego/2.jpg",
  "https://randomuser.me/api/portraits/lego/3.jpg",
  "https://randomuser.me/api/portraits/lego/4.jpg",
  "https://randomuser.me/api/portraits/lego/5.jpg",
  "https://randomuser.me/api/portraits/lego/6.jpg",
  "https://randomuser.me/api/portraits/lego/7.jpg",
  "https://randomuser.me/api/portraits/lego/8.jpg",
]

const fileInput = ref();
const emit = defineEmits(['imageChoose']);

function triggerFileSelect() {
  fileInput.value?.click();
}

async function onUpload(file: File){
  const storage = getStorage();
  const storageReference = storageRef(storage, `images/${currentUser.id}/${uuidv4()}`); // Change the path as needed
  try {
    const snapshot = await uploadBytes(storageReference, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    emit('imageChoose', downloadURL);
  } catch (error) {
    console.error('Upload failed', error);
  }
}

async function onFileSelected(event: Event){
  const target = event.target as HTMLInputElement;
  if (target?.files?.[0]) {
    await onUpload(target.files[0]);
  }
}

const chooseImageEvent = (e: Event, image: string) => {
  emit('imageChoose', image);
}

onMounted(async () => {
  const avatarService = new AvatarService();
  avatars.value = await avatarService.getAvatars();
})

</script>

<template>
  <div class="flex flex-column gap-5 w-full h-full px-8 ml-5">
    <div class="flex flex-row w-full h-fit">
      <div class="flex-grow-1 pr-2">
        <h1>Choisir un avatar</h1>
        <p>Choisissez une photo qui vous ressemble ou bien télécharger-là.</p>
      </div>
      <input type="file" ref="fileInput" @change="onFileSelected" accept="image/*" hidden>
      <div class="flex justify-content-end pr-7" style="flex-grow: 3;">
        <span class="p-buttonset mt-4 mr-2">
      <Button icon-pos="right" label="Télécharger" class="h-3rem w-16rem" icon="pi pi-cloud-upload" @click="triggerFileSelect" />
        </span>
      </div>
    </div>
    <div class="flex flex-column justify-content-around">
      <h2>Nos Avatars</h2>
      <div class = "flex justify-content-start gap-4">
        <ProfileAvatar
            v-for="avatar in avatars"
            class="flex flex-column align-items-center gap-4"
            :image="avatar.url"
            color="info"
            @on-click="chooseImageEvent($event, avatar.url)"/>
      </div>
    </div>

    <div>
      <h2>Classiques</h2>
      <div class = "flex justify-content-start gap-4">
        <ProfileAvatar
            v-for="classic in classics"
            class="flex flex-column align-items-center gap-4"
            :image="classic"
            color="info"
            @on-click="chooseImageEvent($event, classic)"/>
      </div>
    </div>

    <div>
      <h2>Légos</h2>
      <div class = "flex justify-content-start gap-4">
        <ProfileAvatar
            v-for="lego in legos"
            class="flex flex-column align-items-center gap-4"
            :image="lego"
            color="info"
            @on-click="chooseImageEvent($event, lego)"/>
      </div>
    </div>
  </div>

</template>

<style scoped>
</style>
