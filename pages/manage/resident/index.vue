<template>
	<div>
		<v-container>
      <div class="d-flex align-center">
        <h2 class="mt-2">Resident list</h2>
        <v-btn rounded
          color="primary"
          class="ml-auto"
          nuxt
          link
          to="resident/new"
        >
          <v-icon left> mdi-plus </v-icon> Add new
        </v-btn>
      </div>
      <v-row class="mt-5" v-if="$fetchState.pending">
        <v-col cols="12"md="3">
          <v-skeleton-loader
            type="card-avatar, article, actions"
          ></v-skeleton-loader>
        </v-col>

        <v-col cols="12"md="9">
          <v-skeleton-loader
            type="article, actions"
          ></v-skeleton-loader>

          <v-skeleton-loader
            type="table-heading, list-item-two-line, image, table-tfoot"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else-if="$fetchState.error">
        <v-col cols="12"md="12">
          <error-view />
        </v-col>
      </v-row>
      <div v-else>
        <ul v-if="residentList.length > 0" class="resident-list">
          <li v-for="(rl, k) in residentList" :key="k" to="/">
            <nuxt-link :to="`/manage/resident/${rl.id}`">
              <v-card
                  class="mx-auto"
                  max-width="100%"
                  outlined
                >
                <div class="d-flex align-center">
                  <v-avatar v-if="rl.pic && rl.pic != 'null'" size="80">
                    <img
                      :src="`${$config.laraURL}/accounts/${rl.pic}`"
                      :alt="firstLetter(rl.firstname, rl.lastname)"
                    >
                  </v-avatar>
                  <v-avatar v-else color="red" size="80">
                    <span class="white--text">{{ firstLetter(rl.firstname, rl.lastname) }}</span>
                  </v-avatar>
                  <div class="ml-2">
                    <div>{{ rl.firstname }} {{ rl.lastname }}</div>
                    <div>Resident ID : {{ rl.brgy_id }}</div>
                  </div>
                </div>
                </v-card>
            </nuxt-link>
            </li>
        </ul>
        <div v-else class="d-flex flex-column align-center mt-10">
          <img src="/_nuxt/assets/img/undraw_web_search_re_efla.svg" alt="" width="500">
          <h2>No data found</h2>
        </div>
      </div>
    </v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ErrorView from '~/components/ErrorView.vue'

  export default {
    middleware: 'access',
  	layout: 'withMenus',
  	components: { ErrorView },
  	data(){
  		return {
  		}
  	},

    async fetch() {
      await this.fetchResidentList()
    },

    fetchOnServer: false,

    computed: {
      ...mapGetters({
        residentList: 'admin/residentList'
      })
    },

  	methods: {
      async fetchResidentList() {
        await this.$store.dispatch('admin/fetchResidentList')
      },
      firstLetter(fname, lname) {
        return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`
      }
  	},
  }
</script>

<style lang="scss">
  .resident-list{
    display: flex;
    flex-wrap: wrap;
    padding: 20px!important;
    li{
      flex-basis: calc(31.33%);
      margin-right: 20px;
      margin-bottom: 20px;
      .v-sheet.v-card{
        padding: 10px;
      }
    }
  }
  .legend-ttl{
    h5{
      margin-top: 20px;
    }
    .container{
      padding-top: 0;
    }
  }
</style>