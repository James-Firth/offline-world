<template>
    <v-container fluid class="character" v-if="character">
        <v-layout row wrap>
            <v-flex  d-flex xs12 sm6 md4>
                <v-img v-if="imgSource" :src="imgSource" contain max-width="256" max-height="256">
                </v-img>
            </v-flex>
            <v-flex d-flex>
               <div>
                    <span class="font-weight-bold headline">{{ name }}</span><br>
                    <span class="font-italic title">{{ title }}</span>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'character',
    data: () => ({
      show: false,
    }),
    computed: {
        ...mapState(['darkTheme']),
        character() {
            return this.$store.getters['characters/active'];
        },
        name() {
            return this.$store.getters['characters/active'].name;
        },
        imgSource() {
            return this.$store.getters['characters/active'].image;
        },
        title() {
            return this.$store.getters['characters/active'].title;
        },
    },
    beforeMount() {
        this.$store.commit('characters/setActive', Number.parseInt(this.$route.params.id));
    },
    mounted() {
        if (!this.character) {
            this.$router.push('/characters');
        }
    }
}
</script>

<style>
  .bottom-gradient-dark {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }
  .bottom-gradient-light {
    background-image: linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, transparent 72px);
  }
</style>
