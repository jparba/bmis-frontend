<template>
	<div>
		<v-container>
      <v-row dense>
      	<v-col cols="12" md="12">
      		<v-row class="dash_summary">
		        <v-col cols="12" md="6" class="pb-0">
		          <v-card
		            dark
		            class="pa-4 dash_data"
		            style="background-image: linear-gradient(to right, #4ab9ee, #4f54e8);"
		          >
		            <h3>Household</h3>
		            <p class="mb-0">0,000</p>
		            <v-icon class="icon" size="70px">mdi-chart-histogram</v-icon>
		          </v-card>
		        </v-col>

		        <v-col cols="12" md="6" class="pb-0">
		          <v-card
		            dark
		            class="pa-4 dash_data"
		            style="background-image: linear-gradient(to right, #ff9c4c, #ff6275);"
		          >
		            <h3>Residents</h3>
		            <p class="mb-0">00,000.00</p>
		            <v-icon class="icon" size="70px">mdi-currency-php</v-icon>
		          </v-card>
		        </v-col>

		        <v-col cols="12" md="6" class="pb-0">
		          <v-card
		            dark
		            class="pa-4 dash_data"
		            style="background-image: linear-gradient(to right, #fe999d, #ea484d);"
		          >
		            <h3>Blotter</h3>
		            <p class="mb-0">00,000.00</p>
		            <v-icon class="icon" size="70px">mdi-chart-bell-curve</v-icon>
		          </v-card>
		        </v-col>

		        <v-col cols="12" md="6" class="pb-0">
		          <v-card
		            dark
		            class="pa-4 dash_data"
		            style="background-image: linear-gradient(to right, #65ded9, #ae90c4);"
		          >
		            <h3>Male</h3>
		            <p class="mb-0">00,000.00</p>
		            <v-icon class="icon" size="70px">mdi-chart-bell-curve</v-icon>
		          </v-card>
		        </v-col>

		        <v-col cols="12" md="6" class="pb-0">
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
		        </v-col>
      		</v-row>
      	</v-col>
      </v-row>
    </v-container>
	</div>
</template>

<script>
  export default {
  	middleware: 'access',
  	layout: 'withMenus',
  	components: { },
  	data(){
  		return {
  		}
  	},
  	methods: {
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