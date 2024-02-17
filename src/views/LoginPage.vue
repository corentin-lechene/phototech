<script lang="ts" setup>
import BaseHeader from "@/components/common/BaseHeader.vue";
import InputForm from "@/components/inputs/InputForm.vue";
import {ref} from "vue";
import {AuthService} from "@/services/auth.service";
import router from "@/router";

const authService = new AuthService();

const mail = ref('');
const password = ref('');
const messageError = ref('');

function onClickedSignIn() {
  authService.signIn(mail.value, password.value)
      .then(async () => {
        await router.push("profiles/");
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion" + error)

        if (error.code != "auth/invalid-email" || error.code != "auth/invalid-credential") {
          messageError.value = "Invalid Credentials";
        }

        password.value = '';
      })
}

</script>

<template>
  <div class="flex flex-row h-full w-full">
    <div class="h-full w-full flex flex-column">
      <div>
        <BaseHeader/>
      </div>

      <!-- Div Form Connexion -->
      <div class="div-form-login">
        <div class="flex flex-column px-8">
          <h1 class="font-normal"> Connexion </h1>
          <p class="slogan font-normal">Capturez chaque instant, sans limite avec PhotoTech</p>

          <Message v-if="messageError" :closable="false" severity="error">{{ messageError }}</Message>

          <InputForm v-model:inputValue="mail" placeholder="Mail" type="email"/>
          <InputForm v-model:inputValue="password" placeholder="Mot de Passe" type="password"/>

          <Button class="mb-2 h-3rem" label="Se Connecter" @click="onClickedSignIn()"/>
          <div class="align-self-start font-normal">
            <span>Pas de compte ? Créer en un </span>
            <span class="underline" style="color: #10b981">ici</span>
            <span>.</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Div droit Image -->
    <div class="h-full w-full relative overflow-hidden">
      <div class="h-full w-full overflow-hidden">
        <Image alt="Image"
               class="overflow-hidden fixed"
               src="https://images.unsplash.com/photo-1622595659454-2de32ab192fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      </div>
    </div>

  </div>
</template>


<style scoped>
.div-form-login {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.005) 0%, rgba(255, 255, 255, 0.0508399) 49.16%, rgba(255, 255, 255, 0.005) 100%);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  width: 70%;
  height: 80%;
  border-radius: 30px;
  text-align: center;
  margin-left: 10%;
  padding-top: 3%;
}

.slogan {
  font-size: 20px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.7);
}

</style>
