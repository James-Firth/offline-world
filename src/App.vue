<template>
  <v-app :dark="darkTheme">
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      :dark="darkTheme"
    >
      <v-list dense :dark="darkTheme">
        <v-list-tile to="/" :dark="darkTheme">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile to="/characters" :dark="darkTheme">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>characters</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      <v-list-group
              prepend-icon="language"
              value="true"
            >
        <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Campaigns</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="camp in campaigns"
            :ripple="true"
            :key="camp.id"
            @click="setActiveCampaign(camp.id)"
            :dark="darkTheme"
            :color="camp.id === activeCampaignId ? 'primary' : ''"
          >
            <v-list-tile-avatar 
              color="teal">
              <img v-if="camp.image" :src="camp.image" :dark="darkTheme">
              <span v-else class="white--text headline">{{ camp.name.substring(0,1) }}</span>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="camp.name">{{ camp.name }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="camp.id === activeCampaignId">selected</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list-group>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>invert_colors</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              <v-switch
              v-model="darkTheme"
              :label="`Dark Theme: ${darkTheme ? 'on' : 'off'}`"
            />
          </v-list-tile-content>
        </v-list-tile>



      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Offline World</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-progress-linear v-if="isLoading" style="margin : 0 auto ;" :indeterminate="true" height="3" color="blue"/>
      <authenticate v-if="!apiToken"/>
      <router-view v-else/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Authenticate from '@/components/Authenticate.vue'
import { mapState, mapMutations, mapGetters } from 'vuex';
import store from './store/index';

export default {
  name: 'App',
  components: {
    Authenticate,
    HelloWorld
  },
  data: () => ({
    currentCampaign: null,
  }),
  computed: {
    drawer: {
      get() { return this.$store.state.navDrawerOpen; },
      set(val) { console.log(val); this.setNavDrawerOpen(val); },
    },
    activeCampaign() {
      return this.$store.getters.getCampaign(this.activeCampaignId);
    },
    darkTheme: {
      get() { return this.$store.state.darkTheme; },
      set(val) { this.setDarkTheme(val); },
    },
    ...mapState(['apiToken', 'activeCampaignId', 'campaigns', 'isLoading'])
  },
  watch: {
    activeCampaign(newCamp, oldCamp) {
      this.currentCampaign = newCamp;
    }
  },
  methods: {
    ...mapMutations(['setDarkTheme', 'setNavDrawerOpen']),
    setActiveCampaign(id) {
      this.$store.commit('setActiveCampaign', id);
    }
  },
  mounted() {
    console.log( process.env.VUE_APP_KANKA_API);
    this.$store.dispatch('setupApi', process.env.VUE_APP_KANKA_API)
    .then(() => this.$store.dispatch('campaigns'))
    .then(() => {
      if (!this.activeCampaignId) {
        this.$router.push('/campaigns')
      }
    })
  }
}
</script>
