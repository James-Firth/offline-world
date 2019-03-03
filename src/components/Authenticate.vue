<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Authenticate Kanka.io Account</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field 
                    prepend-icon="vpn_key" 
                    v-model="accessToken"
                    name="personalToken" label="Personal Token"
                    :dark="darkTheme" type="text"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :dark="darkTheme" @click.native="setApiToken(accessToken)">Authenticate</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
  export default {
    name: 'Authenticate',
    data: () => ({
      drawer: null,
      accessToken: null,
    }),
    computed: {
        ...mapState(['darkTheme']),
    },
    methods: {
        ...mapMutations(['setApiToken'])
    }
  }
</script>
