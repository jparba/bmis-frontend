<template>
  <div>
    <navigation />
    <v-container>
      <h1 class="text-center mt-5 pt-3">ACCOUNT REGISTRATION</h1>
    </v-container>

    <div class="container mt-3">
      <div class="box_wrap">
        <v-card max-width="800" class="ma-auto">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.firstname"
                    :error-messages="firstnameErrors"
                    prepend-icon="mdi-account-outline"
                    label="Firstname"
                    required
                    hide-details="auto"
                    @input="$v.formData.firstname.$touch()"
                    @blur="$v.formData.firstname.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.middlename"
                    :error-messages="middlenameErrors"
                    prepend-icon="mdi-account-outline"
                    label="Middlename"
                    required
                    hide-details="auto"
                    @input="$v.formData.middlename.$touch()"
                    @blur="$v.formData.middlename.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.lastname"
                    :error-messages="lastnameErrors"
                    prepend-icon="mdi-account-outline"
                    label="Lastname"
                    required
                    hide-details="auto"
                    @input="$v.formData.lastname.$touch()"
                    @blur="$v.formData.lastname.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.username"
                    :error-messages="usernameErrors"
                    prepend-icon="mdi-account-outline"
                    label="Username"
                    required
                    hide-details="auto"
                    @input="$v.formData.username.$touch()"
                    @blur="$v.formData.username.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.email"
                    :error-messages="emailErrors"
                    prepend-icon="mdi-at"
                    label="E-mail"
                    required
                    hide-details="auto"
                    @input="$v.formData.email.$touch()"
                    @blur="$v.formData.email.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                      v-model="formData.password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :error-messages="passwordErrors"
                      :type="show ? 'text' : 'password'"
                      prepend-icon="mdi-lock-outline"
                      label="Password"
                      @click:append="show = !show"
                      required
                      hide-details="auto"
                      @input="$v.formData.password.$touch()"
                      @blur="$v.formData.password.$touch()"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.phone"
                    :error-messages="phoneErrors"
                    prepend-icon="mdi-account-outline"
                    label="Phone No."
                    required
                    ref="myBtn"
                    hide-details="auto"
                    @input="$v.formData.phone.$touch()"
                    @blur="[$v.formData.phone.$touch()]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.gender"
                    :error-messages="genderErrors"
                    prepend-icon="mdi-account-outline"
                    label="Gender"
                    required
                    readonly
                    hide-details="auto"
                    @input="$v.formData.gender.$touch()"
                    @blur="$v.formData.gender.$touch()"
                    @click="genderDialog = true"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="text-center mt-5">
                  <v-btn
                    color="primary"
                    dark
                    large
                    min-width="200"
                    :loading="processing"
                    @click="submit"> register
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>

        <v-dialog
          v-model="genderDialog"
          max-width="290"
          persistent
        >
          <v-card>
            <v-card-title class="text-h5">
              Select your gender
            </v-card-title>

            <v-card-text>
              <v-radio-group v-model="genderChoosen">
                <v-radio
                  label="Male"
                  value="Male"
                ></v-radio>
                <v-radio
                  label="Female"
                  value="Female"
                ></v-radio>
              </v-radio-group>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="[genderDialog = false, formData.gender = genderChoosen]"
              >
                Choose
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

  export default {
    middleware: 'redirect',
	  layout: 'clean',
    mixins: [validationMixin],
    components: {
      Navigation,
    },

    validations: {
      formData: {
        firstname: { required },
        middlename: { required },
        lastname: { required },
        username: { required },
        email: { required, email },
        password: { required, minLength: minLength(8) },
        phone: { required },
        gender: { required },
      }
    },

    data: () => ({
      show: false,
      genderDialog: false,
      processing: false,
      genderChoosen: 'Male',
      formData: {
        firstname: '',
        middlename: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
      }
    }),

    computed: {
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
        !this.$v.formData.password.minLength && errors.push('Minimum length is 8 character')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.formData.phone.$dirty) return errors
        !this.$v.formData.phone.required && errors.push('Phone No. is required')
        return errors
      },
      genderErrors () {
        const errors = []
        if (!this.$v.formData.gender.$dirty) return errors
        !this.$v.formData.gender.required && errors.push('Gender is required')
        return errors
      },
    },

    methods: {
      async submit () {
        this.$v.$touch();
        if(!this.$v.$invalid) {
          this.processing = true
          await this.$api.get('http://localhost:8000/sanctum/csrf-cookie')
          await this.$api.post('register', this.formData)
            .then(res => {
              if(res.data.success) {
                this.$auth.loginWith('laravelSanctum', {
                  data: {
                    email: this.formData.email,
                    password: this.formData.password
                  }
                })
              }
          })

          this.processing = false
          this.$router.push('/')
        }
      },
    },
  }
</script>

<style lang="scss">

</style>
