<style>

</style>

<template lang="pug">
v-app
  v-toolbar(app)
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-toolbar-title Application
  v-navigation-drawer(app,v-model="drawer")
    v-list(dense)
      v-list-tile(@click="" to="/home")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title Home
      v-list-tile(@click="" to="/edit")
        v-list-tile-action
          v-icon attach_money
        v-list-tile-content
          v-list-tile-title Bonus Plan
  v-content
    v-container
      router-view
  v-footer(app) 沪ICP备16016548号-3
</template>

<script>
/**
 * --------------------------------------------------------------------------
 * Top application of bonus tool
 * --------------------------------------------------------------------------
 */

var UserHome = { template: '<div>Home</div>' }
var UserLogin = { template: '<div>Login</div>' }
var UserPosts = { template: '<div>Posts</div>' }

var router = new VueRouter({
  routes: [
    { path: '/', component: UserLogin },
    { path: '/home', component: UserHome,
      children: [				
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: null },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: null }
      ]
    },
    { path: '/edit', component: UserPosts }
  ]
});

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
  router: router,
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