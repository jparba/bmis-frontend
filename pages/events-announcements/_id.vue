<template>
	<div>
		<navigation />
		<div class="container mb-12">
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
			<div v-else class="mt-4 d-flex align-center">
				<h1>{{ announcement.title }}</h1>
				<v-chip
				  class="ma-2"
				  small
				  :color="announcement.type == 'Event' ? 'warning' : 'green'"
				  text-color="white"
				>
				  {{ announcement.type }}
				</v-chip>
			</div>
			<div v-html="announcement.content" class="mt-3"></div>
		</div>

</div>
</template>
<script>
import Navigation from '~/components/Navigation.vue'
export default {
  layout: 'clean',
  components: {
    Navigation,
  },

  async fetch() {
    await this.fetchSingleEA(this.$route.params.id)
  },

  fetchOnServer: false,

  data() {
    return {
    	announcement: {
    	  id: null,
    	  title: '',
    	  type: null,
    	  content: '',
    	}
    }
  },
  methods: {
    async fetchSingleEA(id) {
      await this.$api.post(`EAsingle/${id}`).then(res => {
        this.announcement.id = res.data.id
        this.announcement.title = res.data.title
        this.announcement.type = res.data.type;
        this.announcement.content = res.data.content
      })
    },
  },
}
</script>
