<script lang="ts" setup>
import BaseHeader from "@/components/common/BaseHeader.vue";
import InputForm from "@/components/inputs/InputForm.vue";

</script>

<template>
  <div class="flex flex-row h-full w-full">
    <div class="h-full w-full flex flex-column">
      <div>
        <BaseHeader />
      </div>

      <!-- Div Form Inscription -->
      <div class="div-form-register">
        <div class="flex flex-column px-8" style="font-family: 'Inter'">
          <h1 class="font-normal"> Inscription </h1>
          <p class="slogan font-normal">Capturez chaque instant, sans limite avec PhotoTech</p>

          <InputForm placeholder="Mail"/>
          <InputForm placeholder="Mot de Passe"/>

          <div class="card flex flex-wrap justify-content-center gap-3 align-self-start mb-2">
            <div class="flex align-items-center">
              <Checkbox inputId="conditions" name="conditions" value="conditions" />
              <label for="conditions" class="ml-2"> J’accepte les conditions générales </label>
            </div>
          </div>

          <Button label="S'inscrire" class="mb-2 h-3rem"/>
          <span class="align-self-start">Déjà un compte ? Connectez-vous <span id="ici" class="underline"><a href="/login">ici</a></span>.</span>
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

#ici {
  color: #0074D9;
}

</style>