<template>
	<div>
		<v-container>
      <div class="d-flex align-center">
        <h2 class="mt-2">Edit Events and Announcements</h2>
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
      <v-card v-else class="pa-10 mt-5">
        <v-row>
          <v-col md="2">
            <label>Title</label>
          </v-col>
          <v-col md="10">
            <v-text-field
              v-model="announcement.title"
              :error-messages="titleErrors"
              outlined
              required
              hide-details="auto"
              @input="$v.announcement.title.$touch()"
              @blur="$v.announcement.title.$touch()"
            ></v-text-field>
          </v-col>
          <v-col md="2">
            <label>Type</label>
          </v-col>
          <v-col md="10">
            <v-radio-group
              v-model="announcement.type"
              row
              hide-details="auto"
            >
              <v-radio
                label="Event"
                :value="1"
              ></v-radio>
              <v-radio
                label="Announcement"
                :value="2"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col md="2">
            <label>Content</label>
          </v-col>
          <v-col md="10">
            <editor
              v-model="announcement.content"
              api-key="zkoma8houg37oxgnyzszul0spd5885cta2c87dvjjbto3ja0"
              :init="{plugins: 'wordcount'}"
            />
          </v-col>
          <v-col md="12" class="text-center">
            <v-btn
              color="blue darken-1"
              class="white--text my-5"
              :loading="processing"
              @click="submit"
              min-width="200"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
	</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import Editor from '@tinymce/tinymce-vue'
  export default {
    middleware: 'access',
  	layout: 'withMenus',
    mixins: [validationMixin],
  	components: { Editor },
    validations: {
      announcement: {
        title: { required },
        content: { required }
      }
    },

    async fetch() {
      await this.fetchSingleEA(this.$route.params.id)
    },

    fetchOnServer: false,

  	data(){
  		return {
        processing: false,
        announcement: {
          id: null,
          title: '',
          type: null,
          content: '',
        }
  		}
  	},
    head () {
       return {
         title: 'New events and announcements | BMS'
       }
    },
    computed: {
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
          await this.$store.dispatch('admin/updateEventAnnouncement', this.announcement)
          this.processing = false
        }
      },
      async fetchSingleEA(id) {
        await this.$api.post(`singleEA/${id}`).then(res => {
          this.announcement.id = res.data.id
          this.announcement.title = res.data.title
          this.announcement.type = res.data.type == 'Event'? 1 : 2;
          this.announcement.content = res.data.content
        })
      }
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