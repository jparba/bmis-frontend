<template>
  <div>
    <navigation />
    <v-container>
      <v-row>
        <v-row>
          <v-col cols="12" md="3">
            <dash-menu />
          </v-col>
          <v-col cols="12" md="9">
            <div class="box_wrap">
              <v-card min-height="390">
                <h2>Request</h2>
                <v-sheet
                  class="pa-6 mt-5"
                  color="grey lighten-4"
                  v-show="services"
                >
                  <h3 class="mb-3">Choose type Request</h3>
                  <div class="d-flex">
                    <v-dialog
                      v-model="bCertificate"
                      max-width="100%"
                      width="600px"
                      persistent
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-sheet
                          rounded
                          height="120"
                          width="120"
                          class="d-flex justify-center align-center mr-4"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <div class="text-center">Barangay Certificate</div>
                        </v-sheet>
                      </template>
                      <template>
                        <v-stepper v-model="e1">
                          <v-stepper-header>
                            <v-stepper-step
                              :complete="e1 > 1"
                              step="1"
                            >
                              Attach Cedula
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                              :complete="e1 > 2"
                              step="2"
                            >
                              Check Information
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="3">
                              Done
                            </v-stepper-step>
                          </v-stepper-header>

                          <v-stepper-items>
                            <v-stepper-content step="1">
                              <v-row class="mb-10">
                                <v-col
                                  align-self="start"
                                  cols="12"
                                  md="4"
                                >
                                  <v-avatar
                                    class="profile"
                                    color="grey"
                                    size="175"
                                    tile
                                  >
                                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                                  </v-avatar>
                                </v-col>
                                <v-col
                                  align-self="end"
                                  cols="12"
                                  md="8"
                                >
                                  <div>
                                    <v-btn
                                      color="primary"
                                      dark
                                      small
                                      min-width="100"
                                      > Choose a file
                                    </v-btn>
                                    <small class="d-block mt-3">Acceptable formats .jpg, .png only <br>Max file size is 500 kb and min size 70 kb.</small>
                                  </div>
                                </v-col>
                              </v-row>

                              <div class="d-flex justify-end">
                                <v-btn
                                  color="primary"
                                  @click="e1 = 2"
                                >
                                  Continue
                                </v-btn>

                                <v-btn
                                  color="error"
                                  class="ml-3"
                                  @click.prevent="bCertificate = false"
                                >
                                  Cancel
                                </v-btn>
                              </div>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                              <v-card
                                class="mb-12"
                                color="grey lighten-1"
                                height="200px"
                              ></v-card>

                              <div class="d-flex justify-end">
                                <v-btn
                                  color="primary"
                                  @click="e1 = 3"
                                >
                                  Continue
                                </v-btn>

                                <v-btn
                                  color="error"
                                  class="ml-3"
                                  @click.prevent="bCertificate = false"
                                >
                                  Cancel
                                </v-btn>
                              </div>
                            </v-stepper-content>

                            <v-stepper-content step="3">
                              <v-card
                                class="mb-12"
                                color="grey lighten-1"
                                height="200px"
                              ></v-card>

                              <div class="d-flex justify-end">
                                <v-btn
                                  color="primary"
                                  @click="e1 = 1"
                                >
                                  Continue
                                </v-btn>

                                <v-btn
                                  color="error"
                                  class="ml-3"
                                  @click.prevent="bCertificate = false"
                                >
                                  Cancel
                                </v-btn>
                              </div>
                            </v-stepper-content>
                          </v-stepper-items>
                        </v-stepper>
                      </template>
                    </v-dialog>

                    <v-sheet
                      rounded
                      height="120"
                      width="120"
                      class="d-flex justify-center align-center mr-3"
                    >
                      <div class="text-center">Certificate of Indigency</div>
                    </v-sheet>

                    <v-sheet
                      rounded
                      height="120"
                      width="120"
                      class="d-flex justify-center align-center mr-4"
                    >
                      <div class="text-center">Cedula</div>
                    </v-sheet>
                  </div>
                </v-sheet>

                <template>
                  <v-data-table
                    :headers="headers"
                    :items="request"
                    sort-by="date"
                    class="elevation-1 mt-5"
                  >
                    <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title>List of request</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn
                          v-show="!services"
                          color="primary"
                          dark
                          class="mb-2"
                          @click.prevent="services = !services"
                        >
                          Add new
                        </v-btn>
                      </v-toolbar>
                    </template>

                    <template v-slot:item.status="{ item }">
                      <v-chip
                        :color="getColor(item.status)"
                        dark
                      >
                        {{ item.status }}
                      </v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        small
                        class="mr-2"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon
                        small
                      >
                        mdi-delete
                      </v-icon>
                    </template>
                    <template v-slot:no-data>
                      <div class="text-center">No data found</div>
                    </template>
                  </v-data-table>
                </template>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import Navigation from '~/components/DashNavigation.vue'
import DashMenu from '~/components/DashMenu.vue'

export default {
  middleware: 'access',
  layout: 'clean',
  mixins: [validationMixin],
  components: {
    Navigation,
    DashMenu
  },

  validations: {
    formData: {
      username: { required },
      email: { required, email },
      password: { required },
    }
  },

  data() {
    return {
      e1: 1,
      bCertificate: false,
      services: false,
      formData: {
        username: '',
        email: '',
        password: '',
      },

      headers: [
        {
          text: 'Type',
          align: 'start',
          sortable: false,
          value: 'type',
        },
        { text: 'Status', value: 'status' },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      request: [],
    }
  },

  computed: {
    usernameErrors () {
      const errors = []
      if (!this.$v.formData.username.$dirty) return errors
      !this.$v.formData.username.required && errors.push('Username is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.email && errors.push('Must be valid e-mail')
      !this.$v.formData.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.formData.password.$dirty) return errors
      !this.$v.formData.password.required && errors.push('Password is required')
      return errors
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.request = [
        {
          type: 'Barangay certificate',
          status: 'pending',
          date: '01-05-21',
        },
        {
          type: 'Cedula',
          status: 'rejected',
          date: '01-05-22',
        },
        {
          type: 'Certificate of Indigency',
          status: 'approved',
          date: '01-05-23',
        },
      ]
    },
    getColor (status) {
      if (status == 'rejected') return 'red'
      else if (status == 'pending') return 'orange'
      else return 'green'
    },
  },
}
</script>

<style lang="scss">
</style>
