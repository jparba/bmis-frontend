<template>
  <div>
    <navigation />
    <v-container class="mt-5">
      <v-row>
        <v-col cols="12" md="3">
          <dash-menu />
        </v-col>
        <v-col cols="12" md="9">
          <div class="box_wrap">
            <v-card>
              <v-form>
                <h2 class="mb-5">My account</h2>
                <v-row>
                  <v-col
                    align-self="start"
                    cols="12"
                    md="3"
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
                    md="9"
                  >
                    <div>
                      <v-btn
                        color="primary"
                        dark
                        small
                        min-width="100"> Choose a file
                      </v-btn>
                      <small class="d-block mt-3">Acceptable formats .jpg, .png only <br>Max file size is 500 kb and min size 70 kb.</small>
                    </div>
                  </v-col>
                </v-row>

                <h2 class="mt-5 mb-3 pt-2">Account Information</h2>
                <v-row>
                  <v-col cols="12" md="3">
                    <div>First Name</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="accountData.firstname"
                      placeholder="First name"
                      :error-messages="('firstname' in validationErrorList) ? validationErrorList['firstname'] : firstnameErrors"
                      hide-details="auto"
                      solo
                      @input="[$v.accountData.firstname.$touch(), removeValidation(['firstname'])]"
                      @blur="[$v.accountData.firstname.$touch(), removeValidation(['firstname'])]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <div>Middle Name</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="accountData.middlename"
                      :error-messages="('middlename' in validationErrorList) ? validationErrorList['middlename'] : middlenameErrors"
                      placeholder="Last name"
                      required
                      hide-details="auto"
                      solo
                      @input="[$v.accountData.middlename.$touch(), removeValidation(['middlename'])]"
                      @blur="[$v.accountData.middlename.$touch(), removeValidation(['middlename'])]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <div>Last Name</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="accountData.lastname"
                      :error-messages="('lastname' in validationErrorList) ? validationErrorList['lastname'] : lastnameErrors"
                      placeholder="Last name"
                      required
                      hide-details="auto"
                      solo
                      @input="[$v.accountData.lastname.$touch(), removeValidation(['lastname'])]"
                      @blur="[$v.accountData.lastname.$touch(), removeValidation(['lastname'])]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <div>Username</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="accountData.username"
                      :error-messages="('username' in validationErrorList) ? validationErrorList['username'] : usernameErrors"
                      placeholder="Username"
                      required
                      hide-details="auto"
                      solo
                      @input="[$v.accountData.username.$touch(), removeValidation(['username'])]"
                      @blur="[$v.accountData.username.$touch(), removeValidation(['username'])]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <div>Email</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="accountData.email"
                      :error-messages="('email' in validationErrorList) ? validationErrorList['email'] : emailErrors"
                      placeholder="sample@gmail.com"
                      required
                      hide-details="auto"
                      solo
                      @input="[$v.accountData.email.$touch(), removeValidation(['email'])]"
                      @blur="[$v.accountData.email.$touch(), removeValidation(['email'])]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <div>Phone No.</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="accountData.phone"
                      :error-messages="('phone' in validationErrorList) ? validationErrorList['phone'] : phoneErrors"
                      placeholder="09123456789"
                      required
                      hide-details="auto"
                      solo
                      @input="[$v.accountData.phone.$touch(), removeValidation(['phone'])]"
                      @blur="[$v.accountData.phone.$touch(), removeValidation(['phone'])]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="text-center mt-5">
                    <v-btn
                      color="primary"
                      dark
                      large
                      min-width="200"
                      :loading="processingAccount"
                      class="mb-5"
                      @click="updateAccount"> Update account
                    </v-btn>
                  </v-col>
                </v-row>

                <h2 class="mt-5 mb-3 pt-2">Change Password</h2>
                <v-row>
                  <v-col cols="12" md="3">
                    <div>Current password</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="passwordData.password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :error-messages="('password' in validationErrorList) ? validationErrorList['password'] : passwordErrors"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      placeholder="Current password"
                      required
                      hide-details="auto"
                      solo
                      @input="[$v.passwordData.password.$touch(), removeValidation(['password'])]"
                      @blur="[$v.passwordData.password.$touch(), removeValidation(['password'])]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <div>New password</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="passwordData.newPassword"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :error-messages="('newPassword' in validationErrorList) ? validationErrorList['newPassword'] : newPasswordErrors"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      placeholder="New password"
                      required
                      hide-details="auto"
                      solo
                      @input="[$v.passwordData.newPassword.$touch(), removeValidation(['newPassword'])]"
                      @blur="[$v.passwordData.newPassword.$touch(), removeValidation(['newPassword'])]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="3">
                    <div>Confirm password</div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="passwordData.repeatNewPassword"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :error-messages="('repeatNewPassword' in validationErrorList) ? validationErrorList['repeatNewPassword'] : repeatNewPasswordErrors"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      placeholder="Retype password"
                      required
                      hide-details="auto"
                      solo
                      @input="[$v.passwordData.repeatNewPassword.$touch(), removeValidation(['repeatNewPassword'])]"
                      @blur="[$v.passwordData.repeatNewPassword.$touch(), removeValidation(['repeatNewPassword'])]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="text-center mt-5">
                    <v-btn
                      color="primary"
                      dark
                      large
                      min-width="200"
                      :loading="processingPassword"
                      @click="changePassword"> Save password
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
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
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
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
    accountData: {
      firstname: { required },
      middlename: { required },
      lastname: { required },
      username: { required },
      email: { required, email },
      phone: { required },
    },
    passwordData: {
      password: { required, minLength: minLength(8) },
      newPassword: { required, minLength: minLength(8) },
      repeatNewPassword: { required, sameAsnewPassword: sameAs('newPassword') },
    }
  },

  data() {
    return {
      show: false,
      processingAccount: false,
      processingPassword: false,
      sessionData: [],
      accountData: {
        firstname: '',
        middlename: '',
        lastname: '',
        username: '',
        email: '',
        phone: '',
      },
      passwordData: {
        password: '',
        newPassword: '',
        repeatNewPassword: '',
      }
    }
  },

  computed: {
    ...mapGetters({
      validationErrorList: 'user/validationError'
    }),
    firstnameErrors () {
      const errors = []
      if (!this.$v.accountData.firstname.$dirty) return errors
      !this.$v.accountData.firstname.required && errors.push('Firstname is required')
      return errors
    },
    middlenameErrors () {
      const errors = []
      if (!this.$v.accountData.middlename.$dirty) return errors
      !this.$v.accountData.middlename.required && errors.push('Middlename is required')
      return errors
    },
    lastnameErrors () {
      const errors = []
      if (!this.$v.accountData.lastname.$dirty) return errors
      !this.$v.accountData.lastname.required && errors.push('Lastname is required')
      return errors
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.accountData.username.$dirty) return errors
      !this.$v.accountData.username.required && errors.push('Username is required')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.accountData.email.$dirty) return errors
      !this.$v.accountData.email.email && errors.push('Must be valid e-mail')
      !this.$v.accountData.email.required && errors.push('E-mail is required')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.accountData.phone.$dirty) return errors
      !this.$v.accountData.phone.required && errors.push('Phone No. is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.passwordData.password.$dirty) return errors
      !this.$v.passwordData.password.required && errors.push('Current password is required')
      !this.$v.passwordData.password.minLength && errors.push('Minimum length is 8 character')
      return errors
    },
    newPasswordErrors () {
      const errors = []
      if (!this.$v.passwordData.newPassword.$dirty) return errors
      !this.$v.passwordData.newPassword.required && errors.push('New password is required')
      !this.$v.passwordData.newPassword.minLength && errors.push('Minimum length is 8 character')
      return errors
    },
    repeatNewPasswordErrors () {
      const errors = []
      if (!this.$v.passwordData.repeatNewPassword.$dirty) return errors
      !this.$v.passwordData.repeatNewPassword.required && errors.push('Retype password is required')
      !this.$v.passwordData.repeatNewPassword.sameAsnewPassword && errors.push('Retype password not match')
      return errors
    },
  },
  methods: {
    setUserData() {
      let user = this.$auth.user
      this.accountData.firstname = user.firstname
      this.accountData.middlename = user.middlename
      this.accountData.lastname = user.lastname
      this.accountData.username = user.username
      this.accountData.email = user.email
      this.accountData.phone = user.phone
    },
    async updateAccount() {
      this.$v.accountData.$touch();
      if(!this.$v.accountData.$invalid) {
        this.processingAccount = true
        await this.$store.dispatch('user/updateAccount', {id: this.$auth.user.id, data: this.accountData })
        this.processingAccount = false
      }
    },
    async changePassword() {
      this.$v.passwordData.$touch();
      if(!this.$v.passwordData.$invalid) {
        this.processingPassword = true
        await this.$store.dispatch('user/changePassword', {id: this.$auth.user.id, data: this.passwordData }).then(() => {
            if(!Object.keys(this.validationErrorList).length) {
              this.$v.passwordData.$reset()
              for(const data in this.passwordData) {
                this.passwordData[data] = ''
              }
            }
        })
        this.processingPassword = false
      }
    },
    removeValidation(index = []) {
      let validation = { ...this.validationErrorList }
      index.forEach(item => {
        delete validation[item]
      })
      this.$store.commit('user/SETVALIDATIONERROR', validation)
    },
  },
  mounted() {
    this.setUserData();
  }
}
</script>

<style lang="scss">
</style>
