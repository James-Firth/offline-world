<template>
  <div class="home">
    <dashboard />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Dashboard from '@/components/Dashboard.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  components: {
    Dashboard,
  },
});
</script>
