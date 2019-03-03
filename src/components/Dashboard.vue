<template>
    <v-container
          fluid
          grid-list-md
        >
        <v-layout row>
            <v-flex class="campaign">
                <v-card :dark="darkTheme">
                    <v-img
                        v-if="campaign.image"
                        :src="campaign.image"
                        height="125px"
                    ></v-img>
                    <v-card-title primary-title>
                    <div>
                        <div class="headline">{{campaign.name}}</div>
                        <span class="grey--text">Visibility: {{campaign.visibility}}</span>
                    </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'dashboard',
    computed: {
        campaign() {
            return this.$store.getters.getActiveCampaign;
        }
    },
    beforeMount() {
        if (!this.campaign) {
            this.$router.push('/campaigns')
        }
    }
}
</script>

<style>

</style>
