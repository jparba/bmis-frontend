<template>
	<div>
		<v-container>
      <div class="d-flex align-center">
        <h2 class="mt-2">Edit resident information</h2>
        <v-btn rounded
          color="primary"
          class="ml-auto"
          nuxt
          link
          to="/manage/resident"
        >
          <v-icon left> mdi-chevron-left </v-icon> Back
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
        <v-card class="mt-5 mb-10">
          <v-card-text>
            <v-form
                ref="form"
              >
              <div class="legend-ttl">
                <h5>Basic Information</h5>
                <v-container>
                  <v-row>
                    <v-col align-self="start"cols="12"md="3">
                      <v-avatar
                        class="profile"
                        color="grey"
                        size="220"
                        tile
                      >
                        <img id="preview" :src="photoSrc" alt="">
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
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="residentData.firstname"
                            label="Firstname"
                            :error-messages="('firstname' in validationErrorList) ? validationErrorList['firstname'] : firstnameErrors"
                            hide-details="auto"
                            required
                            @input="[$v.residentData.firstname.$touch(), removeValidation(['firstname'])]"
                            @blur="[$v.residentData.firstname.$touch(), removeValidation(['firstname'])]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="residentData.middlename"
                            label="Middlename"
                            :error-messages="('middlename' in validationErrorList) ? validationErrorList['middlename'] : middlenameErrors"
                            hide-details="auto"
                            required
                            @input="[$v.residentData.middlename.$touch(), removeValidation(['middlename'])]"
                            @blur="[$v.residentData.middlename.$touch(), removeValidation(['middlename'])]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="residentData.lastname"
                            label="Lastname"
                            :error-messages="('lastname' in validationErrorList) ? validationErrorList['lastname'] : lastnameErrors"
                            hide-details="auto"
                            required
                            @input="[$v.residentData.lastname.$touch(), removeValidation(['lastname'])]"
                            @blur="[$v.residentData.lastname.$touch(), removeValidation(['lastname'])]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="3">
                          <v-select
                            v-model="residentData.gender"
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
                             :return-value.sync="residentData.bdate"
                             persistent
                             width="290px"
                           >
                             <template v-slot:activator="{ on, attrs }">
                               <v-text-field
                                 v-model="residentData.bdate"
                                 label="Birthdate"
                                 prepend-icon="mdi-calendar"
                                 readonly
                                 v-bind="attrs"
                                 v-on="on"
                                 :error-messages="('bdate' in validationErrorList) ? validationErrorList['bdate'] : bdateErrors"
                                 hide-details="auto"
                                 required
                                 @input="[$v.residentData.bdate.$touch(), removeValidation(['bdate'])]"
                                 @blur="[$v.residentData.bdate.$touch(), removeValidation(['bdate'])]"
                               ></v-text-field>
                             </template>
                             <v-date-picker
                               v-model="residentData.bdate"
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
                                 @click="$refs.birthday.save(residentData.bdate)"
                               >
                                 OK
                               </v-btn>
                             </v-date-picker>
                           </v-dialog>
                        </v-col>
                        <v-col cols="12" sm="6" md="5">
                          <v-text-field
                            v-model="residentData.pob"
                            label="Place of birth"
                            :error-messages="('pob' in validationErrorList) ? validationErrorList['pob'] : pobErrors"
                            hide-details="auto"
                            required
                            @input="[$v.residentData.pob.$touch(), removeValidation(['pob'])]"
                            @blur="[$v.residentData.pob.$touch(), removeValidation(['pob'])]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="2">
                          <v-text-field
                            v-model="residentData.weight"
                            label="Weight"
                            :error-messages="('weight' in validationErrorList) ? validationErrorList['weight'] : weightErrors"
                            hide-details="auto"
                            required
                            @input="[$v.residentData.weight.$touch(), removeValidation(['weight'])]"
                            @blur="[$v.residentData.weight.$touch(), removeValidation(['weight'])]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="2">
                          <v-text-field
                            v-model="residentData.height"
                            label="Height"
                            :error-messages="('height' in validationErrorList) ? validationErrorList['height'] : heightErrors"
                            hide-details="auto"
                            required
                            @input="[$v.residentData.height.$touch(), removeValidation(['height'])]"
                            @blur="[$v.residentData.height.$touch(), removeValidation(['height'])]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="2">
                          <v-text-field
                            v-model="residentData.bloodtype"
                            label="Blood type"
                            :error-messages="('bloodtype' in validationErrorList) ? validationErrorList['bloodtype'] : bloodtypeErrors"
                            hide-details="auto"
                            required
                            @input="[$v.residentData.bloodtype.$touch(), removeValidation(['bloodtype'])]"
                            @blur="[$v.residentData.bloodtype.$touch(), removeValidation(['bloodtype'])]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="2">
                          <v-select
                            v-model="residentData.civilstatus"
                            :items="['Single', 'Married', 'Widowed', 'Separated']"
                            label="Civil status"
                            hide-details
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="residentData.spouse"
                            label="Spouse name"
                            hide-details
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="residentData.religion"
                            label="Religion"
                            :error-messages="('religion' in validationErrorList) ? validationErrorList['religion'] : religionErrors"
                            hide-details="auto"
                            required
                            @input="[$v.residentData.religion.$touch(), removeValidation(['religion'])]"
                            @blur="[$v.residentData.religion.$touch(), removeValidation(['religion'])]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="residentData.occupation"
                            label="Occupation"
                            :error-messages="('occupation' in validationErrorList) ? validationErrorList['occupation'] : occupationErrors"
                            hide-details="auto"
                            required
                            @input="[$v.residentData.occupation.$touch(), removeValidation(['occupation'])]"
                            @blur="[$v.residentData.occupation.$touch(), removeValidation(['occupation'])]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="residentData.household"
                            label="Attach Household"
                            hide-details
                          ></v-text-field>
                        </v-col>
                      </v-row>
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
                        v-model="residentData.phone"
                        label="Phone number"
                        :error-messages="('phone' in validationErrorList) ? validationErrorList['phone'] : phoneErrors"
                        hide-details="auto"
                        required
                        @input="[$v.residentData.phone.$touch(), removeValidation(['phone'])]"
                        @blur="[$v.residentData.phone.$touch(), removeValidation(['phone'])]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="residentData.email"
                        label="Email"
                        :error-messages="('email' in validationErrorList) ? validationErrorList['email'] : emailErrors"
                        hide-details="auto"
                        required
                        @input="[$v.residentData.email.$touch(), removeValidation(['email'])]"
                        @blur="[$v.residentData.email.$touch(), removeValidation(['email'])]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
              <div class="legend-ttl">
                <h5>Current address</h5>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="2">
                      <v-autocomplete
                        v-model="residentData.cpurok"
                        :items="['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6']"
                        label="Purok"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                        <v-text-field
                        v-model="residentData.cstreet"
                        label="Street"
                        :error-messages="('cstreet' in validationErrorList) ? validationErrorList['cstreet'] : cstreetErrors"
                        hide-details="auto"
                        required
                        @input="[$v.residentData.cstreet.$touch(), removeValidation(['cstreet'])]"
                        @blur="[$v.residentData.cstreet.$touch(), removeValidation(['cstreet'])]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="residentData.ccity"
                        label="City / Municipality"
                        :error-messages="('ccity' in validationErrorList) ? validationErrorList['ccity'] : ccityErrors"
                        hide-details="auto"
                        required
                        @input="[$v.residentData.ccity.$touch(), removeValidation(['ccity'])]"
                        @blur="[$v.residentData.ccity.$touch(), removeValidation(['ccity'])]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="residentData.cprovince"
                        label="Province"
                        :error-messages="('cprovince' in validationErrorList) ? validationErrorList['cprovince'] : cprovinceErrors"
                        hide-details="auto"
                        required
                        @input="[$v.residentData.cprovince.$touch(), removeValidation(['cprovince'])]"
                        @blur="[$v.residentData.cprovince.$touch(), removeValidation(['cprovince'])]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
              <div class="legend-ttl">
                <h5>Pernament address</h5>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="2">
                      <v-autocomplete
                        v-model="residentData.ppurok"
                        :items="['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6']"
                        label="Purok"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="residentData.pstreet"
                        label="Street"
                        :error-messages="('pstreet' in validationErrorList) ? validationErrorList['pstreet'] : pstreetErrors"
                        hide-details="auto"
                        required
                        @input="[$v.residentData.pstreet.$touch(), removeValidation(['pstreet'])]"
                        @blur="[$v.residentData.pstreet.$touch(), removeValidation(['pstreet'])]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="residentData.pcity"
                        label="City / Municipality"
                        :error-messages="('pcity' in validationErrorList) ? validationErrorList['pcity'] : pcityErrors"
                        hide-details="auto"
                        required
                        @input="[$v.residentData.pcity.$touch(), removeValidation(['pcity'])]"
                        @blur="[$v.residentData.pcity.$touch(), removeValidation(['pcity'])]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="residentData.pprovince"
                        label="Province"
                        :error-messages="('pprovince' in validationErrorList) ? validationErrorList['pprovince'] : pprovinceErrors"
                        hide-details="auto"
                        required
                        @input="[$v.residentData.pprovince.$touch(), removeValidation(['pprovince'])]"
                        @blur="[$v.residentData.pprovince.$touch(), removeValidation(['pprovince'])]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
              <div class="legend-ttl">
                <h5>Government ID number</h5>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="residentData.brgyID"
                        label="Barangay ID"
                        readonly
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="residentData.tin"
                        label="TIN"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="residentData.pagibig"
                        label="Pag-ibig"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="residentData.sss"
                        label="SSS"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="residentData.philhealth"
                        label="Philhealth"
                        hide-details
                      ></v-text-field>
                    </v-col>
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
      </div>
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
      residentData: {
        firstname: { required },
        middlename: { required },
        lastname: { required },
        bdate: { required },
        pob: { required },
        weight: { required },
        height: { required },
        bloodtype: { required },
        religion: { required },
        occupation: { required },
        phone: { required },
        email: { email },
        cstreet: { required },
        ccity: { required },
        cprovince: { required },
        pstreet: { required },
        pcity: { required },
        pprovince: { required },
        tin: { required },
        pagibig: { required },
        sss: { required },
        philhealth: { required },
      }
    },

    async fetch() {
      await this.fetchSingleResident(this.$route.params.id)
    },
    fetchOnServer: false,

  	data(){
  		return {
        processing: false,
        nrDialog: false,
        birthdate: false,
        isSelecting: false,
        photoText: 'Choose image',
        photoSrc: '',
        residentData: {
          user_id: '',
          brgyID: '',
          firstname: '',
          middlename: '',
          lastname: '',
          gender: 'Male',
          bdate: '',
          pob: '',
          weight: '',
          height: '',
          bloodtype: '',
          civilstatus: 'Single',
          spouse: '',
          religion: '',
          occupation: '',
          phone: '',
          email: '',
          cpurok: '',
          cstreet: '',
          ccity: '',
          cprovince: '',
          ppurok: '',
          pstreet: '',
          pcity: '',
          pprovince: '',
          tin: '',
          pagibig: '',
          sss: '',
          philhealth: '',
          pic: ''
        },
  		}
  	},

    computed: {
      ...mapGetters({
        'validationErrorList' : 'admin/validationError'
      }),
      firstnameErrors () {
        const errors = []
        if (!this.$v.residentData.firstname.$dirty) return errors
        !this.$v.residentData.firstname.required && errors.push('Firstname is required')
        return errors
      },
      middlenameErrors () {
        const errors = []
        if (!this.$v.residentData.middlename.$dirty) return errors
        !this.$v.residentData.middlename.required && errors.push('Middlename is required')
        return errors
      },
      lastnameErrors () {
        const errors = []
        if (!this.$v.residentData.lastname.$dirty) return errors
        !this.$v.residentData.lastname.required && errors.push('Lastname is required')
        return errors
      },
      bdateErrors () {
        const errors = []
        if (!this.$v.residentData.bdate.$dirty) return errors
        !this.$v.residentData.bdate.required && errors.push('Birth date is required')
        return errors
      },
      pobErrors () {
        const errors = []
        if (!this.$v.residentData.pob.$dirty) return errors
        !this.$v.residentData.pob.required && errors.push('Place of birth is required')
        return errors
      },
      weightErrors () {
        const errors = []
        if (!this.$v.residentData.weight.$dirty) return errors
        !this.$v.residentData.weight.required && errors.push('Weight is required')
        return errors
      },
      heightErrors () {
        const errors = []
        if (!this.$v.residentData.height.$dirty) return errors
        !this.$v.residentData.height.required && errors.push('Height is required')
        return errors
      },
      bloodtypeErrors () {
        const errors = []
        if (!this.$v.residentData.bloodtype.$dirty) return errors
        !this.$v.residentData.bloodtype.required && errors.push('Bloodtype is required')
        return errors
      },
      religionErrors () {
        const errors = []
        if (!this.$v.residentData.religion.$dirty) return errors
        !this.$v.residentData.religion.required && errors.push('Religion is required')
        return errors
      },
      occupationErrors () {
        const errors = []
        if (!this.$v.residentData.occupation.$dirty) return errors
        !this.$v.residentData.occupation.required && errors.push('Occupation is required')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.residentData.phone.$dirty) return errors
        !this.$v.residentData.phone.required && errors.push('Phone is required')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.residentData.email.$dirty) return errors
        !this.$v.residentData.email.email && errors.push('Must be valid email')
        return errors
      },
      cstreetErrors () {
        const errors = []
        if (!this.$v.residentData.cstreet.$dirty) return errors
        !this.$v.residentData.cstreet.required && errors.push('Current address street is required')
        return errors
      },
      ccityErrors () {
        const errors = []
        if (!this.$v.residentData.ccity.$dirty) return errors
        !this.$v.residentData.ccity.required && errors.push('Current address city is required')
        return errors
      },
      cprovinceErrors () {
        const errors = []
        if (!this.$v.residentData.cprovince.$dirty) return errors
        !this.$v.residentData.cprovince.required && errors.push('Current address province is required')
        return errors
      },
      pstreetErrors () {
        const errors = []
        if (!this.$v.residentData.pstreet.$dirty) return errors
        !this.$v.residentData.pstreet.required && errors.push('Pernament address street is required')
        return errors
      },
      pcityErrors () {
        const errors = []
        if (!this.$v.residentData.pcity.$dirty) return errors
        !this.$v.residentData.pcity.required && errors.push('Pernament address city is required')
        return errors
      },
      pprovinceErrors () {
        const errors = []
        if (!this.$v.residentData.pprovince.$dirty) return errors
        !this.$v.residentData.pprovince.required && errors.push('Pernament address province is required')
        return errors
      },
    },

  	methods: {
      async fetchSingleResident(id) {
        await this.$api.post(`singleResident/${id}`).then((res) => {
          let resident = res.data;
          let caddress = resident.current_address.split('/')
          let paddress = resident.pernament_address.split('/')
          this.residentData.id = resident.id,
          this.residentData.user_id= resident.user_id,
          this.residentData.brgyID = resident.brgy_id,
          this.residentData.firstname = resident.firstname,
          this.residentData.middlename = resident.middlename,
          this.residentData.lastname = resident.lastname,
          this.residentData.gender = resident.gender,
          this.residentData.bdate = resident.dob,
          this.residentData.pob = resident.pob,
          this.residentData.weight = resident.weight,
          this.residentData.height = resident.height,
          this.residentData.bloodtype = resident.blood_type,
          this.residentData.civilstatus =resident.civil_status,
          this.residentData.spouse = resident.spouse_name,
          this.residentData.religion = resident.religion,
          this.residentData.occupation = resident.occupation,
          this.residentData.phone = resident.phone,
          this.residentData.email = resident.email,
          this.residentData.pic = resident.pic,
          this.residentData.cpurok = caddress[0],
          this.residentData.cstreet = caddress[1],
          this.residentData.ccity = caddress[2],
          this.residentData.cprovince = caddress[3],
          this.residentData.ppurok = paddress[0],
          this.residentData.pstreet = paddress[1],
          this.residentData.pcity = paddress[2],
          this.residentData.pprovince = paddress[3],
          this.residentData.tin = resident.tin,
          this.residentData.pagibig = resident.pagibig,
          this.residentData.sss = resident.sss,
          this.residentData.philhealth =resident.philhealth

          this.photoText = resident.pic != '' ? 'Change image' : 'Choose image'
          this.photoSrc = resident.pic && resident.pic != 'null'? `${this.$config.laraURL}/accounts/${resident.pic}` : `${this.$config.laraURL}/accounts/nopreview.png`
        })
      },
      async submit() {
        this.$v.$touch();
        if(!this.$v.$invalid) {
          this.processing = true

          let formData = new FormData();
          let imageFile = document.getElementById('profile').files
          if(imageFile.length != 0) { formData.append('file', document.getElementById('profile').files[0]) }
          for (let k in this.residentData) { formData.append(k, this.residentData[k]) }

          await this.$store.dispatch('admin/updateResident', formData).then(() => {
            if(!Object.keys(this.validationErrorList).length) {
              this.$router.push('/manage/resident')
            }
          })
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
          this.residentData.pic = ''
          document.getElementById('preview').src = `${this.$config.laraURL}/accounts/nopreview.png`
        }
      },
      padLeadingZeros(num, size) {
          var s = num+"";
          while (s.length < size) s = "0" + s;
          return s;
      },
      removeValidation(index = []) {
        let validation = { ...this.validationErrorList }
        index.forEach(item => {
          delete validation[item]
        })
        this.$store.commit('admin/SETVALIDATIONERROR', validation)
      },
  	},
  }
</script>

<style>
  .resident-list li{
    flex-basis: calc(31.25%);
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>