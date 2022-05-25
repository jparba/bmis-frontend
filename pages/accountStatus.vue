<template>
  <div>
    <navigation />
    <v-container>
      <template>
        <v-card
          class="mx-auto my-12"
          max-width="500"
        >

          <v-card-title>Good Day {{ $auth.user.firstname }}!</v-card-title>

          <v-card-text>
            <div>Your account application was currently reviewed by our barangay personnel. After that we will notify you by SMS.</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="ml-auto"
              color="deep-purple lighten-2"
              text
              nuxt
              link
              to="/"
            >
              Homepage
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-container>
  </div>
</template>

<script>
import Navigation from '~/components/DashNavigation.vue'

export default {
  layout: 'clean',
  components: {
    Navigation
  },
  data(){
    return {
      timer: null
    }
  },
  methods: {
    async checkStatus() {
      await this.$api.get(`user`)
        .then((res) => {
          this.$auth.setUser(res.data)
          if(res.data.status == 1) {
            this.$router.push('/myAccount')
          }else if(res.data.status == 4) {
            this.$router.push('/reuploadID')
          }
        })
    }
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.checkStatus()
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
</style>
