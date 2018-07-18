<style lang="less">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.child-view {
  position: absolute;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>

<template lang="pug">
v-app
  v-toolbar(app)
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-toolbar-title {{$t('app_title')}}
  v-navigation-drawer(app,v-model="drawer")
    v-list(dense)
      v-list-tile(@click="" to="/home")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title {{$t('home')}}
      v-list-tile(@click="" to="/edit")
        v-list-tile-action
          v-icon attach_money
        v-list-tile-content
          v-list-tile-title {{$t('editor')}}
  v-content
    transition(name='slide-right')
      router-view.child-view
  v-footer(app)
    v-spacer
    label.caption 沪ICP备16016548号-3
</template>

<script>
/**
 * --------------------------------------------------------------------------
 * Top application of bonus tool
 * --------------------------------------------------------------------------
 */

var router = new VueRouter({
  routes: [
    { path: '/', component: require('./login.vue') },
    { path: '/home', component: require('./home.vue'),
      children: [				
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        { path: 'profile', component: null },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        { path: 'posts', component: null }
      ]
    },
    { path: '/edit', component: require('./edit.vue') }
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