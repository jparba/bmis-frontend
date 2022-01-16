<template>
  <div class="error-view">
    <img
      alt="Vuetify Logo"
      src="~/assets/img/404.png"
    >
    <v-btn
      x-large
      color="success"
      dark
      to="/"
    >
      Back to home page
    </v-btn>
  </div>
</template>

<style>
  .error-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 75vh;
  }
  .error-view img {
    max-width: 800px;
  }
</style>
