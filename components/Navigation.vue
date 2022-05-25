<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dark
    >
      <v-toolbar-title><nuxt-link to="/" class="white--text hidden-xs-only">Barangay San Teodoro</nuxt-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <ul class="nav-links hidden-xs-only">
      	<li><nuxt-link to="/#officials">Officials</nuxt-link></li>
      	<li><nuxt-link to="/#eventsAnnouncements">Announcements</nuxt-link></li>
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
                    <v-avatar v-if="$auth.user.pic" size="38" class="mr-2">
                      <img
                        :src="`${$config.laraURL}/accounts/${$auth.user.pic}`"
                        :alt="firstLetter($auth.user.firstname, $auth.user.lastname)"
                      >
                    </v-avatar>
                    <v-avatar v-else color="red" size="38" class="mr-2">
                      <span class="white--text">{{ firstLetter($auth.user.firstname, $auth.user.lastname) }}</span>
                    </v-avatar>

                      <p class="white--text mb-0">{{ $auth.user.email }}</p>
                      <v-icon class="white--text">mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-avatar v-if="$auth.user.pic" size="38" class="mr-2">
                          <img
                            :src="`${$config.laraURL}/accounts/${$auth.user.pic}`"
                            :alt="firstLetter($auth.user.firstname, $auth.user.lastname)"
                          >
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else color="red" size="38" class="mr-2">
                          <span class="white--text">{{ firstLetter($auth.user.firstname, $auth.user.lastname) }}</span>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>{{ $auth.user.firstname }} {{ $auth.user.lastname }}</v-list-item-title>
                          <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <v-list-item
                      v-for="(item, i) in items"
                      :key="i"
                      dense
                      :to="$auth.user && $auth.user.status != 1? '/accountStatus' : item.link"
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
                        <v-list-item-title>Logout <v-progress-circular v-if="logoutLoader" class="ml-2" width="2" size="15" color="primary" indeterminate></v-progress-circular></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-menu>
        </li>
      </ul>

      <v-app-bar-nav-icon @click.stop="spdrawer = !spdrawer" class="hidden-sm-and-up"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="spdrawer"
      absolute
      temporary
    >
      <v-list-item v-if="$auth.user">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>BMS</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          link
          :to="$auth.user && $auth.user.status != 1? '/accountStatus' : item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    data: () => ({
      menu: false,
      spdrawer: false,
      logoutLoader: false,
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
          this.logoutLoader = true;
          await this.$auth.logout('laravelSanctum')
          this.$router.push('/login')
      },
      firstLetter(fname, lname) {
        return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`
      }
    }
  }
</script>

<style lang="scss">
</style>