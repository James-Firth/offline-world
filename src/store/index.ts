import Vue from 'vue';
import Vuex from 'vuex';
import kanka from '@/api';
import characters from './modules/characters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeCampaignId: null,
    apiToken: null,
    campaigns: [],
    darkTheme: false,
    initialized: false,
    isLoading: false,
    navDrawerOpen: false,
  },
  getters: {
    getActiveCampaign: (state, getters) => {
      return getters.getCampaign(state.activeCampaignId);
    },
    getCampaign: (state) => (id: number) => {
      if (state.campaigns.length < 1) return null;
      const results =  state.campaigns.filter((camp: any) => camp.id === id);
      return (results.length === 1) ? results[0] : null;
    },
  },
  mutations: {
    setNavDrawerOpen(state, val: boolean) {
      state.navDrawerOpen = val;
    },
    setActiveCampaign(state, campaignId) {
      state.activeCampaignId = campaignId;
    },
    setDarkTheme(state, darkOn: boolean) {
      state.darkTheme = darkOn;
    },
    setCampaigns(state, campaigns) {
      state.campaigns = campaigns;
    },
    setApiToken(state, token) {
      state.apiToken = token;
    },
    setIsLoading(state, val) {
      state.isLoading = val;
    },
  },
  actions: {
    setupApi({ commit }, token) {
      commit('setApiToken', token);
      kanka.setToken(process.env.VUE_APP_KANKA_API);
    },
    async campaigns({ commit }) {
      commit('setIsLoading', true);
      const results = await kanka.listCampaigns()
      commit('setIsLoading', false);

      if (results && results.data) {
        commit('setCampaigns', results.data)
      }
    },

  },
  modules: {
    characters,
  }
});
