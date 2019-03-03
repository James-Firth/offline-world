const state = {
    allCharacters: [],
    isLoading: false,
    activeCharacterId: null,
};

const getters = {
    character: (state: any) => (id: number) => {
        if (state.allCharacters.length < 1) return null;
        const results =  state.allCharacters.filter((char: any) => char.id === id);
        return (results.length === 1) ? results[0] : null;
    },
    active: (state: any, getters: any) => {
        return getters.character(state.activeCharacterId);
    },
}

const mutations = {
    setCharacters(state: any, chars: any) {
        chars.sort((a: any, b: any) => a.name > b.name);
        state.allCharacters = chars;
    },
    setIsLoading(state: any, val: boolean) {
        state.isLoading = val;
    },
    setActive(state: any, id: number) {
        state.activeCharacterId = id;
    }
};

const actions = {
    async fetchAll({ commit, rootGetters}: { commit: any, rootGetters: any}) {
        const camp = rootGetters.getActiveCampaign;
        if (!camp) return;
        
        commit('setIsLoading', true);
        commit('setIsLoading', true, { root: true });
        const results = await camp.characters.get();
        commit('setIsLoading', false);
        commit('setIsLoading', false, { root: true });
  
        if (results && results.data) {
          commit('setCharacters', results.data)
        }
      }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };
