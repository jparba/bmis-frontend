<template>
  <div>
    <navigation />
    <v-container class="mt-5">
      <v-row v-if="$fetchState.pending">
        <v-col cols="12"md="3">
          <v-skeleton-loader
            v-bind="attrs"
            type="card-avatar, article, actions"
          ></v-skeleton-loader>
        </v-col>

        <v-col cols="12"md="9">
          <v-skeleton-loader
            v-bind="attrs"
            type="article, actions"
          ></v-skeleton-loader>

          <v-skeleton-loader
            v-bind="attrs"
            type="table-heading, list-item-two-line, image, table-tfoot"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else-if="$fetchState.error">
        <v-col cols="12"md="12">
          <error-view />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" md="3">
          <dash-menu />
        </v-col>
        <v-col cols="12" md="9">
          <div class="box_wrap">
            <v-card>
              <v-form>
                <h2 class="mb-5">Resident Information</h2>
                <v-row>
                  <v-col cols="12" md="6">
                    <div>First Name</div>
                    <v-text-field
                      v-model="formData.firstname"
                      :error-messages="('firstname' in validationErrorList) ? validationErrorList['firstname'] : firstnameErrors"
                      placeholder="First name"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.firstname.$touch()"
                      @blur="$v.formData.firstname.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Middle Name</div>
                    <v-text-field
                      v-model="formData.middlename"
                      :error-messages="('middlename' in validationErrorList) ? validationErrorList['middlename'] : middlenameErrors"
                      placeholder="Middle name"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.middlename.$touch()"
                      @blur="$v.formData.middlename.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Last Name</div>
                    <v-text-field
                      v-model="formData.lastname"
                      :error-messages="('lastname' in validationErrorList) ? validationErrorList['lastname'] : lastnameErrors"
                      placeholder="Last name"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.lastname.$touch()"
                      @blur="$v.formData.lastname.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Phone No.</div>
                    <v-text-field
                      v-model="formData.phone"
                      :error-messages="('phone' in validationErrorList) ? validationErrorList['phone'] : phoneErrors"
                      placeholder="09123456789"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.phone.$touch()"
                      @blur="$v.formData.phone.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Email</div>
                    <v-text-field
                      v-model="formData.email"
                      :error-messages="('email' in validationErrorList) ? validationErrorList['email'] : emailErrors"
                      placeholder="sample@gmail.com"
                      hide-details="auto"
                      solo
                      @input="[$v.formData.email.$touch(), removeValidation(['email'])]"
                      @blur="[$v.formData.email.$touch(), removeValidation(['email'])]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Date of Birth</div>
                    <v-text-field
                      v-model="formData.bdate"
                      :error-messages="('bdate' in validationErrorList) ? validationErrorList['bdate'] : bdateErrors"
                      placeholder="05-27-93"
                      required
                      readonly
                      hide-details="auto"
                      solo
                      @input="$v.formData.bdate.$touch()"
                      @blur="$v.formData.bdate.$touch()"
                      @click="datepicker = true"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Place of Birth</div>
                    <v-text-field
                      v-model="formData.pob"
                      :error-messages="('pob' in validationErrorList) ? validationErrorList['pob'] : pobErrors"
                      placeholder="Place of birth"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.pob.$touch()"
                      @blur="$v.formData.pob.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Gender</div>
                    <v-select
                      v-model="formData.gender"
                      :items="['Male', 'Female']"
                      :error-messages="('gender' in validationErrorList) ? validationErrorList['gender'] : genderErrors"
                      label="Gender"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.gender.$touch()"
                      @blur="$v.formData.gender.$touch()"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Weight</div>
                    <v-text-field
                      v-model="formData.weight"
                      :error-messages="('weight' in validationErrorList) ? validationErrorList['weight'] : weightErrors"
                      placeholder="Weight"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.weight.$touch()"
                      @blur="$v.formData.weight.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Height</div>
                    <v-text-field
                      v-model="formData.height"
                      :error-messages="('height' in validationErrorList) ? validationErrorList['height'] : heightErrors"
                      placeholder="Height"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.height.$touch()"
                      @blur="$v.formData.height.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Religion</div>
                    <v-autocomplete
                      v-model="formData.religion"
                      :items="religionList"
                      :error-messages="('religion' in validationErrorList) ? validationErrorList['religion'] : religionErrors"
                      label="Religion"
                      required
                      hide-details="auto"
                      solo
                      @blur="$v.formData.religion.$touch()"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Occupation</div>
                    <v-text-field
                      v-model="formData.occupation"
                      :error-messages="('occupation' in validationErrorList) ? validationErrorList['occupation'] : occupationErrors"
                      placeholder="Occupation"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.occupation.$touch()"
                      @blur="$v.formData.occupation.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Blood Type</div>
                    <v-select
                      v-model="formData.bloodtype"
                      :items="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                      :error-messages="('bloodtype' in validationErrorList) ? validationErrorList['bloodtype'] : bloodErrors"
                      label="Blood type"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.bloodtype.$touch()"
                      @blur="$v.formData.bloodtype.$touch()"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Civil Status</div>
                    <v-select
                      v-model="formData.civilstatus"
                      :items="['Single', 'Married', 'Separated', 'Widowed']"
                      :error-messages="('civilstatus' in validationErrorList) ? validationErrorList['civilstatus'] : civilStatusErrors"
                      label="Civil status"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.civilstatus.$touch()"
                      @blur="$v.formData.civilstatus.$touch()"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="12">
                    <div>Name of Spouse</div>
                    <v-text-field
                      v-model="formData.spouse"
                      placeholder="Name of Spouse"
                      hide-details="auto"
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <div>Current Address</div>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-autocomplete
                      v-model="formData.cpurok"
                      :items="['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6', 'Purok 7', 'Purok 8', 'Purok 9', 'Purok 10']"
                      label="Purok"
                      solo
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="9">
                      <v-text-field
                      v-model="formData.cstreet"
                      label="Street"
                      :error-messages="('cstreet' in validationErrorList) ? validationErrorList['cstreet'] : cstreetErrors"
                      hide-details="auto"
                      required
                      solo
                      @input="[$v.formData.cstreet.$touch(), removeValidation(['cstreet'])]"
                      @blur="[$v.formData.cstreet.$touch(), removeValidation(['cstreet'])]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="formData.ccity"
                      label="City / Municipality"
                      :error-messages="('ccity' in validationErrorList) ? validationErrorList['ccity'] : ccityErrors"
                      hide-details="auto"
                      required
                      solo
                      @input="[$v.formData.ccity.$touch(), removeValidation(['ccity'])]"
                      @blur="[$v.formData.ccity.$touch(), removeValidation(['ccity'])]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="formData.cprovince"
                      label="Province"
                      :error-messages="('cprovince' in validationErrorList) ? validationErrorList['cprovince'] : cprovinceErrors"
                      hide-details="auto"
                      required
                      solo
                      @input="[$v.formData.cprovince.$touch(), removeValidation(['cprovince'])]"
                      @blur="[$v.formData.cprovince.$touch(), removeValidation(['cprovince'])]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <div>Pernament Address</div>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                      <v-autocomplete
                        v-model="formData.ppurok"
                        :items="['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4', 'Purok 5', 'Purok 6', 'Purok 7', 'Purok 8', 'Purok 9', 'Purok 10']"
                        label="Purok"
                        solo
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="9">
                      <v-text-field
                        v-model="formData.pstreet"
                        label="Street"
                        :error-messages="('pstreet' in validationErrorList) ? validationErrorList['pstreet'] : pstreetErrors"
                        hide-details="auto"
                        required
                        solo
                        @input="[$v.formData.pstreet.$touch(), removeValidation(['pstreet'])]"
                        @blur="[$v.formData.pstreet.$touch(), removeValidation(['pstreet'])]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="formData.pcity"
                        label="City / Municipality"
                        :error-messages="('pcity' in validationErrorList) ? validationErrorList['pcity'] : pcityErrors"
                        hide-details="auto"
                        required
                        solo
                        @input="[$v.formData.pcity.$touch(), removeValidation(['pcity'])]"
                        @blur="[$v.formData.pcity.$touch(), removeValidation(['pcity'])]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="formData.pprovince"
                        label="Province"
                        :error-messages="('pprovince' in validationErrorList) ? validationErrorList['pprovince'] : pprovinceErrors"
                        hide-details="auto"
                        required
                        solo
                        @input="[$v.formData.pprovince.$touch(), removeValidation(['pprovince'])]"
                        @blur="[$v.formData.pprovince.$touch(), removeValidation(['pprovince'])]"
                      ></v-text-field>
                    </v-col>
                </v-row>
                <v-col cols="12" class="text-center mt-5 pt-5">
                  <v-btn
                    color="primary"
                    dark
                    large
                    min-width="200"
                    :loading="processing"
                    class="mt-5"
                    @click="saveResident"> Save Details
                  </v-btn>
                </v-col>
              </v-form>

              <v-dialog
                ref="datepickerDialog"
                v-model="datepicker"
                :return-value.sync="formData.bdate"
                persistent
                width="290px"
              >
                <v-date-picker
                  v-model="formData.bdate"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="datepicker = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.datepickerDialog.save(formData.bdate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import Navigation from '~/components/DashNavigation.vue'
import DashMenu from '~/components/DashMenu.vue'
import ErrorView from '~/components/ErrorView.vue'

export default {
  middleware: 'access',
  layout: 'clean',
  mixins: [validationMixin],
  components: {
    Navigation,
    DashMenu,
    ErrorView
  },

  validations: {
    formData: {
      firstname: { required },
      middlename: { required },
      lastname: { required },
      email: { required, email },
      phone: { required },
      bdate: { required },
      pob: { required },
      weight: { required },
      height: { required },
      gender: { required },
      religion: { required },
      occupation: { required },
      bloodtype: { required },
      civilstatus: { required },
      cstreet: { required },
      ccity: { required },
      cprovince: { required },
      pstreet: { required },
      pcity: { required },
      pprovince: { required }
    }
  },

  data() {
    return {
      show: false,
      processing: false,
      datepicker: false,
      attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
      formData: {
        user_id: '',
        brgy_id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phone: '',
        bdate: '',
        pob: '',
        weight: '',
        height: '',
        gender: 'Male',
        religion: '',
        bloodtype: '',
        occupation: '',
        civilstatus: 'Single',
        spouse: '',
        cpurok: 'Purok 1',
        cstreet: '',
        ccity: '',
        cprovince: '',
        ppurok: 'Purok 1',
        pstreet: '',
        pcity: '',
        pprovince: '',
        tin: '',
        pagibig: '',
        sss: '',
        philhealth: '',
        pic: ''
      },
      religionList: ['Roman Catholic', 'Islam', 'Evangelicals (PCEC)', 'Iglesia ni Cristo', 'Non-Roman Catholic and Protestant (NCCP)', 'Aglipayan', 'Seventh-day Adventist', 'Bible Baptist Church', 'United Church of Christ in the Philippines', "Jehovah's Witnesses"]
    }
  },

  async fetch() {
    await this.fetchUser()
  },
  fetchOnServer: false,

  computed: {
    ...mapGetters({
      validationErrorList: 'user/validationError'
    }),
    firstnameErrors () {
      const errors = []
      if (!this.$v.formData.firstname.$dirty) return errors
      !this.$v.formData.firstname.required && errors.push('Firstname is required')
      return errors
    },
    middlenameErrors () {
      const errors = []
      if (!this.$v.formData.middlename.$dirty) return errors
      !this.$v.formData.middlename.required && errors.push('Middlename is required')
      return errors
    },
    lastnameErrors () {
      const errors = []
      if (!this.$v.formData.lastname.$dirty) return errors
      !this.$v.formData.lastname.required && errors.push('Lastname is required')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.formData.phone.$dirty) return errors
      !this.$v.formData.phone.required && errors.push('Phone is required')
      return errors
    },
    bdateErrors () {
      const errors = []
      if (!this.$v.formData.bdate.$dirty) return errors
      !this.$v.formData.bdate.required && errors.push('Date of birth is required')
      return errors
    },
    weightErrors () {
      const errors = []
      if (!this.$v.formData.weight.$dirty) return errors
      !this.$v.formData.weight.required && errors.push('Weight is required')
      return errors
    },
    heightErrors () {
      const errors = []
      if (!this.$v.formData.height.$dirty) return errors
      !this.$v.formData.height.required && errors.push('Height is required')
      return errors
    },
    pobErrors () {
      const errors = []
      if (!this.$v.formData.pob.$dirty) return errors
      !this.$v.formData.pob.required && errors.push('Place of birth is required')
      return errors
    },
    genderErrors () {
      const errors = []
      if (!this.$v.formData.gender.$dirty) return errors
      !this.$v.formData.gender.required && errors.push('Gender is required')
      return errors
    },
    religionErrors () {
      const errors = []
      if (!this.$v.formData.religion.$dirty) return errors
      !this.$v.formData.religion.required && errors.push('Religion is required')
      return errors
    },
    occupationErrors () {
      const errors = []
      if (!this.$v.formData.occupation.$dirty) return errors
      !this.$v.formData.occupation.required && errors.push('Occupation is required')
      return errors
    },
    bloodErrors () {
      const errors = []
      if (!this.$v.formData.bloodtype.$dirty) return errors
      !this.$v.formData.bloodtype.required && errors.push('Blood type is required')
      return errors
    },
    civilStatusErrors () {
      const errors = []
      if (!this.$v.formData.civilstatus.$dirty) return errors
      !this.$v.formData.civilstatus.required && errors.push('Civil status is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.email && errors.push('Must be valid e-mail')
      !this.$v.formData.email.required && errors.push('E-mail is required')
      return errors
    },
    cstreetErrors () {
      const errors = []
      if (!this.$v.formData.cstreet.$dirty) return errors
      !this.$v.formData.cstreet.required && errors.push('Current address street is required')
      return errors
    },
    ccityErrors () {
      const errors = []
      if (!this.$v.formData.ccity.$dirty) return errors
      !this.$v.formData.ccity.required && errors.push('Current address city is required')
      return errors
    },
    cprovinceErrors () {
      const errors = []
      if (!this.$v.formData.cprovince.$dirty) return errors
      !this.$v.formData.cprovince.required && errors.push('Current address province is required')
      return errors
    },
    pstreetErrors () {
      const errors = []
      if (!this.$v.formData.pstreet.$dirty) return errors
      !this.$v.formData.pstreet.required && errors.push('Pernament address street is required')
      return errors
    },
    pcityErrors () {
      const errors = []
      if (!this.$v.formData.pcity.$dirty) return errors
      !this.$v.formData.pcity.required && errors.push('Pernament address city is required')
      return errors
    },
    pprovinceErrors () {
      const errors = []
      if (!this.$v.formData.pprovince.$dirty) return errors
      !this.$v.formData.pprovince.required && errors.push('Pernament address province is required')
      return errors
    },
  },
  methods: {
    async fetchUser() {
      await this.$api.post(`user/${this.$auth.user.id}`).then((res) => {
        let user = res.data[0];
        if(user.resident==null) {
          this.formData.firstname = user.firstname
          this.formData.middlename = user.middlename
          this.formData.lastname = user.lastname
          this.formData.phone = user.phone
          this.formData.email = user.email
        }else{
          let caddress = user.resident.current_address.split('/')
          let paddress = user.resident.pernament_address.split('/')
          this.formData.user_id = user.resident.user_id,
          this.formData.brgyID = user.resident.brgy_id,
          this.formData.firstname = user.resident.firstname,
          this.formData.middlename = user.resident.middlename,
          this.formData.lastname = user.resident.lastname,
          this.formData.gender = user.resident.gender,
          this.formData.bdate = user.resident.dob,
          this.formData.pob = user.resident.pob,
          this.formData.weight = user.resident.weight,
          this.formData.height = user.resident.height,
          this.formData.bloodtype = user.resident.blood_type,
          this.formData.civilstatus = user.resident.civil_status,
          this.formData.spouse = user.resident.spouse_name,
          this.formData.religion = user.resident.religion,
          this.formData.occupation = user.resident.occupation,
          this.formData.phone = user.resident.phone,
          this.formData.email = user.resident.email,
          this.formData.pic = user.resident.pic,
          this.formData.cpurok = caddress[0],
          this.formData.cstreet = caddress[1],
          this.formData.ccity = caddress[2],
          this.formData.cprovince = caddress[3],
          this.formData.ppurok = paddress[0],
          this.formData.pstreet = paddress[1],
          this.formData.pcity = paddress[2],
          this.formData.pprovince = paddress[3],
          this.formData.tin = user.resident.tin,
          this.formData.pagibig = user.resident.pagibig,
          this.formData.sss = user.resident.sss,
          this.formData.philhealth = user.resident.philhealth
        }
      })
    },
    async saveResident() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        this.processing = true
        await this.$store.dispatch('user/saveResident', this.formData).then(() => {
          if(Object.keys(this.validationErrorList).length > 0) {
            this.scrollToError('error--text')
          }else{
            this.scrollToError('box_wrap')
          }
        });
      }
      this.processing = false
    },
    removeValidation(index = []) {
      let validation = { ...this.validationErrorList }
      index.forEach(item => {
        delete validation[item]
      })
      this.$store.commit('user/SETVALIDATIONERROR', validation)
    },
    scrollToError($class) {
      let error = document.getElementsByClassName($class);
      error[0].scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  },
}
</script>

<style lang="scss">
</style>
