<template>
  <div>
    <navigation />
    <v-container>
      <h1 class="text-center mt-5 pt-3">LOGIN</h1>
    </v-container>

    <div class="container mt-3">
      <div class="box_wrap">
        <v-card max-width="400" class="ma-auto">
    			<form autocomplete="false">
    				<v-container>
    					<v-row>
    						<v-col cols="12">
    							<v-text-field
    							  v-model="email"
    							  :error-messages="emailErrors"
                    prepend-icon="mdi-at"
    							  label="E-mail"
    							  required
                    hide-details="auto"
    							  @input="$v.email.$touch()"
    							  @blur="$v.email.$touch()"
    							></v-text-field>
    						</v-col>
    						<v-col cols="12">
    							<v-text-field
  					          v-model="password"
  					          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
  					          :error-messages="passwordErrors"
  					          :type="show ? 'text' : 'password'"
                      prepend-icon="mdi-lock-outline"
  					          label="Password"
  					          @click:append="show = !show"
  					          required
                      hide-details="auto"
  					          @input="$v.password.$touch()"
  					          @blur="$v.password.$touch()"
  					        ></v-text-field>
    						</v-col>
    						<v-col cols="12" class="text-center mt-5">
                  <v-btn
                    color="primary"
                    dark
                    large
                    :loading="processing"
                    min-width="200"
                    @click="submit"> login
                  </v-btn>
    						</v-col>
                <v-col cols="12">
                  <v-flex>
                    <small>Don't have an account?</small>
                    <small><nuxt-link to="/register">Click here to register</nuxt-link></small>
                  </v-flex>
                </v-col>
    					</v-row>
    				</v-container>
    			</form>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

  export default {
    middleware: 'redirect',
	  layout: 'clean',
    mixins: [validationMixin],

    validations: {
      email: { required, email },
      password: { required },
    },

    data: () => ({
      show: false,
      email: '',
      password: '',
      processing: false
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        return errors
      },
    },

    methods: {
      async submit () {
        this.$v.$touch();
        this.processing = true;
        try{
          if(!this.$v.$invalid) {
            await this.$auth.loginWith('laravelSanctum', {
              data: {
                email: this.email,
                password: this.password
              }
            })
            if(this.$auth.user && this.$auth.user.role == 'admin') {
              this.$router.push('/manage')
            }else{
              this.$router.push('/dashboard')
            }
          }
        }catch(error) {
          alert('Invalid credentials');
          this.processing = false;
        }
        this.processing = false;
      },
    },
  }
</script>

<style lang="scss" scoped>
	.login-wrap{
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 100px);
		form{
			max-width: 400px;
			a, button{
				width: 100%;
			}
		}
	}

</style>
