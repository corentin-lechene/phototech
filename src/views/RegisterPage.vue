<script lang="ts" setup>
import BaseHeader from "@/components/common/BaseHeader.vue";
import InputForm from "@/components/inputs/InputForm.vue";
import {ref} from "vue";
import {AuthService} from "@/services/auth.service";
import {useRouter} from "vue-router";


const router = useRouter();

const authService = new AuthService();

const mail = ref('');
const password = ref('');
const conditionsChecked = ref(false);

const errorMessage = ref('');
const mailErrorMessage = ref('');
const passwordErrorMessage = ref('');

function onClickedSignUp() {
  errorMessage.value = "";
  mailErrorMessage.value = "";
  passwordErrorMessage.value = "";

  authService.signUp(mail.value, password.value, conditionsChecked.value)
      .then(async () => {
        await router.push("/profiles");
      })
      .catch((error) => {

        console.error("Erreur lors de l'enregistrement" + error.message)
        if(error.message === "auth/empty-fields") {
          errorMessage.value = "Veuillez remplir tous les champs";
        }

        if(error.message === "auth/conditions-not-checked") {
          errorMessage.value = "Veuillez accepter les conditions.";
        }

        if(error.code === "auth/email-already-in-use") {
          errorMessage.value = "Cet email a déjà été enregistré.";
        }

        if(error.code === "auth/invalid-email") {
          mailErrorMessage.value = "Mauvais mail";
        }
        if(error.code === "auth/missing-password") {
          passwordErrorMessage.value = "Le mot de passe est requis.";
        }
        if(error.code === "auth/weak-password") {
          passwordErrorMessage.value = "Votre mot est faible. Il doit faire au moins 6 caractères.";
        }

      })
}

async function onClickedSignUpWithGoogle() {
  try {
    await authService.signInWithGoogle();
    await router.push("/profiles");
  } catch (e) {
    console.error("error " + e);
  }

}
</script>

<template>
  <div class="flex flex-row h-full w-full">
    <div class="h-full w-full flex flex-column">
      <div>
        <BaseHeader />
      </div>

      <!-- Div Form Inscription -->
      <div class="div-form-register">
        <div class="flex flex-column px-8">
          <h1 class="font-normal"> Inscription </h1>
          <p class="slogan font-normal">Capturez chaque instant, sans limite avec PhotoTech</p>

          <Message v-if="errorMessage" :closable="false" severity="error">{{ errorMessage }}</Message>

          <InputForm v-model:inputValue="mail" :messageError="mailErrorMessage" type="email" placeholder="Mail"/>
          <InputForm v-model:inputValue="password" :messageError="passwordErrorMessage" type="password" placeholder="Mot de Passe"/>

          <div class="card flex flex-wrap justify-content-center gap-3 align-self-start mb-2">
            <div class="flex align-items-center">
              <Checkbox inputId="conditions" name="conditions" value="conditions" v-model="conditionsChecked" :binary="true"/>
              <label for="conditions" class="ml-2"> J’accepte les conditions générales </label>
            </div>
          </div>

          <Button label="S'inscrire" class="mb-2 h-3rem" @click="onClickedSignUp()"/>
          <div class="align-self-start font-normal">
            <span>Déjà un compte ? Connectez-vous </span>
            <span class="underline" style="color: #10b981; cursor: pointer;" @click="$router.push('/login')">ici</span>
            <span>.</span>
          </div>
          <Divider class="my-4"/>
          <Button label="S'inscrire avec Google" severity="info" raised class="mb-2 h-3rem" @click="onClickedSignUpWithGoogle()"/>

        </div>
      </div>

    </div>

    <!-- Div droit Image -->
    <div class="h-full w-full relative overflow-hidden">
      <div class="h-full w-full overflow-hidden">
        <Image class="overflow-hidden fixed" src="https://images.unsplash.com/photo-1533158307587-828f0a76ef46?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image" />
      </div>
    </div>

  </div>
</template>


<style scoped>
.div-form-register {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.005) 0%, rgba(255, 255, 255, 0.0508399) 49.16%, rgba(255, 255, 255, 0.005) 100%);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  width: auto;
  height: auto;
  border-radius: 30px;
  margin: 0 4em;
  text-align: center;
  padding: 2em 0;
}


.slogan {
  font-size: 20px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.7);
}

</style>