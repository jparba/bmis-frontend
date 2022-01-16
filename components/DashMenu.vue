<template>
  <v-card
    tile
    class="wrap_dash_menu"
  >
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ $auth.user.firstname }} {{ $auth.user.lastname }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.route"
            class="dash_menu"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click.prevent="logout"
            class="dash_menu"
          >
            <v-list-item-icon>
              <v-icon>mdi-message-alert</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: 'My Account', icon: 'mdi-folder', route: '/myAccount' },
        { text: 'Resident Information', icon: 'mdi-check-circle', route: '/resident' },
        { text: 'Request', icon: 'mdi-account-multiple', route: '/request' },
        { text: 'Notification', icon: 'mdi-star', route: '/' },
        { text: 'Feedback', icon: 'mdi-history', route: '/' },
        { text: 'Uploads', icon: 'mdi-upload', route: '/' },
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

<style>
  .v-application .v-list--nav .v-list-item.dash_menu.v-list-item--active{
    background-color: #7c39d9;
  }
  .wrap_dash_menu aside{ width: 100%!important }
</style>