<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>

    <v-footer
      app
      color="deep-purple accent-4"
      absolute
      class="d-flex justify-center flex-column white--text pa-4"
    >
      <span>Barangay Management System &copy; {{ new Date().getFullYear() }}</span>
      <span>Develop with ❤️ by Girlie &amp; Developer2</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
}
</script>
