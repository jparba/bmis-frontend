<template>
    <v-app>
        <v-navigation-drawer
          v-model="drawer"
          class="light-blue darken-3"
          dark
          fixed
          app
          width="230">
            <v-list nav dense class="p-0">
                <div v-for="(link, i) in links" :key="i">
                    <v-list-item
                        v-if="!link.subLinks"
                        :to="link.to"
                        active-class="light-blue darken-3"
                        class="v-list-item white--text"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ link.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-title v-text="link.text" />
                    </v-list-item>

                    <v-list-group
                        v-else
                        :key="link.text"
                        no-action
                        :prepend-icon="link.icon"
                        :value="false"
                    >
                        <template v-slot:activator>
                          <v-list-item-title>{{ link.text }}</v-list-item-title>
                         </template>

                        <v-list-item
                            v-for="sublink in link.subLinks"
                            :to="sublink.to"
                            :key="sublink.text"
                        >
                            <v-list-item-icon>
                              <v-icon>{{ sublink.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ sublink.text }}</v-list-item-title>
                        </v-list-item>
                    </v-list-group>
                </div>
            </v-list>
            <template v-slot:append>
              <div class="pa-2">
                <v-btn block @click="logout">
                  Logout
                </v-btn>
              </div>
            </template>
        </v-navigation-drawer>

        <v-main>
          <div class="menu_header d-flex align-center">
            <v-icon large color="white" @click="drawer = !drawer">mdi-menu</v-icon>
            <div class="ml-auto d-flex align-center">
              <!-- <v-chip color="green"text-color="white"> -->
                <v-avatar left color="red mr-2"size="30">
                  <span class="white--text">AD</span>
                </v-avatar>
              <!-- </v-chip> -->

              <p class="mb-0">{{ $auth.user.email }}</p>
            </div>
          </div>

          <v-container>
            <nuxt />
          </v-container>

        </v-main>
    </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    links: [
        {
            to     : '/manage/dashboard',
            icon   : 'mdi-view-dashboard',
            text   : 'Dashboard',
        },
        {
            icon     : 'mdi-account-box',
            text     : 'Profiling',
            subLinks : [
                // {
                //     to     : '/manage/business',
                //     icon   : 'mdi-view-dashboard',
                //     text   : 'Business',
                // },
                {
                    to     : '/manage/officials',
                    icon   : 'mdi-account-cowboy-hat-outline',
                    text   : 'Officials',
                },
                /*{
                    to     : '/manage/household',
                    icon   : 'mdi-view-dashboard',
                    text   : 'Household',
                },*/
            ]
        },
        {
            icon     : 'mdi-application',
            text     : 'Management',
            subLinks : [
                {
                    to     : '/manage/user',
                    icon   : 'mdi-account-outline',
                    text   : 'User',
                },
                // {
                //     to     : '/manage/vawc',
                //     icon   : 'mdi-view-dashboard',
                //     text   : 'VAWC',
                // },
                // {
                //     to     : '/manage/blotter',
                //     icon   : 'mdi-view-list',
                //     text   : 'Blotter',
                // },
                {
                    to     : '/manage/resident',
                    icon   : 'mdi-account-settings-outline',
                    text   : 'Resident',
                },
                {
                    to     : '/manage/request-verification',
                    icon   : 'mdi-file-sign',
                    text   : 'Request verification',
                },
                {
                    to     : '/manage/events-announcements',
                    icon   : 'mdi-bullhorn-outline',
                    text   : 'Events & Announcement',
                },
            ]
        },
        /*{
            to     : '/manage/send',
            icon   : 'mdi-email-fast-outline',
            text   : 'Send SMS',
        },*/
        /*{
            to     : '/manage/complaints-feedbacks',
            icon   : 'mdi-view-dashboard',
            text   : 'Complaints & Feedbacks',
        },*/
    ]
  }),
  methods: {
    async logout() {
        await this.$auth.logout('laravelSanctum')
        this.$router.push('/login')
    }
  }
}
</script>

<style>
.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action > .v-list-group__items > .v-list-item {
  padding: 0 8px;
}
.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child{
    margin-right: 12px;
}
.menu_header{
  position: relative;
  color: #fff;
  padding: 10px;
  background-color: #4a75ee;
  z-index: 10;
}
.v-application .v-list--nav{
    padding: 0;
}
.v-application .v-list--nav .v-list-item{
    color: #fff;
}
</style>