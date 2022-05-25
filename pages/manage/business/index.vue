<template>
	<div>
		<v-container>
      <div class="d-flex align-center">
        <h2 class="mt-2 mb-4">Business list</h2>
        <v-btn rounded
          color="primary"
          class="ml-auto"
          @click.stop="nrDialog = true"
        >
          <v-icon left> mdi-plus </v-icon> Add new
        </v-btn>
      </div>
      <v-row>
        <v-col
          v-for="card in cards"
          :key="card.title"
          cols="6"
        >
          <nuxt-link to="/business/id">
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-row>

      <template>
        <v-row justify="center">
          <v-dialog
            v-model="nrDialog"
            persistent
            max-width="850px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">Business Profile</span>
              </v-card-title>
              <v-card-text>
                <div class="legend-ttl">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Business name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          :items="['Store', 'Bakeshop']"
                          label="Business type"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
                <div class="legend-ttl">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Owner"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Phone number"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
                <div class="legend-ttl">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-autocomplete
                          :items="['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6']"
                          label="Purok location"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="nrDialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="nrDialog = false"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-container>
	</div>
</template>

<script>
  export default {
    middleware: 'access',
  	layout: 'withMenus',
  	components: { },
  	data(){
  		return {
        nrDialog: false,
        cards: [
          { title: 'Crispy chicken restaurant', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'},
          { title: 'Country fried chicken', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'},
          { title: 'Palawan pawnshop', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'},
        ],
  		}
  	},
  	methods: {
  	},
  }
</script>

<style lang="scss">
</style>