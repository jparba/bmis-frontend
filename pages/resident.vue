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
                      v-model="formData.dob"
                      :error-messages="('dob' in validationErrorList) ? validationErrorList['dob'] : dobErrors"
                      placeholder="05-27-93"
                      required
                      readonly
                      hide-details="auto"
                      solo
                      @input="$v.formData.dob.$touch()"
                      @blur="$v.formData.dob.$touch()"
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
                    <div>Blood Type</div>
                    <v-select
                      v-model="formData.blood"
                      :items="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                      :error-messages="('blood' in validationErrorList) ? validationErrorList['blood'] : bloodErrors"
                      label="Blood type"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.blood.$touch()"
                      @blur="$v.formData.blood.$touch()"
                    ></v-select>
                  </v-col>
                  <v-col cols="09123456789" md="6">
                    <div>Occupation</div>
                    <v-text-field
                      v-model="formData.occupation"
                      placeholder="Occupation"
                      hide-details="auto"
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div>Civil Status</div>
                    <v-select
                      v-model="formData.civilStatus"
                      :items="['Single', 'Married', 'Separated', 'Widowed']"
                      :error-messages="('civilStatus' in validationErrorList) ? validationErrorList['civilStatus'] : civilStatusErrors"
                      label="Civil status"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.civilStatus.$touch()"
                      @blur="$v.formData.civilStatus.$touch()"
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
                  <v-col cols="12">
                    <div>Current Address</div>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.currentAddress"
                      :error-messages="('currentAddress' in validationErrorList) ? validationErrorList['currentAddress'] : currentAddressErrors"
                      placeholder="House No. / Street / City / Province"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.currentAddress.$touch()"
                      @blur="$v.formData.currentAddress.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <div>Pernament Address</div>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.pernamentAddress"
                      :error-messages="('pernamentAddress' in validationErrorList) ? validationErrorList['pernamentAddress'] : pernamentAddressErrors"
                      placeholder="House No. / Street / City / Province"
                      required
                      hide-details="auto"
                      solo
                      @input="$v.formData.pernamentAddress.$touch()"
                      @blur="$v.formData.pernamentAddress.$touch()"
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
                :return-value.sync="formData.dob"
                persistent
                width="290px"
              >
                <v-date-picker
                  v-model="formData.dob"
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
                    @click="$refs.datepickerDialog.save(formData.dob)"
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
      dob: { required },
      pob: { required },
      gender: { required },
      religion: { required },
      blood: { required },
      civilStatus: { required },
      currentAddress: { required },
      pernamentAddress: { required }
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
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        phone: '',
        dob: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        pob: '',
        gender: '',
        religion: '',
        blood: '',
        occupation: '',
        civilStatus: '',
        spouse: '',
        currentAddress: '',
        pernamentAddress: ''
      },
      religionList: ['Roman Catholic', 'Islam', 'Evangelicals (PCEC)', 'Iglesia ni Cristo', 'Non-Roman Catholic and Protestant (NCCP)', 'Aglipayan', 'Seventh-day Adventist', 'Bible Baptist Church', 'United Church of Christ in the Philippines', "Jehovah's Witnesses"]
    }
  },

  async fetch() {
    await this.$api.post(`user/${this.$auth.user.id}`).then((res) => {
      let user = res.data[0];
      if(user.resident==null) {
        this.formData.firstname = user.firstname
        this.formData.middlename = user.middlename
        this.formData.lastname = user.lastname
        this.formData.phone = user.phone
        this.formData.email = user.email
      }
    })
  },

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
    dobErrors () {
      const errors = []
      if (!this.$v.formData.dob.$dirty) return errors
      !this.$v.formData.dob.required && errors.push('Date of birth is required')
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
    bloodErrors () {
      const errors = []
      if (!this.$v.formData.blood.$dirty) return errors
      !this.$v.formData.blood.required && errors.push('Blood type is required')
      return errors
    },
    civilStatusErrors () {
      const errors = []
      if (!this.$v.formData.civilStatus.$dirty) return errors
      !this.$v.formData.civilStatus.required && errors.push('Civil status is required')
      return errors
    },
    currentAddressErrors () {
      const errors = []
      if (!this.$v.formData.currentAddress.$dirty) return errors
      !this.$v.formData.currentAddress.required && errors.push('Current Address is required')
      return errors
    },
    pernamentAddressErrors () {
      const errors = []
      if (!this.$v.formData.pernamentAddress.$dirty) return errors
      !this.$v.formData.pernamentAddress.required && errors.push('Pernament Address is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.email && errors.push('Must be valid e-mail')
      !this.$v.formData.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  methods: {
    async saveResident() {
      // this.$v.$touch();
      // if(!this.$v.$invalid) {
        // this.processing = true
        await this.$store.dispatch('user/saveResident', { update: this.$auth.user.has_detail?true:false, data:this.formData })
      // }
      // this.processing = false
    },
    removeValidation(index = []) {
      let validation = { ...this.validationErrorList }
      index.forEach(item => {
        delete validation[item]
      })
      this.$store.commit('user/SETVALIDATIONERROR', validation)
    },
  },
}
</script>

<style lang="scss">
</style>
