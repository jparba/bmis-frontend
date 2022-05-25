<template>
  <div>
    <navigation />
    <v-container class="mt-5">
      <v-row>
        <v-row>
          <v-col cols="12" md="3">
            <dash-menu />
          </v-col>
          <v-col cols="12" md="9">
            <div class="box_wrap">
              <v-card min-height="390">
                <h2>Request</h2>
                <template>
                  <v-data-table
                    :headers="headers"
                    :items="request"
                    :loading="$fetchState.pending"
                    loading-text="Fetching list of requests"
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
                          color="primary"
                          dark
                          class="mb-2"
                          @click.prevent="[ services = true ]"
                        >
                          Add new
                        </v-btn>
                      </v-toolbar>
                    </template>

                    <template v-slot:item.type="{ item }">
                      <div v-text="getType(item.type)"></div>
                    </template>

                    <template v-slot:item.status="{ item }">
                      <v-chip
                        :color="getColor(item.status)"
                        small
                        dark
                      >
                        {{ getStatus(item.status) }}
                      </v-chip>
                    </template>

                    <template v-slot:item.actions="{ item, index }">
                      <v-btn
                        outlined
                        small
                        color="error"
                        :disabled="item.status != 1"
                        @click.prevent="cancelRequest(item.id, index)"
                      >
                        Cancel
                      </v-btn>
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

    <v-dialog
      v-model="checkProfile"
      max-width="290"
      persistent
    >
      <v-card>
        <v-card-text>
          <h3 class="pt-4">Please update your information before making requests.</h3>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            to="/resident"
          >
            Update Information
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="services"
      max-width="800"
      persistent
    >
      <v-card>
        <v-sheet
          class="pa-6 mt-5"
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
                  class="d-flex justify-center align-center mr-4 border-hover"
                  v-bind="attrs"
                  v-on="on"
                >
                  <div class="text-center">Barangay residency</div>
                </v-sheet>
              </template>
              <template>
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step
                      :complete="e1 > 1"
                      step="1"
                    >
                      Requirement
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                      :complete="e1 > 2"
                      step="2"
                    >
                      Confirm request
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
                          md="12"
                        >
                           <p class="text-center">In order for you to get a barangay residency a latest cedula is required, you can attach it. In case you dont have a latest cedula you can request it together with the barangay residency.</p>
                           <div class="d-flex justify-center">
                             <v-radio-group
                               v-model="formData.type"
                               row
                               @change="radioChange"
                             >
                               <v-radio
                                 label="Attach cedula"
                                 value="1"
                               ></v-radio>
                               <v-radio
                                 label="Request cedula"
                                 value="2"
                               ></v-radio>
                             </v-radio-group>
                           </div>
                           <div v-if="formData.type == 1" class="d-flex flex-column align-center">
                            <v-avatar
                              class="cedula"
                              color="grey"
                              size="150"
                              tile
                            >
                              <img id="preview" src="http://localhost:8000/accounts/no-image.jpg" alt="">
                            </v-avatar>
                            <v-btn
                              id="uploadBtn"
                              small
                              color="success"
                              class="mt-3"
                              :loading="isSelecting"
                              @click="handleFileImport"
                            > Choose a file
                            </v-btn>
                            <input
                                ref="uploader"
                                id="cedula"
                                class="d-none"
                                type="file"
                                accept="image/*"
                                @change="onFileChanged"
                            >
                           </div>
                        </v-col>
                      </v-row>

                      <div class="d-flex justify-end">
                        <v-btn
                          color="primary"
                          @click="e1 = 2"
                          :disabled="cedulaBtnDisable"
                          text
                        >
                          Continue
                        </v-btn>

                        <v-btn
                          color="error"
                          class="ml-3"
                          text
                          @click.prevent="bCertificate = false"
                        >
                          Cancel
                        </v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-card
                        class="mb-12 d-flex justify-center align-center"
                        min-height="200px"
                      >
                        <p v-if="formData.type == 1">{{ $auth.user.firstname }} {{ $auth.user.lastname }} your request was barangay residency only</p>
                        <p v-else-if="formData.type == 2">{{ $auth.user.firstname }} {{ $auth.user.lastname }} your request was barangay residency with cedula</p>
                      </v-card>

                      <div class="d-flex justify-end">
                        <v-btn
                          color="default"
                          :disabled="processing"
                          text
                          @click="e1 = 1"
                        >
                          back
                        </v-btn>
                        <v-btn
                          color="primary"
                          :loading="processing"
                          class="ml-3"
                          text
                          @click="submitRequest"
                        >
                          confirm
                        </v-btn>

                        <v-btn
                          color="error"
                          class="ml-3"
                          :disabled="processing"
                          text
                          @click.prevent="bCertificate = false"
                        >
                          Cancel
                        </v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-card
                        class="mb-12 d-flex justify-center align-center"
                        min-height="200px"
                      >
                        <p v-if="requestSuccess" class="text-center">Your request has been sent. <br> Please wait for confirmation from barangay.</p>
                        <p v-else>Your request was failed. Please try again.</p>
                      </v-card>

                      <div class="d-flex justify-end">
                        <v-btn
                          color="primary"
                          class="ml-3"
                          text
                          @click.prevent="[bCertificate = false, e1 = 1, services = false, clearData()]"
                        >
                          Ok
                        </v-btn>
                      </div>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </template>
            </v-dialog>

            <v-dialog
              v-model="iCertificate"
              persistent
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-sheet
                  rounded
                  height="120"
                  width="120"
                  class="d-flex justify-center align-center mr-3 border-hover"
                  v-bind="attrs"
                  v-on="on"
                >
                  <div class="text-center">Certificate of Indigency</div>
                </v-sheet>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Request Confirmation
                </v-card-title>
                <v-card-text>
                  <h3>Please confirm that you need to request a <span class="font-weight-bold">Certificate of indigency</span></h3></v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error"
                    :disabled="processing"
                    text
                    @click="iCertificate = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    :loading="processing"
                    @click="[formData.type = 4, submitRequest()]"
                  >
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="dCedula"
              persistent
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-sheet
                  rounded
                  height="120"
                  width="120"
                  class="d-flex justify-center align-center mr-3 border-hover"
                  v-bind="attrs"
                  v-on="on"
                >
                  <div class="text-center">Cedula</div>
                </v-sheet>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Request Confirmation
                </v-card-title>
                <v-card-text>Please confirm that you need to request a <span class="font-weight-bold">Cedula</span></v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error"
                    :disabled="processing"
                    text
                    @click="dCedula = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    :loading="processing"
                    @click="[formData.type = 3, submitRequest()]"
                  >
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="bClearance"
              max-width="100%"
              width="600px"
              persistent
            >
              <template v-slot:activator="{ on, attrs }">
                <v-sheet
                  rounded
                  height="120"
                  width="120"
                  class="d-flex justify-center align-center mr-4 border-hover"
                  v-bind="attrs"
                  v-on="on"
                >
                  <div class="text-center">Barangay Clearance</div>
                </v-sheet>
              </template>
              <template>
                <v-stepper v-model="e1">
                  <v-stepper-header>
                    <v-stepper-step
                      :complete="e1 > 1"
                      step="1"
                    >
                      Requirement
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                      :complete="e1 > 2"
                      step="2"
                    >
                      Confirm request
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
                          md="12"
                        >
                           <p class="text-center">In order for you to get a barangay clearance a latest cedula is required, you can attach it. In case you dont have a latest cedula you can request it together with the barangay clearance.</p>
                           <v-text-field
                             v-model="formData.purpose"
                             id="purpose"
                             label="Purpose"
                             placeholder="What is the purpose?"
                             outlined
                             hide-details
                           ></v-text-field>
                           <div class="d-flex justify-center">
                             <v-radio-group
                               v-model="formData.type"
                               row
                               @change="radioChange"
                             >
                               <v-radio
                                 label="Attach cedula"
                                 value="5"
                               ></v-radio>
                               <v-radio
                                 label="Request cedula"
                                 value="6"
                               ></v-radio>
                             </v-radio-group>
                           </div>
                           <div v-if="formData.type == 5" class="d-flex flex-column align-center">
                            <v-avatar
                              class="cedula"
                              color="grey"
                              size="150"
                              tile
                            >
                              <img id="preview" src="http://localhost:8000/accounts/no-image.jpg" alt="">
                            </v-avatar>
                            <v-btn
                              id="uploadBtn"
                              small
                              color="success"
                              class="mt-3"
                              :loading="isSelecting"
                              @click="handleFileImport"
                            > Choose a file
                            </v-btn>
                            <input
                                ref="uploader"
                                id="cedula"
                                class="d-none"
                                type="file"
                                accept="image/*"
                                @change="onFileChanged"
                            >
                           </div>
                        </v-col>
                      </v-row>

                      <div class="d-flex justify-end">
                        <v-btn
                          color="primary"
                          @click="e1 = 2"
                          :disabled="cedulaBtnDisable"
                          text
                        >
                          Continue
                        </v-btn>

                        <v-btn
                          color="error"
                          class="ml-3"
                          text
                          @click.prevent="bClearance = false"
                        >
                          Cancel
                        </v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-card
                        class="mb-12 d-flex justify-center align-center"
                        min-height="200px"
                      >
                        <p v-if="formData.type == 5">{{ $auth.user.firstname }} {{ $auth.user.lastname }} your request was barangay clearance only</p>
                        <p v-else-if="formData.type == 6">{{ $auth.user.firstname }} {{ $auth.user.lastname }} your request was barangay clearance with cedula</p>
                      </v-card>

                      <div class="d-flex justify-end">
                        <v-btn
                          color="default"
                          :disabled="processing"
                          text
                          @click="e1 = 1"
                        >
                          back
                        </v-btn>
                        <v-btn
                          color="primary"
                          :loading="processing"
                          class="ml-3"
                          text
                          @click="submitRequest"
                        >
                          confirm
                        </v-btn>

                        <v-btn
                          color="error"
                          class="ml-3"
                          :disabled="processing"
                          text
                          @click.prevent="bClearance = false"
                        >
                          Cancel
                        </v-btn>
                      </div>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-card
                        class="mb-12 d-flex justify-center align-center"
                        min-height="200px"
                      >
                        <p v-if="requestSuccess" class="text-center">Your request has been sent. <br> Please wait for confirmation from barangay.</p>
                        <p v-else>Your request was failed. Please try again.</p>
                      </v-card>

                      <div class="d-flex justify-end">
                        <v-btn
                          color="primary"
                          class="ml-3"
                          text
                          @click.prevent="[bClearance = false, e1 = 1, services = false, clearData()]"
                        >
                          Ok
                        </v-btn>
                      </div>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </template>
            </v-dialog>
          </div>
        </v-sheet>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click.prevent="services = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  },

  data() {
    return {
      e1: 1,
      services: false,
      isSelecting: false,
      processing: false,
      bCertificate: false,
      bClearance: false,
      iCertificate: false,
      dCedula: false,
      requestSuccess: false,
      cedulaBtnDisable: true,
      selectedFile: null,
      checkProfile: false,
      formData: {
        type: null,
        purpose: '',
      },
      headers: [
        {
          text: 'Type',
          align: 'start',
          sortable: false,
          value: 'type',
        },
        { text: 'Status', value: 'status' },
        { text: 'Date', value: 'created_at' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      request: [],
    }
  },

  async fetch() {
    await this.fetchRequest()
  },
  fetchOnServer: false,

  methods: {
    async fetchRequest() {
      await this.$api.get('request').then(res => {
        this.checkProfile = !res.data.hasDetail? true : false
        this.request = res.data.data
      })
    },
    async cancelRequest(id, index) {
      await this.$api.patch(`request/${id}`).then((res) => {
        if(res.data.success) {
          this.request[index].status = 4
          this.$toast.global.success(res.data.message)
        }else {
          this.$toast.global.error(res.data.message)
        }
      })
    },
    clearData() {
      this.formData.type = null,
      this.formData.purpose = ''
    },
    getColor(status) {
      if (status == '3') return 'red'
      else if (status == '4') return 'red accent-4'
      else if (status == '1') return 'orange'
      else return 'green'
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return 'Pending'
        break;
        case 2:
          return 'Approved'
        break;
        case 3:
          return 'Rejected'
        break;
        case 4:
          return 'Cancelled'
        break;
      }
    },
    getType(type) {
      switch (type) {
        case 1:
          return 'Barangay residency'
        break;
        case 2:
          return 'Barangay residency with cedula'
        break;
        case 3:
          return 'Cedula'
        break;
        case 4:
          return 'Certificate of indigency'
        break;
        case 5:
          return 'Barangay clearance'
        break;
        case 6:
          return 'Barangay clearance with cedula'
      }
    },
    handleFileImport() {
      this.isSelecting = true;
      window.addEventListener('focus', () => {
          this.isSelecting = false
      }, { once: true });

      this.$refs.uploader.click();
    },
    radioChange(e) {
      if(e == 1 && !this.selectedFile || e == 5 && !this.selectedFile) {
        this.cedulaBtnDisable = true
      }else if(e == 2 || e == 6) {
        this.selectedFile = null
        this.cedulaBtnDisable = false
      }
    },
    onFileChanged(e) {
        if(e.target.files.length > 0) {
          this.selectedFile = e.target.files[0];
          this.cedulaBtnDisable = this.selectedFile? false : true
          document.getElementById('uploadBtn').innerHTML = 'Change photo'
          if(e.target.files.length > 0) {
            let reader = new FileReader()
            reader.onload = function (e) {
              document.getElementById('preview').src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0]);
          }
        }else{
          this.selectedFile = null
          this.cedulaBtnDisable = true
          document.getElementById('preview').src = 'http://localhost:8000/'
          document.getElementById('uploadBtn').innerHTML = 'Choose a file'
        }
    },
    async submitRequest() {
      this.processing = true
      const formdata = new FormData()
      if(this.formData.type == 1 || this.formData.type == 5) {
        let imageFile = document.getElementById('cedula').files
        if(imageFile.length != 0) {
          formdata.append('file', document.getElementById('cedula').files[0])
        }
      }
      for(const data in this.formData) {
        formdata.append(data, this.formData[data])
      }
      await this.$api.post(`request`, formdata).then((res) => {
        this.processing = false
        if(res.data.success) {
          this.iCertificate = false
          this.dCedula = false
          this.request.unshift(res.data)
          if(this.formData.type >= 3 && this.formData.type != 5 && this.formData.type != 6) {
            this.services = false
            this.$toast.global.success('Request has been sent')
          }else{
            this.e1 = 3
            this.requestSuccess = true
          }
        }else{
          this.iCertificate = false
          this.dCedula = false
          if(this.formData.type >= 3) {
            this.$toast.global.success('Request has been failed')
          }else{
            this.requestSuccess = false
          }
        }
      })
    }
  },
}
</script>

<style lang="scss">
  .border-hover{
    border: 1px solid #6200ea !important;
    &:hover{
      color: #fff;
      background-color: #6200ea !important;
      -webkit-transition: background-color 300ms linear;
      -ms-transition: background-color 300ms linear;
      transition: background-color 300ms linear;
    }
  }
  .services{
    background-image: url(~/assets/img/logo.png);
    background-size: cover;
  }
</style>
