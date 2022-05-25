<template>
	<div>
		<v-container>
      <h2 class="mt-2 mb-5">User Information</h2>
      <v-row v-if="$fetchState.pending">
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
                  class="pl-10 py-8"
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
                  <v-card-title>{{ user.firstname }} {{ user.lastname }}</v-card-title>
                  <v-card-subtitle>Fullname</v-card-subtitle>

                  <v-card-title class="pt-0">{{ user.email }}</v-card-title>
                  <v-card-subtitle>Registered email</v-card-subtitle>

                  <v-card-title class="pt-0">{{ user.phone }}</v-card-title>
                  <v-card-subtitle>Registered phone number</v-card-subtitle>

                  <v-card-title class="pt-0">{{ user.created_at }}</v-card-title>
                  <v-card-subtitle>Account created</v-card-subtitle>

                  <v-card-title class="pt-0">
                  {{ status.status }}
                  </v-card-title>
                  <v-card-subtitle>User status</v-card-subtitle>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-title v-if="user.status == 0" class="pb-0">Actions</v-card-title>

                  <v-card-actions>
                    <div class="d-flex">
                      <v-btn
                        v-if="user.status == 0"
                        color="success"
                        min-width="100"
                        :loading="vprocessing"
                        :disabled="dprocessing"
                        class="mr-3"
                        @click="verify($route.params.id, 1)">
                        <v-icon class="mr-1">mdi-check</v-icon>Verify user
                      </v-btn>
                      <v-btn
                        v-if="user.status == 0"
                        color="error"
                        min-width="100"
                        :loading="dprocessing"
                        :disabled="vprocessing"
                        @click="verify($route.params.id, 2)">
                        <v-icon class="mr-1">mdi-close</v-icon>Decline user
                      </v-btn>
                    </div>
                  </v-card-actions>

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

  export default {
    middleware: 'access',
  	layout: 'withMenus',
  	data(){
  		return {
        vprocessing: false,
        dprocessing: false,
        search: '',
        user: {},
        photoSrc: '',
  		}
  	},
    async fetch() {
      await this.fetchSingleUser()
    },
    fetchOnServer: false,
    computed: {
      ...mapGetters({
        userList: 'admin/userList'
      }),
      status() {
        switch(this.user.status) {
          case 0:
            return {status: 'Unverified', color: 'error'}
          break;
          case 1:
            return {status: 'Verified', color: 'success'}
          break;
          case 2:
            return {status: 'Declined', color: 'warning'}
          break;
          case 3:
            return {status: 'Blocked', color: 'default'}
          break;
        }
      }
    },
  	methods: {
      async fetchSingleUser() {
        await this.$api.post(`getSingleUser/${this.$route.params.id}`)
          .then((res) => {
            this.user = res.data
            this.photoSrc = `${this.$config.laraURL}/accounts/${this.user.pic?this.user.pic: 'nopreview.png'}`
          })
      },
      async verify(id, status) {
        status == 1? this.vprocessing = true : this.dprocessing = true
        await this.$store.dispatch('admin/verify', {id, status})
        this.fetchSingleUser();
        status == 1? this.vprocessing = false : this.dprocessing = false
      },
  	},
  }
</script>