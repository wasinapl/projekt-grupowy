<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <router-link :to="{ name: 'home' }" tag="span">
          <span class="hidden-sm-and-down" style="cursor: pointer;"
            >Projekt</span
          >
        </router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-chip class="ma-2" color="teal" text-color="white" link>
        <v-avatar left>
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
        {{ currentUser.username }}
      </v-chip>
      <v-btn icon color="black" @click="logOut">
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
          <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Baza wiedzy",
        model: false,
        children: [
          { text: "Jednostki (units)", link: "units" },
          { text: "Nośniki energii", link: "energyResources" },
          { text: "Kategorie", link: "category" },
          { text: "Surowce", link: "resources" },
          // { text: "Dane statystyczne" },
          // { text: "Dodatkowe środki" },
          // { text: "Przeliczniki" },
          // { text: "Źródła", link: "sources"},
        ],
      },
      { text: "Moduł", icon: "mdi-cube-outline", link: "modules" },
      { text: "Etapy", icon: "mdi-more", link: "stages" },
      { text: "Linie", icon: "mdi-timeline", link: "lines" },
      { text: "Kalkulator", icon: "mdi-calculator", link: "calculator"},
    ],
  }),
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
