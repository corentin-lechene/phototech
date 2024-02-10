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

      <!-- Div Form Connexion -->
      <div class="div-form-login">
        <div class="flex flex-column px-8" style="font-family: 'Inter'">
          <h1 class="font-normal"> Connexion </h1>
          <p class="slogan font-normal">Capturez chaque instant, sans limite avec PhotoTech</p>

          <InputForm placeholder="Mail"/>
          <InputForm placeholder="Mot de Passe"/>

          <Button label="Se Connecter" class="mb-2 h-3rem"/>
          <span class="align-self-start">Pas de compte ? Créer en un <span id="ici" class="underline"><a href="/register">ici</a></span>.</span>
        </div>
      </div>

    </div>

  <!-- Div droit Image -->
    <div class="h-full w-full relative overflow-hidden">
      <div class="h-full w-full overflow-hidden">
        <Image class="overflow-hidden fixed" src="https://images.unsplash.com/photo-1622595659454-2de32ab192fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image" />
      </div>
    </div>

  </div>
</template>


<style scoped>
  .div-form-login {
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
