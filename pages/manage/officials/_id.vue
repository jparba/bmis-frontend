<template>
	<div>
		<v-container>
      <div class="d-flex align-center mb-8">
         <h2 class="mt-2">Official Information</h2>
         <v-btn rounded
           color="primary"
           class="ml-auto"
           nuxt
           link
           :to="`edit/${$route.params.id}`"
         >
           <v-icon left> mdi-pencil </v-icon> Edit
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
      <v-row v-else class="justify-center">
        <v-col
          cols="12"
          md="12"
        >
          <template>
            <v-card>
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  class="pl-10"
                >
                  <div>Official photo</div>
                  <v-avatar
                    class="profile"
                    color="grey"
                    size="220"
                    tile
                  >
                    <img :src="photoSrc" alt="">
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="9">
                  <v-card-title>{{ official.firstname }} {{ official.lastname }}</v-card-title>
                  <v-card-subtitle>Fullname</v-card-subtitle>

                  <v-card-title>{{ official.position }}</v-card-title>
                  <v-card-subtitle>Position</v-card-subtitle>

                  <v-card-title>{{ official.birthdate }}</v-card-title>
                  <v-card-subtitle>Birth date</v-card-subtitle>

                  <v-card-title>{{ official.gender }}</v-card-title>
                  <v-card-subtitle>Gender</v-card-subtitle>

                  <v-card-title v-if="official.email" class="pt-0">{{ official.email }}</v-card-title>
                  <v-card-subtitle v-if="official.email">Email address</v-card-subtitle>

                  <v-card-title class="pt-0">{{ official.phone }}</v-card-title>
                  <v-card-subtitle>Phone number</v-card-subtitle>
                </v-col>
              </v-row>

            </v-card>
          </template>
        </v-col>
      </v-row>
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

    async fetch() {
      await this.fetchSingleOfficial(this.$route.params.id)
    },
    fetchOnServer: false,

  	data(){
  		return {
        photoSrc: '',
        official: {}
  		}
  	},
    methods: {
      async fetchSingleOfficial(id) {
        await this.$api.post(`singleOfficial/${id}`).then((res) => {
          let official = res.data;
          this.official = official
          this.photoSrc = `${this.$config.laraURL}/officials/${official.photo && official.photo != 'null'?official.photo:'nopreview.png'}`
        })
      },
    }


  }
</script>