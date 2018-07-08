<style>

</style>

<template lang="pug">
v-app
  v-toolbar(app)
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-toolbar-title Application
  v-navigation-drawer(app,v-model="drawer")
    v-list(dense)
      v-list-tile(@click="")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title Home
  v-content
    v-container {{imageHeight}}
  v-footer(app) 沪ICP备16016548号-3
</template>

<script>
/**
 * --------------------------------------------------------------------------
 * test-console display a panel for testing robot god
 * --------------------------------------------------------------------------
 */

module.exports = {
  name: "app",
  props: {
    //data: Array
  },
  data: function() {
    return {
      drawer: null
    };
  },
  components: {
  },
  computed: {
    imageHeight: function () {
      console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '220px'
        case 'sm': return '400px'
        case 'md': return '500px'
        case 'lg': return '600px'
        case 'xl': return '800px'
      }
    }
  },
  filters: {},
  methods: {},
  created: function() {
    //var vm = this;
  },
  mounted: function() {
    //var vm = this;
    //console.log(this.$vuetify.breakpoint.name)
  }
};
</script>