<template>
	<div>
		<v-container>
      <h2 class="mt-2 ml-4">Request list</h2>
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
          :items="requestList"
          :loading="$fetchState.pending"
          :search="search"
          loading-text="Fetching list of requests"
          sort-by="date"
          class="elevation-1 mt-5"
        >

          <template v-slot:item.firstname="{ item }">
            <v-chip
              color="green"
              text-color="white"
              target="_blank"
            >
              <v-avatar v-if="item.user.pic" left>
                <v-img :src="`${$config.laraURL}/accounts/${item.pic}`"></v-img>
              </v-avatar>
              <v-avatar v-else left
                color="red"
                size="40"
              >
                <span class="white--text">{{ firstLetter(item.user.firstname, item.user.lastname) }}</span>
              </v-avatar>
              {{ item.user.firstname }} {{ item.user.lastname }}
            </v-chip>
          </template>

          <template v-slot:item.type="{ item }">
            <div v-text="getType(item.type)"></div>
          </template>

          <template v-slot:item.status="{ item }">
            <v-chip
              :color="getColor(item.status)"
              small
              dark
            >
              {{ getStatus(item.status) }}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item, index }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="primary"
                  :disabled="item.status != 1"
                  @click.prevent="approve(item.id, index)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
              </template>
              <span>Approve</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="error"
                  :disabled="item.status != 1"
                  @click.prevent="reject(item.id, index)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-close-thick</v-icon>
                </v-btn>
              </template>
              <span>Reject</span>
            </v-tooltip>

            <v-tooltip v-if="item.type != 3" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="warning"
                  :disabled="item.status == 3 || item.status == 4"
                  @click.prevent="[pdfType = item.type, pdfLoader = true, generateReport(item)]"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-printer</v-icon>
                </v-btn>
              </template>
              <span>Print</span>
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
                      :disabled="item.status == 3 || item.status == 4"
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
                <v-list-item>
                  <v-list-item-title>View Profile</v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="item.type == 5 || item.type == 6"
                  @click='[purpose = true, setRequestData(item) ]'
                >
                  <v-list-item-title>Edit Purpose</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="showAttachment(item)">
                  <v-list-item-title>View Attachment</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:no-data>
            <div class="text-center">No data found</div>
          </template>
        </v-data-table>
      </template>

      <client-only>
          <vue-html2pdf
              :show-layout="false"
              :float-layout="true"
              :enable-download="false"
              :preview-modal="true"
              :paginate-elements-by-height="1400"
              :pdf-quality="2"
              :manual-pagination="false"
              pdf-format="a4"
              pdf-orientation="portrait"
              pdf-content-width="800px"
              :html-to-pdf-options="htmlToPdfOptions"
              @progress="onProgress($event)"
              ref="html2Pdf"
          >
              <section slot="pdf-content">
                <div v-if="pdfType == 2">
                    <barangay-certificate :userData="userData" />
                </div>
                <div v-else>
                    <barangay-clearance :userData="userData" />
                </div>
              </section>
          </vue-html2pdf>
      </client-only>

      <v-dialog
        v-model="pdfLoader"
        hide-overlay
        persistent
        width="300"
      >
        <v-card
          color="warning"
          dark
        >
          <v-card-text>
            Generating PDF please wait...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="purpose"
        persistent
        width="400"
        max-width="400"
      >
        <v-card>
          <v-card-title class="text-h5">
            Edit Purpose
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="formData.purposeTxt"
              single-line
              hide-details
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              text
              :disabled="processing"
              @click="purpose = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              :loading="processing"
              @click="updatePurposeRequest()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarangayCertificate from '~/components/pdf/BarangayCertificate'
import BarangayClearance from '~/components/pdf/BarangayClearance'

  export default {
    middleware: 'access',
  	layout: 'withMenus',
  	components: { BarangayCertificate, BarangayClearance },
  	data(){
  		return {
        processing: false,
        pdfType: null,
        pdfLoader: false,
        purpose: false,
        search: '',
        userData: {},
        headers: [
          { text: 'User', align: 'start', sortable: false, value: 'firstname' },
          { text: 'Type', align: 'start', sortable: false, value: 'type' },
          { text: 'Status', sortable: true, value: 'status' },
          { text: 'Date', value: 'created_at' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        formData: {
          purposeID: null,
          purposeTxt: '',
        },
        htmlToPdfOptions: {
            enableLinks: false,
            html2canvas: {
                scale: 1,
                useCORS: true
            },
            jsPDF: {
                unit: 'in',
                format: 'a4',
                orientation: 'portrait'
            }
        },
  		}
  	},
    async fetch() {
      await this.fetchBrgyCapt()
      await this.fetchRequestList()
    },
    computed: {
      ...mapGetters({
        brgycapt: 'admin/brgycapt',
        requestList: 'admin/requestList'
      })
    },
  	methods: {
      showAttachment(item) {
        let type = [1,5]
        return type.includes(item.type)
      },
      setRequestData(item) {
        this.formData.purposeID = item.id
        this.formData.purposeTxt = item.purpose
      },
      async fetchBrgyCapt() {
        await this.$store.dispatch('admin/fetchBrgyCapt')
      },
      async fetchRequestList() {
        await this.$store.dispatch('admin/fetchRequestList')
      },
      async updatePurposeRequest() {
        this.processing = true
        await this.$store.dispatch('admin/updatePurposeRequest', this.formData)
        this.processing = false
        this.purpose = false
      },
      async approve(id, index, status=2) {
        await this.$store.dispatch('admin/updateStatusRequest', { id, index, status })
      },
      async reject(id, index, status=3) {
        await this.$store.dispatch('admin/updateStatusRequest', { id, index, status })
      },
      async generateReport(item) {
          this.userData = item
          this.userData.brgycapt = `${this.brgycapt.firstname} ${this.brgycapt.lastname}`
          this.userData.brgycaptSignature = `${this.brgycapt.signature}`
          this.$refs.html2Pdf.generatePdf()
      },
      getColor(status) {
        if (status == '3') return 'red'
        else if (status == '4') return 'red accent-4'
        else if (status == '1') return 'orange'
        else return 'green'
      },
      getStatus(status) {
        switch (status) {
          case 1:
            return 'Pending'
          break;
          case 2:
            return 'Approved'
          break;
          case 3:
            return 'Rejected'
          break;
          case 4:
            return 'Cancelled'
          break;
        }
      },
      getType(type) {
        switch (type) {
          case 1:
            return 'Barangay certificate'
          break;
          case 2:
            return 'Barangay certificate with cedula'
          break;
          case 3:
            return 'Cedula'
          break;
          case 4:
            return 'Certificate of indigency'
          break;
          case 5:
            return 'Barangay clearance'
          break;
          case 6:
            return 'Barangay clearance with cedula'
          break;
        }
      },
      onProgress(e) {
        this.pdfLoader = e != 100 ? true : false
      },
      firstLetter(fname, lname) {
        return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`
      },
  	},
  }
</script>

<style lang="scss">
 .v-main__wrap .vue-html2pdf .pdf-preview{
  width: 85%!important;
  height: 90vh!important;
  top: 30px!important;
 }
 .more-list{
  & > div{
    cursor: pointer;
  }
 }
</style>