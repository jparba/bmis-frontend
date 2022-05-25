<template>
	<div>
		<v-container>
      <h2 class="mt-2 ml-4">User list</h2>
      <template>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-data-table
          :headers="headers"
          :items="filteredUserList"
          :loading="$fetchState.pending"
          :search="search"
          loading-text="Fetching list of users"
          sort-by="date"
          class="elevation-1 mt-5">

          <template v-slot:item.firstname="{ item }">
            <v-chip
              color="green"
              text-color="white"
              link
              nuxt
              :to="`/manage/user/${item.id}`"
            >
              <v-avatar v-if="item.pic" left>
                <v-img :src="`${$config.laraURL}/accounts/${item.pic}`"></v-img>
              </v-avatar>
              <v-avatar v-else left
                color="red"
                size="40"
              >
                <span class="white--text">{{ firstLetter(item.firstname, item.lastname) }}</span>
              </v-avatar>
              {{ item.firstname }} {{ item.lastname }}
            </v-chip>
          </template>

          <template v-slot:header.status="{ header }">
            {{ header.text }}
            <v-menu offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon small :color="filters[header.value].length ? 'red' : ''">
                    mdi-filter-variant
                  </v-icon>
                </v-btn>
              </template>
              <div style="background-color: white; width: 280px">
                <v-list>
                  <v-list-item>
                    <div v-if="filters.hasOwnProperty(header.value)">
                      <v-autocomplete
                        multiple dense auto-select-first clearable chips small-chips
                        :items="statusType"
                        color="light-blue lighten-3"
                        item-text="type"
                        label="Status"
                        append-icon="mdi-filter"
                        v-model="filters[header.value]"
                      ></v-autocomplete>
                    </div>
                  </v-list-item>
                </v-list>
              </div>
            </v-menu>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
              :color="statusColor(item.status)"
              small
              dark
            >
              {{ status(item.status) }}
            </v-chip>
          </template>

          <template v-slot:item.pic="{ item }">
            <viewer v-if="item.pic" :options="options" @inited="inited" class="viewer" ref="viewer">
              <template #default="scope">
                <img :aspect-ratio="16/9" :src="`${$config.laraURL}/accounts/${item.pic}`">
              </template>
            </viewer>
            <div v-else><small>No photo</small></div>
          </template>

          <template v-slot:item.actions="{ item, index }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="primary"
                  :disabled="item.status != 0"
                  v-bind="attrs"
                  v-on="on"
                  @click ="verify(item.id, 1)"
                >
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
              </template>
              <span>Verify</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="error"
                  :disabled="item.status != 0"
                  v-bind="attrs"
                  v-on="on"
                  @click ="verify(item.id, 2)"
                >
                  <v-icon>mdi-thumb-down</v-icon>
                </v-btn>
              </template>
              <span>Decline</span>
            </v-tooltip>

            <v-menu
              left
              offset-x
            >
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip top>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      icon
                      color="default"
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <span>More</span>
                </v-tooltip>
              </template>
              <v-list class="more-list">
                <v-list-item >
                  <v-list-item-title @click="verify(item.id, 3)">Blocked</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="item.status == 0">
                  <v-list-item-title @click="verify(item.id, 3)">Blocked</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

          </template>
          <template v-slot:no-data>
            <div class="text-center">No data found</div>
          </template>
        </v-data-table>
      </template>
    </v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"

  export default {
    middleware: 'access',
  	layout: 'withMenus',
    components: { Viewer },
  	data(){
  		return {
        search: '',
        filters: { firstname: [], status: [] },
        statusType: [
          { type: 'Unverified', value: 0 },
          { type: 'Verified', value: 1 },
          { type: 'Declined', value: 2 },
          { type: 'Blocked', value: 3 },
          // { type: 'Reupload ID', value: 4 }
        ],
        headers: [
          { text: 'User', align: 'start', sortable: false, value: 'firstname' },
          // { text: 'Brgy. ID', sortable: true, value: 'brgy_id' },
          { text: 'Photo', sortable: false, value: 'pic' },
          { text: 'Status', sortable: true, value: 'status' },
          { text: 'Date', sortable: true, value: 'created_at' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        options: {
          navbar: false,
          toolbar: false,
          title: false
        }
  		}
  	},
    async fetch() {
      await this.fetchUserList()
    },
    computed: {
      ...mapGetters({
        userList: 'admin/userList'
      }),
      filteredUserList(value, search, item) {
        return this.userList.filter((d) => {
          return Object.keys(this.filters).every((f) => {
            return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
          });
        });
      }
    },
  	methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      async fetchUserList() {
        await this.$store.dispatch('admin/fetchUserList')
      },
      async verify(id, status) {
        await this.$store.dispatch('admin/verify', {id, status})
      },
      status(status) {
        return status == 0 ? 'Unverified' : (status == 1? 'Verified' : (status == 2? 'Declined' : (status == 3? 'Blocked' : 'Reupload ID')))
      },
      statusColor(status) {
        return status == 0 ? 'error' : (status == 1? 'success' : (status == 2? 'warning' : 'default'))
      },
      firstLetter(fname, lname) {
        return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`
      },
  	},
  }
</script>

<style lang="scss">
 .more-list{
  & > div{
    cursor: pointer;
  }
 }
 .viewer{
  img{
    object-fit: cover;
    height:35px!important;
    width: 62px;
  }
 }
</style>