<template>
	<div>
		<v-container>
      <div class="d-flex align-center mb-8">
         <h2 class="mt-2">Resident Information</h2>
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
                  <div>Profile photo</div>
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
                  <v-card-title>{{ resident.firstname }} {{ resident.lastname }}</v-card-title>
                  <v-card-subtitle>Fullname</v-card-subtitle>

                  <v-card-title class="pt-0">{{ resident.brgy_id? resident.brgy_id : '(No Barangay ID)' }}</v-card-title>
                  <v-card-subtitle>Barangay ID number</v-card-subtitle>

                  <v-card-title v-if="resident.email" class="pt-0">{{ resident.email }}</v-card-title>
                  <v-card-subtitle v-if="resident.email">Email address</v-card-subtitle>

                  <v-card-title v-if="resident.phone" class="pt-0">{{ resident.phone }}</v-card-title>
                  <v-card-subtitle v-if="resident.phone">Phone number</v-card-subtitle>

                  <v-card-title v-if="resident.tin" class="pt-0">{{ resident.tin }}</v-card-title>
                  <v-card-subtitle v-if="resident.tin">TIN</v-card-subtitle>

                  <v-card-title v-if="resident.sss" class="pt-0">{{ resident.sss }}</v-card-title>
                  <v-card-subtitle v-if="resident.sss">SSS</v-card-subtitle>

                  <v-card-title v-if="resident.pagibig" class="pt-0">{{ resident.pagibig }}</v-card-title>
                  <v-card-subtitle v-if="resident.pagibig">Pagibig</v-card-subtitle>

                  <v-card-title v-if="resident.philhealth" class="pt-0">{{ resident.philhealth }}</v-card-title>
                  <v-card-subtitle v-if="resident.philhealth">Philhealth</v-card-subtitle>

                  <v-card-title class="pt-0">{{ resident.created_at }}</v-card-title>
                  <v-card-subtitle>Registered date</v-card-subtitle>
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
      await this.fetchSingleResident(this.$route.params.id)
    },
    fetchOnServer: false,

  	data(){
  		return {
        photoSrc: '',
        resident: {}
  		}
  	},
    methods: {
      async fetchSingleResident(id) {
        await this.$api.post(`singleResident/${id}`).then((res) => {
          let resident = res.data;
          this.resident = resident
          this.photoSrc = `${this.$config.laraURL}/accounts/${resident.pic && resident.pic != 'null'?resident.pic:'nopreview.png'}`
        })
      },
    }


  }
</script>