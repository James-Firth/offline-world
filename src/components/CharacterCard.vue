<template>
    <v-flex class="campaign">
        <v-card :dark="darkTheme">
            <v-img
            v-if="imgSource"
            :src="imgSource"
            height="125px"
            ></v-img>
            <v-card-title primary-title>
            <div>
                <div class="headline">{{name}}</div>
                <span class="grey--text">{{title}}</span>
            </div>
            </v-card-title>

            <v-card-actions>
            <v-btn flat :dark="darkTheme" color="indigo" :to="`/characters/${characterId}`">View</v-btn>
            <v-btn flat :dark="darkTheme" color="indigo" @click.native="setActiveCampaign">Set Active</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
            <v-card-text v-show="show" v-html="description">
            </v-card-text>
            </v-slide-y-transition>

        </v-card>
    </v-flex>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'character',
    props: {
        imgSource: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        createdAt: {
            type: String
        },
        campaignId: {
            type: Number
        },
        visibility: {
            type: String
        },
        title: { type: String },
        characterId: { type: Number },
    },
    data: () => ({
      show: false
    }),
    computed: {
        ...mapState(['darkTheme']),
    },
    methods: {
    setActiveCampaign() {
      this.$store.commit('setActiveCampaign', campaignId);
      this.$router.push('/');
    }
    }
}
</script>

<style>

</style>
