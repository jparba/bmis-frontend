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
                <v-col cols="12" md="6" xs="12">
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
                <v-col cols="12" md="6" xs="12">
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
                <v-col cols="12" md="6" xs="12">
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
                <v-col cols="12" md="6" xs="12">
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
                <v-col cols="12" md="6" xs="12">
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
                <v-col cols="12" md="6" xs="12">
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

                <v-col cols="12">
                  <div class="d-flex flex-wrap align-center mt-4">
                    <h4>Please attach your photo <small>(optional)</small></h4>
                    <v-btn
                      color="success"
                      dark
                      small
                      min-width="100"
                      :loading="isSelecting"
                      class="ml-auto"
                      @click="handleFileImport"> {{ photoText ? 'Change' : 'Attach' }}
                    </v-btn>

                    <input
                        ref="uploader"
                        id="validID"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        @change="onFileChanged"
                    >
                  </div>
                  <div class="preview_wrap">
                    <v-avatar
                      class="profile"
                      color="transparent"
                      size="300"
                      tile
                    >
                      <img id="preview" src="~/assets/img/nopreview.png" alt="">
                    </v-avatar>
                  </div>
                </v-col>

                <v-col cols="12" class="text-center mt-5">
                  <v-btn
                    color="primary"
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
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import { validationMixin } from 'vuelidate'
import { required, requiredIf, email, minLength } from 'vuelidate/lib/validators'

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
        idNumber: {
          required: requiredIf(function(form){
            return this.showIdInput
          })
        },
        lastname: { required },
        email: { required, email },
        password: { required, minLength: minLength(8) },
        phone: { required },
      }
    },

    data: () => ({
      show: false,
      processing: false,
      isSelecting: false,
      showIdInput: false,
      photoText: false,
      formData: {
        firstname: '',
        middlename: '',
        idNumber: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
      }
    }),

    computed: {
      firstnameErrors () {
        const errors = []
        if (!this.$v.formData.firstname.$dirty) return errors
        !this.$v.formData.firstname.required && errors.push('Firstname is required')
        return errors
      },
      idNumberErrors () {
        const errors = []
        if (!this.$v.formData.idNumber.$dirty) return errors
        this.showIdInput && !this.$v.formData.idNumber.required && errors.push('Barangay ID number is required')
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
    },

    methods: {
      async submit () {
        this.$v.$touch();
        if(!this.$v.$invalid) {
          this.processing = true

          const formdata = new FormData()
          let imageFile = document.getElementById('validID').files

          formdata.append('firstname', this.formData.firstname)
          formdata.append('middlename', this.formData.middlename)
          formdata.append('idNumber', this.formData.idNumber)
          formdata.append('lastname', this.formData.lastname)
          formdata.append('email', this.formData.email)
          formdata.append('password', this.formData.password)
          formdata.append('phone', this.formData.phone)

          if(imageFile.length != 0) {
            formdata.append('file', document.getElementById('validID').files[0])
          }
          await this.$api.get('http://localhost:8000/sanctum/csrf-cookie')
          try {
            await this.$api.post('register', formdata)
              .then(res => {
                if(res.data.success) {
                  this.$auth.loginWith('laravelSanctum', {
                    data: {
                      email: this.formData.email,
                      password: this.formData.password
                    }
                  })
                }else{
                  this.$toast.global.error('Error encountered')
                }
            })
            this.$router.push('/accountStatus')
          } catch (error) {
              const errors = Object.assign({}, error)
              if(errors.response.data.errors.email) {
                this.$toast.global.error('Email already exist')
              }
          }

          this.processing = false
        }
      },
      radioChange(e) {
        this.showIdInput = e == 1? true : false
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
            // this.photoText = true
            let reader = new FileReader()
            reader.onload = function (e) {
              document.getElementById('preview').src = e.target.result
            }
            reader.readAsDataURL(e.target.files[0]);
          }
      },
    },
  }
</script>

<style lang="scss">
  .preview_wrap{
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #333;
    margin-top: 20px;
    min-height: 300px;
  }
</style>
