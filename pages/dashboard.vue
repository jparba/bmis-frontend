<template>
  <div>
    <navigation />
    <v-container class="mt-5">
      <v-row>
        <v-row>
          <v-col cols="12" md="3">
            <dash-menu />
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navigation from '~/components/DashNavigation.vue'
import DashMenu from '~/components/DashMenu.vue'

export default {
  middleware: 'access',
  layout: 'clean',
  components: {
    Navigation,
    DashMenu
  },
  data() {
    return {

    }
  },
  mounted() {
    this.$auth.user.status == 0 ? this.$router.push('/accountStatus') : ''
  }
}
</script>

<style lang="scss">
</style>
