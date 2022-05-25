<template>
  <div>
    <navigation />
    <v-container>
      <h1 class="text-center mt-5 pt-3">Reupload Valid ID</h1>
    </v-container>

    <div class="container mt-3">
      <div class="box_wrap">
        <v-card max-width="800" class="ma-auto">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <div class="d-flex flex-wrap align-center mt-4">
                    <h4>Please attach an image of valid ID</h4>
                    <v-btn
                      color="success"
                      dark
                      small
                      min-width="100"
                      :loading="isSelecting"
                      class="ml-auto"
                      @click="handleFileImport"> {{ photoText ? 'Change' : 'Attach' }}
                    </v-btn>
                    <small class="mt-2 w-100">The attach valid ID is used by admin to check if the data you input is match with your identification card. <br> The admin will decide if your account will be activated.</small>

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
                    :disabled="!photoText"
                    @click="submit"> Reupload
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
    middleware: 'access',
	  layout: 'clean',
    mixins: [validationMixin],
    components: {
      Navigation,
    },

   /* validations: {
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
    },*/

    data: () => ({
      show: false,
      processing: false,
      isSelecting: false,
      showIdInput: false,
      photoText: false,
      formData: {}
    }),

    computed: {
    },

    methods: {
      async submit () {
        // this.$v.$touch();
        // if(!this.$v.$invalid) {
          this.processing = true

          const formdata = new FormData()
          let imageFile = document.getElementById('validID').files

          if(imageFile.length != 0) {
            formdata.append('file', document.getElementById('validID').files[0])
          }
          try {
            await this.$api.post('reuploadID', formdata)
              .then(res => {
                if(res.data.success) {
                  this.$toast.global.success('Reupload valid ID successfully')
                  this.$router.push('accountStatus')
                }else{
                  this.$toast.global.error('Error encountered')
                }
            })
          } catch (error) {
            console.log('error')
          }

          this.processing = false
        // }
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
            this.photoText = true
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
