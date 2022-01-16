<template>
  <div>
    <navigation />
    <v-container>
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
  }
}
</script>

<style lang="scss">
</style>
