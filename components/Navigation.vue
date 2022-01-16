<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dark
    >
      <v-toolbar-title><nuxt-link to="/" class="white--text">Barangay San Theodoro</nuxt-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <ul class="nav-links">
      	<li><nuxt-link to="/">Coronavirus</nuxt-link></li>
      	<li><nuxt-link to="/">Jobs</nuxt-link></li>
      	<li><nuxt-link to="/">Officials</nuxt-link></li>
      	<li><nuxt-link to="/">Announcements</nuxt-link></li>
      	<li v-if="!$auth.user">
          <nuxt-link to="/login">Login</nuxt-link>
        </li>
        <li v-else>
            <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-width="100"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      text
                      color="deep-purple accent-4 mr-0"
                    >
                      <v-avatar size="38px" class="mr-2">
                         <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="user-avatar">
                       </v-avatar>
                      <p class="white--text mb-0">{{ $auth.user.username }}</p>
                      <v-icon class="white--text">mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-avatar>
                          <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="John"
                          >
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>{{ $auth.user.username }}</v-list-item-title>
                          <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      dense
                      :to="item.link"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                      dense
                      @click.prevent="logout"
                    >
                      <v-list-item-icon>
                        <v-icon>mdi-message-alert</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-menu>
        </li>
      </ul>

    </v-app-bar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      menu: false,
      items: [
        { text: 'Dashboard', icon: 'mdi-account', link: '/dashboard' },
        { text: 'My Account', icon: 'mdi-account', link: '/myAccount' },
        { text: 'Request', icon: 'mdi-file-document-multiple', link: '/request' },
        { text: 'Notification', icon: 'mdi-bell-ring', link: '/notification' },
        { text: 'Feedback', icon: 'mdi-message-alert', link: '/feedback' },
      ],
    }),
    methods: {
      async logout() {
          await this.$auth.logout('laravelSanctum')
          this.$router.push('/login')
      }
    }
  }
</script>

<style lang="scss">
</style>