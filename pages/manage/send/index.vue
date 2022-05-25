<template>
	<div>
		<v-container>
      <div class="d-flex align-center">
        <h2 class="mt-2">Send SMS</h2>
      </div>
      <v-card class="pa-10 mt-5">
        <v-row>
          <v-col md="2">
            <label>Phone number</label>
          </v-col>
          <v-col cols="10">
            <v-autocomplete
              v-model="phoneNumbers"
              :items="residentList"
              outlined
              required
              hide-details="auto"
              chips
              color="blue-grey lighten-2"
              item-text="firstname"
              item-value="phone"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar v-if="data.item.pic" left>
                    <v-img :src="`${$config.laraURL}/accounts/${data.item.pic}`"></v-img>
                  </v-avatar>
                  <v-avatar v-else left
                    color="red"
                    size="35"
                    class="mr-2"
                  >
                    <span class="white--text">{{ firstLetter(data.item.firstname, data.item.lastname) }}</span>
                  </v-avatar>
                  {{ data.item.firstname }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-avatar v-if="data.item.pic" left>
                    <v-img :src="`${$config.laraURL}/accounts/${data.item.pic}`"></v-img>
                  </v-avatar>
                  <v-avatar v-else left
                    color="red"
                    size="35"
                    class="mr-2"
                  >
                    <span class="white--text">{{ firstLetter(data.item.firstname, data.item.lastname) }}</span>
                  </v-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.firstname"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.phone"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col md="2">
            <label>Sms content</label>
          </v-col>
          <v-col md="10">
            <v-textarea
              outlined
              v-model="announcement.smscontent"
            ></v-textarea>
          </v-col>
          <v-col md="12" class="text-center">
            <v-btn
              color="blue darken-1"
              class="white--text my-5"
              :loading="processing"
              @click="submit"
              min-width="200"
            >
              Send
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
  export default {
    middleware: 'access',
  	layout: 'withMenus',
    mixins: [validationMixin],
  	components: { },
    validations: {
      announcement: {
        title: { required },
        content: { required }
      }
    },
    async fetch() {
      await this.$store.dispatch('admin/fetchResidentList')
    },
  	data(){
  		return {
        processing: false,
        announcement: {
          title: '',
          type: null,
          content: '',
          smscontent: ''
        },
        phoneNumbers: [],
  		}
  	},
    head () {
       return {
         title: 'Send SMS | BMS'
       }
    },
    computed: {
      ...mapGetters({
        residentList: 'admin/residentList'
      }),
      residentAutocomplete() {
        return this.residentList;
      },
      titleErrors () {
        const errors = []
        if (!this.$v.announcement.title.$dirty) return errors
        !this.$v.announcement.title.required && errors.push('Title is required')
        return errors
      },
      contentErrors () {
        const errors = []
        if (!this.$v.announcement.content.$dirty) return errors
        !this.$v.announcement.content.required && errors.push('Content is required')
        return errors
      },
    },
  	methods: {
      async submit() {
        this.$v.$touch();
        if(!this.$v.$invalid) {
          this.processing = true

          await this.$store.dispatch('admin/newEventAnnouncement', this.announcement)
          this.processing = false
        }
      },
      remove(item) {
        // let residentList = { ...this.residentList }
        // const index = this.residentList.indexOf(item)
        // this.$store.commit('admin/UPDATERESIDENTLIST', index);

       const index = this.phoneNumbers.indexOf(item.name)
       if (index >= 0) this.phoneNumbers.splice(index, 1)
      },
      firstLetter(fname, lname) {
        return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`
      },
  	},
  }
</script>

<style lang="scss" scoped>
  textarea{
    width: 100%;
    height: 300px;
    border: 1px solid rgba(0, 0, 0, 0.42);
    resize: none;
    border-radius: 5px
  }
</style>