<template>
  <div>
    <v-container>
      <div class="d-flex align-center">
        <h2 class="mt-2">Event & Announcement list</h2>
        <v-btn rounded
          color="primary"
          class="ml-auto"
          nuxt
          link
          to="events-announcements/new"
        >
          <v-icon left> mdi-plus </v-icon> Add new
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
         <ul v-if="eventAnnouncement.length > 0" class="ea-list pl-0 mt-8 d-flex flex-column">
           <li v-for="(ea, k) in eventAnnouncement" :key="k" class="mb-3">
               <v-card
                   class="mx-auto d-flex"
                   max-width="100%"
                   outlined
                 >
             <nuxt-link :to="`/manage/events-announcements/edit/${ea.id}`">
                 <div class="d-flex align-center">
                   <div class="ml-2 pa-3">
                    <div class="d-flex">
                     <h2>{{ ea.title }} <span></span></h2>
                      <v-chip
                        class="ma-2"
                        small
                        :color="ea.type == 'Event' ? 'warning' : 'green'"
                        text-color="white"
                      >
                        {{ ea.type }}
                      </v-chip>
                    </div>
                     <div class="content" v-html="ea.content"></div>
                     <small>Posted date: {{ ea.created_at }}</small>
                   </div>
                 </div>
                 </nuxt-link>
                 <div class="ml-auto actions">
                   <v-tooltip top>
                     <template v-slot:activator="{ on, attrs }">
                       <v-btn
                         icon
                         color="default"
                         v-bind="attrs"
                         v-on="on"
                         @click.stop="hideUnhideAnnouncement(ea.id, ea.hidden, k)"
                       >
                         <v-icon v-if="ea.hidden==1">mdi-eye-off-outline</v-icon>
                         <v-icon v-else>mdi-eye-outline</v-icon>
                       </v-btn>
                     </template>
                     <span>{{ ea.hidden?'Unhide' : 'Hide' }} from top page</span>
                   </v-tooltip>

                   <v-tooltip top>
                     <template v-slot:activator="{ on, attrs }">
                       <v-btn
                         icon
                         color="error"
                         v-bind="attrs"
                         v-on="on"
                         @click.stop="deleteAnnouncement(ea.id, k)"
                       >
                         <v-icon>mdi-delete-outline</v-icon>
                       </v-btn>
                     </template>
                     <span>Delete</span>
                   </v-tooltip>
                 </div>
                 </v-card>
            </li>
         </ul>
        <div v-else class="d-flex flex-column align-center mt-10">
          <img src="~/assets/img/undraw_web_search_re_efla.svg" alt="" width="500">
          <h2>No data found</h2>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ErrorView from '~/components/ErrorView.vue'

  export default {
    middleware: 'access',
    layout: 'withMenus',
    components: { ErrorView },
    data(){
      return {
      }
    },

    async fetch() {
      await this.fetchNewEventAnnouncementList()
    },

    fetchOnServer: false,

    computed: {
      ...mapGetters({
        eventAnnouncement: 'admin/eventAnnouncement'
      })
    },

    methods: {
      async fetchNewEventAnnouncementList() {
        await this.$store.dispatch('admin/fetchNewEventAnnouncementList')
      },
      async deleteAnnouncement(id, index) {
        await this.$store.dispatch('admin/deleteAnnouncement', {id, index})
      },
      async hideUnhideAnnouncement(id, value, index) {
        await this.$store.dispatch('admin/hideUnhideAnnouncement', {id, value, index})
      },
    },
  }
</script>

<style>
  .ea-list a{ width: 100%; color: #333; }
  .ea-list .actions{ width: 90px }
  .ea-list .content{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>