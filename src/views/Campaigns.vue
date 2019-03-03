<template>
    <v-container
          fluid
          grid-list-md
        >
        <v-layout row>
            <span class='headline'>
                Please select a campaign
            </span>
        </v-layout>
        <v-layout row wrap>
            <campaign v-for="camp in campaigns" 
                :key="camp.id" :name="camp.name" :description="camp.entry"
                :createdAt="camp.created_at.date" :imgSource="camp.image"
                :campaignId="camp.id" :visibility="camp.visibility"/>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Campaign from '@/components/Campaign.vue'; // @ is an alias to /src
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'campaigns',
  components: {
    Campaign,
  },
  computed: {
      ...mapState(['campaigns'])
  },
  mounted() {
      if (this.campaigns.length < 1) {
          this.$store.dispatch('campaigns');
      }
  }
});
</script>
