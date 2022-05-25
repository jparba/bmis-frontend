<template>
	<div>
		<v-container>
			<v-row class="mt-5" v-if="$fetchState.pending">
			  <v-col v-for="n in 6" :key="n" cols="12"md="6">
			    <v-skeleton-loader
			      type="card-avatar"
			    ></v-skeleton-loader>
			  </v-col>
			</v-row>
			<v-row v-else-if="$fetchState.error">
			  <v-col cols="12"md="12">
			    <error-view />
			  </v-col>
			</v-row>
      <v-row v-else dense>
      	<v-col cols="12" md="12">
      		<v-row class="dash_summary">
		        <!-- <v-col cols="12" md="6" class="pb-0">
		          <v-card
		            dark
		            class="pa-4 dash_data"
		            style="background-image: linear-gradient(to right, #4ab9ee, #4f54e8);"
		          >
		            <h3>Household</h3>
		            <p class="mb-0">0,000</p>
		            <v-icon class="icon" size="70px">mdi-chart-histogram</v-icon>
		          </v-card>
		        </v-col> -->

		        <v-col cols="12" md="6" class="pb-0">
		        	<nuxt-link to="/manage/request-verification">
			          <v-card
			            dark
			            class="pa-4 dash_data"
			            style="background-image: linear-gradient(to right, #4ab9ee, #4f54e8);"
			          >
			            <h3>Request</h3>
			            <p class="mb-0">{{ dashData.request }}</p>
			            <v-icon class="icon" size="70px">mdi-chart-histogram</v-icon>
			          </v-card>
			        </nuxt-link>
		        </v-col>

		        <v-col cols="12" md="6" class="pb-0">
		        	<nuxt-link to="/manage/resident">
			          <v-card
			            dark
			            class="pa-4 dash_data"
			            style="background-image: linear-gradient(to right, #ff9c4c, #ff6275);"
			          >
			            <h3>Residents</h3>
			            <p class="mb-0">{{ dashData.resident }}</p>
			            <v-icon class="icon" size="70px">mdi-currency-php</v-icon>
			          </v-card>
			        </nuxt-link>
		        </v-col>

		        <v-col cols="12" md="6" class="pb-0">
		        	<nuxt-link to="/manage/user">
			          <v-card
			            dark
			            class="pa-4 dash_data"
			            style="background-image: linear-gradient(to right, #fe999d, #ea484d);"
			          >
			            <h3>Users</h3>
			            <p class="mb-0">{{ dashData.user }}</p>
			            <v-icon class="icon" size="70px">mdi-chart-bell-curve</v-icon>
			          </v-card>
			        </nuxt-link>
		        </v-col>

		        <v-col cols="12" md="6" class="pb-0">
		        	<nuxt-link to="/manage/events-announcements">
			          <v-card
			            dark
			            class="pa-4 dash_data"
			            style="background-image: linear-gradient(to right, #fe999d, #ea484d);"
			          >
			            <h3>Events & Announcements</h3>
			            <p class="mb-0">{{ dashData.announcement }}</p>
			            <v-icon class="icon" size="70px">mdi-chart-bell-curve</v-icon>
			          </v-card>
			        </nuxt-link>
		        </v-col>

		        <!-- <v-col cols="12" md="6" class="pb-0">
		        	<nuxt-link to="/manage/complaint-feedback">
			          <v-card
			            dark
			            class="pa-4 dash_data"
			            style="background-image: linear-gradient(to right, #65ded9, #ae90c4);"
			          >
			            <h3>Complaints</h3>
			            <p class="mb-0">to do</p>
			            <v-icon class="icon" size="70px">mdi-chart-bell-curve</v-icon>
			          </v-card>
			        </nuxt-link>
		        </v-col> -->

		        <!-- <v-col cols="12" md="6" class="pb-0">
		          <v-card
		            dark
		            class="pa-4 dash_data"
		            style="background-image: linear-gradient(to right, #ffaf98, #f43561);"
		          >
		            <h3>Female</h3>
		            <p class="mb-0">00,000.00</p>
		            <v-icon class="icon" size="70px">mdi-chart-bell-curve</v-icon>
		          </v-card>
		        </v-col>

		        <v-col cols="12" md="6" class="pb-0">
		          <v-card
		            dark
		            class="pa-4 dash_data"
		            style="background-image: linear-gradient(to right, #8e64f6, rgb(244, 53, 97);"
		          >
		            <h3>Business</h3>
		            <p class="mb-0">00,000.00</p>
		            <v-icon class="icon" size="70px">mdi-chart-bell-curve</v-icon>
		          </v-card>
		        </v-col> -->
      		</v-row>
      	</v-col>
      </v-row>
    </v-container>
	</div>
</template>

<script>
import ErrorView from '~/components/ErrorView.vue'
  export default {
  	middleware: 'access',
  	layout: 'withMenus',
  	components: { ErrorView },
  	async fetch() {
  		 await this.fetchDashboardData()
  	},
  	fetchOnServer: false,
  	data(){
  		return {
  			dashData : {}
  		}
  	},
  	methods: {
  		async fetchDashboardData() {
  			await this.$api.get('/dashboardData').then((res) => {
  				this.dashData = res.data.data
  			})
  		}
  	},
  }
</script>

<style lang="scss" scoped>
	.dash_summary{
		& > div:nth-child(odd) {
			padding-right: 0;
		}
		.dash_data{
			h3{
				font-size: 22px;
		    font-weight: 300;
		    text-transform: uppercase;
			}
			p{
				font-weight: bold;
				font-size: 28px;
			}
			.icon{
				position: absolute;
				top: 0;
		    right: 30px;
		    bottom: 0;
		    opacity: 0.4;
			}
		}
	}
</style>