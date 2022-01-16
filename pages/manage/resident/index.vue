<template>
	<div>
		<v-container>
      <div class="d-flex align-center">
        <h2 class="mt-2 ml-4">Resident list</h2>
        <v-btn rounded
          color="primary"
          class="ml-auto"
          @click.stop="nrDialog = true"
        >
          <v-icon left> mdi-plus </v-icon> Add new
        </v-btn>
      </div>

      <ul class="resident-list">
        <li v-for="(rl, k) in residentLists" :key="k" to="/">
          <nuxt-link to="/resident/id">
            <v-card
                class="mx-auto"
                max-width="100%"
                outlined
              >
              <div class="d-flex align-center">
                <v-avatar size="80">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  >
                </v-avatar>
                <div class="ml-2">
                  <div>{{ rl.name }}</div>
                  <div>Resident ID:{{ rl.id }}</div>
                </div>
              </div>
              </v-card>
          </nuxt-link>
          </li>
      </ul>

      <template>
        <v-row justify="center">
          <v-dialog
            v-model="nrDialog"
            persistent
            max-width="850px"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">Resident Profile</span>
              </v-card-title>
              <v-card-text>
                <v-form
                    ref="form"
                  >
                  <div class="legend-ttl">
                    <h5>Basic Information</h5>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="First_name"
                            hide-details
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Middle name"
                            hide-details
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Last name"
                            hide-details
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-select
                            :items="['Male', 'Female']"
                            label="Gender"
                            hide-details
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-dialog
                             ref="birthday"
                             v-model="birthdate"
                             :return-value.sync="date"
                             persistent
                             width="290px"
                           >
                             <template v-slot:activator="{ on, attrs }">
                               <v-text-field
                                 v-model="date"
                                 label="Birthdate"
                                 prepend-icon="mdi-calendar"
                                 readonly
                                 v-bind="attrs"
                                 v-on="on"
                               ></v-text-field>
                             </template>
                             <v-date-picker
                               v-model="date"
                               scrollable
                             >
                               <v-spacer></v-spacer>
                               <v-btn
                                 text
                                 color="primary"
                                 @click="birthdate = false"
                               >
                                 Cancel
                               </v-btn>
                               <v-btn
                                 text
                                 color="primary"
                                 @click="$refs.birthday.save(date)"
                               >
                                 OK
                               </v-btn>
                             </v-date-picker>
                           </v-dialog>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                  <div class="legend-ttl">
                    <h5>Contacts</h5>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            label="Phone number"
                            hide-details
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            label="Email"
                            hide-details
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                  <div class="legend-ttl">
                    <h5>Address</h5>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-autocomplete
                            :items="['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6']"
                            label="Purok"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            label="Street"
                            hide-details
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </v-form>
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
        date: '',
        nrDialog: false,
        birthdate: false,
        residentLists: [
          {
            id: 'RL0023',
            name: 'name1'
          },
          {
            id: 'RL0023',
            name: 'name2'
          }
        ]
  		}
  	},
  	methods: {
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