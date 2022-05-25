<template>
  <div>
    <v-container>
      <div class="d-flex align-center">
        <h2 class="mt-2 ml-4">Add official</h2>
      </div>
      <v-card class="mt-5 mb-10">
        <v-card-text>
          <v-form
              ref="form"
            >
            <div class="legend-ttl">
              <v-container>
                <v-row>
                  <v-col align-self="start"cols="12"md="3">
                    <div class="font-weight-bold">Official photo</div>
                    <v-avatar
                      class="profile"
                      color="grey"
                      size="220"
                      tile
                    >
                      <img id="preview" :src="`${$config.laraURL}/accounts/nopreview.png`" alt="">
                    </v-avatar>

                    <div class="d-flex justify-center mt-5">
                      <v-btn
                        color="primary"
                        dark
                        small
                        min-width="100"
                        :loading="isSelecting"
                        @click="handleFileImport"> {{ photoText }}
                      </v-btn>
                      <input
                          ref="uploader"
                          id="profile"
                          class="d-none"
                          type="file"
                          accept="image/*"
                          @change="onFileChanged"
                      >
                    </div>
                  </v-col>
                  <v-col cols="12"md="9">
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="official.firstname"
                          label="Firstname"
                          :error-messages="firstnameErrors"
                          hide-details="auto"
                          required
                          @input="[$v.official.firstname.$touch()]"
                          @blur="[$v.official.firstname.$touch()]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="official.middlename"
                          label="Middlename"
                          :error-messages="middlenameErrors"
                          hide-details="auto"
                          required
                          @input="[$v.official.middlename.$touch()]"
                          @blur="[$v.official.middlename.$touch()]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="official.lastname"
                          label="Lastname"
                          :error-messages="lastnameErrors"
                          hide-details="auto"
                          required
                          @input="[$v.official.lastname.$touch()]"
                          @blur="[$v.official.lastname.$touch()]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="official.gender"
                          :items="['Male', 'Female']"
                          label="Gender"
                          mandatory
                          hide-details
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-dialog
                           ref="birthday"
                           v-model="birthdate"
                           :return-value.sync="official.bdate"
                           persistent
                           width="290px"
                         >
                           <template v-slot:activator="{ on, attrs }">
                             <v-text-field
                               v-model="official.bdate"
                               label="Birthdate"
                               prepend-icon="mdi-calendar"
                               readonly
                               v-bind="attrs"
                               v-on="on"
                               :error-messages="bdateErrors"
                               hide-details="auto"
                               required
                               @input="[$v.official.bdate.$touch()]"
                               @blur="[$v.official.bdate.$touch()]"
                             ></v-text-field>
                           </template>
                           <v-date-picker
                             v-model="official.bdate"
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
                               @click="$refs.birthday.save(official.bdate)"
                             >
                               OK
                             </v-btn>
                           </v-date-picker>
                         </v-dialog>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="official.position"
                          :items="['Barangay Captain', 'Kagawad', 'Secretary']"
                          label="Position"
                          :error-messages="positionErrors"
                          hide-details="auto"
                          required
                          @input="[$v.official.position.$touch()]"
                          @blur="[$v.official.position.$touch()]"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="official.phone"
                          label="Phone number"
                          :error-messages="phoneErrors"
                          hide-details="auto"
                          required
                          @input="[$v.official.phone.$touch()]"
                          @blur="[$v.official.phone.$touch()]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="official.email"
                          label="Email"
                          :error-messages="emailErrors"
                          @input="[$v.official.email.$touch()]"
                          @blur="[$v.official.email.$touch()]"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>

                  <!-- <v-col align-self="start"cols="12"md="3">
                    <div class="font-weight-bold">Official signature</div>
                    <v-avatar
                      class="profile"
                      color="white"
                      size="220"
                      tile
                    >
                      <img id="previewSignature" :src="`${$config.laraURL}/accounts/nopreview.png`" alt="">
                    </v-avatar>

                    <div class="d-flex justify-center mt-5">
                      <v-btn
                        color="primary"
                        dark
                        small
                        min-width="100"
                        :loading="isSelecting1"
                        @click="handleFileImport1"> {{ photoText1 }}
                      </v-btn>
                      <input
                          ref="uploader1"
                          id="signature"
                          class="d-none"
                          type="file"
                          accept="image/*"
                          @change="onFileChanged1"
                      >
                    </div>
                  </v-col> -->
                </v-row>
              </v-container>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="blue darken-1"
            class="white--text my-5"
            :loading="processing"
            @click="submit"
            min-width="200"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'

  export default {
    middleware: 'access',
    layout: 'withMenus',
    mixins: [validationMixin],
    components: { },
    validations: {
      official: {
        firstname: { required },
        middlename: { required },
        lastname: { required },
        bdate: { required },
        position: { required },
        phone: { required },
        email: { email }
      }
    },

    data(){
      return {
        processing: false,
        nrDialog: false,
        birthdate: false,
        isSelecting: false,
        isSelecting1: false,
        photoText: 'Choose image',
        photoText1: 'Choose image',
        official: {
          firstname : '',
          middlename : '',
          lastname : '',
          bdate : '',
          phone : '',
          position : '',
          email : '',
          gender: 'Male'
        }
      }

    },

    computed: {
      firstnameErrors () {
        const errors = []
        if (!this.$v.official.firstname.$dirty) return errors
        !this.$v.official.firstname.required && errors.push('Firstname is required')
        return errors
      },
      middlenameErrors () {
        const errors = []
        if (!this.$v.official.middlename.$dirty) return errors
        !this.$v.official.middlename.required && errors.push('Middlename is required')
        return errors
      },
      lastnameErrors () {
        const errors = []
        if (!this.$v.official.lastname.$dirty) return errors
        !this.$v.official.lastname.required && errors.push('Lastname is required')
        return errors
      },
      positionErrors () {
        const errors = []
        if (!this.$v.official.position.$dirty) return errors
        !this.$v.official.position.required && errors.push('Position is required')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.official.phone.$dirty) return errors
        !this.$v.official.phone.required && errors.push('Phone is required')
        return errors
      },
      bdateErrors () {
        const errors = []
        if (!this.$v.official.bdate.$dirty) return errors
        !this.$v.official.bdate.required && errors.push('Birth date is required')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.official.email.$dirty) return errors
        !this.$v.official.email.email && errors.push('Email should be valid')
        return errors
      },
    },
    methods: {
      async submit() {
        this.$v.$touch();
        if(!this.$v.$invalid) {
          this.processing = true

          let formData = new FormData();
          let imageFile = document.getElementById('profile').files
          // let signatureFile = document.getElementById('signature').files
          if(imageFile.length != 0) { formData.append('file', document.getElementById('profile').files[0]) }
          // if(signatureFile.length != 0) { formData.append('signatureFile', document.getElementById('signature').files[0]) }
          for (let k in this.official) { formData.append(k, this.official[k]) }

          await this.$store.dispatch('admin/newOfficial', formData)
          this.processing = false
        }
      },
      handleFileImport() {
        this.isSelecting = true;
        window.addEventListener('focus', () => {
            this.isSelecting = false
        }, { once: true });

        this.$refs.uploader.click();
      },
      handleFileImport1() {
        this.isSelecting1 = true;
        window.addEventListener('focus', () => {
            this.isSelecting1 = false
        }, { once: true });

        this.$refs.uploader1.click();
      },
      async onFileChanged(e) {
        if(e.target.files.length > 0) {
          let reader = new FileReader()
          reader.onload = function (e) {
            document.getElementById('preview').src = e.target.result
          }
          reader.readAsDataURL(e.target.files[0]);
        }

        let imageFile = document.getElementById('profile').files
        if(imageFile.length != 0) {
          this.photoText = 'Change image'
        }else{
          this.photoText = 'Choose image'
          document.getElementById('preview').src = `${this.$config.laraURL}/accounts/nopreview.png`
        }
      },
      async onFileChanged1(e) {
        if(e.target.files.length > 0) {
          let reader = new FileReader()
          reader.onload = function (e) {
            document.getElementById('previewSignature').src = e.target.result
          }
          reader.readAsDataURL(e.target.files[0]);
        }

        let imageFile = document.getElementById('signature').files
        if(imageFile.length != 0) {
          this.photoText1 = 'Change image'
        }else{
          this.photoText1 = 'Choose image'
          document.getElementById('previewSignature').src = `${this.$config.laraURL}/accounts/nopreview.png`
        }
      },
    }
  }
</script>