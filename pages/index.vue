<template>
  <div>
    <navigation />
    <VueSlickCarousel v-bind="slickOptions" :arrows="true" :dots="true">
      <img src="~/assets/img/banner1.jpg" />
      <img src="~/assets/img/banner2.jpg" />
      <img src="~/assets/img/banner3.jpg" />
      <img src="~/assets/img/banner4.jpg" />
    </VueSlickCarousel>

    <h2 id="officials" class="text-center mt-10">Barangay Officials</h2>
    <div v-if="pendingBO" class="container mb-5">
      <v-row class="mt-5">
        <v-col v-for="n in 8" :key="n" cols="12" md="3">
          <v-skeleton-loader
            type="card-avatar"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-else class="container mb-12">
      <v-row>
        <v-col v-for="(ol, k) in officialList" :key="k" cols="12" md="3">
          <template>
            <v-card
              :loading="loading"
              class="mx-auto my-2"
              max-width="374"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>

              <v-card-title class="pb-0">{{ `${ol.firstname} ${ol.lastname}` }}</v-card-title>

              <v-card-text>
                <div class="text-subtitle-1">
                  {{ ol.position }}
                </div>

              </v-card-text>

              <v-divider class="mx-4"></v-divider>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </div>

    <h2 id="eventsAnnouncements" class="text-center mt-10">Event and Announcement</h2>
    <div v-if="pendingEA" class="container mb-5">
      <v-row class="mt-5">
        <v-col v-for="n in 2" :key="n" cols="12" md="12">
          <v-skeleton-loader
            type="article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-else class="container mb-12">
      <ul class="ea-list">
        <li v-for="(ea, k) in eventAnnouncementList" :key="k" >
          <nuxt-link :to="`/events-announcements/${ea.id}`">
            <div>2022.03.16
              <v-chip
                :color="ea.type=='Event'?'warning':'green'"
                text-color="white"
                small
                class="ml-2"
              >
                {{ ea.type }}
              </v-chip>
            </div>
            <div>
              <p>{{ ea.title }}</p>
              <div v-html="ea.content"></div>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  layout: 'clean',
  components: {
    Navigation,
    VueSlickCarousel
  },
  data() {
    return {
      loading: false,
      pendingBO: true,
      pendingEA: true,
      slickOptions: {
        arrows: true,
        autoplay: true,
        speed: 1000,
        fade: true,
        autoplaySpeed: 2000,
      },
      officialList: [],
      eventAnnouncementList: []
    }
  },
  methods: {
    async getOfficialList() {
      await this.$api.get('getOfficialList').then((res) => {
        this.officialList = res.data
        this.pendingBO = false
      })
    },
    async getEventAnnouncementList() {
      await this.$api.get('getEventAnnouncementList').then((res) => {
        this.eventAnnouncementList = res.data
        this.pendingEA = false
      })
    },
  },
  mounted() {
    this.getOfficialList()
    this.getEventAnnouncementList()
  }
}
</script>

<style lang="scss">
  .slick-slider{
    .slick-slide{
      div{
        height: 70vh;
        img{
          object-fit: cover;
        }
      }
    }
  }

  .ea-list{
    padding: 20px 50px 0;
    li{
      border-bottom: 1px solid #e9e9e9;
      padding: 30px 0;
      a{
        color: #1d1d1d;
        display: flex;
        & > div {
          &:first-child{
            flex-basis: 200px; font-size: 14px;
          }
          &:last-child{
            flex-basis: calc(100% - 200px);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            & > p{
              margin-bottom: 0;
              &:first-child{
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
</style>
