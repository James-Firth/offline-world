<template>
    <v-container
          fluid
          grid-list-md
        >
        <v-layout v-if="allCharacters.length < 1" align-center justify-center>
          <v-flex xs12 sm8 md4>
              <span v-if="!activeCampaignId">No active campaign selected</span>
              <span v-else>There are no characters in the selected campaign</span>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
            <character-card v-for="char in allCharacters"
                :key="char.id" :name="char.name" :description="char.entry"
                :createdAt="char.created_at.date" :imgSource="char.image"
                :campaignId="char.id" :visibility="char.visibility"
                :characterId="char.id"
                :title="char.title" />
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CharacterCard from '@/components/CharacterCard.vue'; // @ is an alias to /src
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'characters',
  components: {
    CharacterCard,
  },
  computed: {
      ...mapState('characters', ['allCharacters', 'isLoading']),
      ...mapState(['activeCampaignId'])
  },
  watch: {
      activeCampaignId(newId, oldId) {
          if (newId) {
              this.$store.dispatch('characters/fetchAll');
          }
      },
      isLoading(current) {
          this.$emit('isLoading', current);
      }
  },
  mounted() {
      if (this.allCharacters.length < 1) {
          this.$store.dispatch('characters/fetchAll');
      }
  }
});
</script>
