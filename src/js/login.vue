<style>
</style>

<template lang="pug">
v-container(fill-height)
  v-layout(justify-center align-center)
    v-flex(md4 xs6)
      v-form(ref="form" v-model="valid" lazy-validation)
        v-text-field(v-model="email" :rules="emailRules" :label="$t('email')" required)
        v-text-field(v-model='password' required :append-icon="show1 ? 'visibility_off' : 'visibility'"
                    :type="show1 ? 'text' : 'password'" :label="$t('password')" @click:append="show1 = !show1")
        v-checkbox(v-model="checkbox" :label="$t('remember_me')")
        v-btn(color="success" :disabled="!valid" @click="submit") {{$t('login')}}
        v-btn(@click="clear") {{$t('clear')}}
</template>

<script>
/**
 * --------------------------------------------------------------------------
 * Login page
 * --------------------------------------------------------------------------
 */

module.exports = {
  name: "login",
  props: {
    //data: Array
  },
  data: function() {
    return {
      valid: true,
      email: "",
      emailRules: [
        function(v) {
          return !!v || "E-mail is required";
        },
        function(v) {
          return /.+@.+/.test(v) || "E-mail must be valid";
        }
      ],
      show1: false,
      password: "",
      checkbox: false
    };
  },
  components: {},
  computed: {},
  filters: {},
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$router.push('home');
        // Native form submission is not yet supported
        /*
        axios.post("/api/submit", {
          email: this.email,
          password: this.password,
          checkbox: this.checkbox
        });
        */
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  created: function() {
    //var vm = this;
  },
  mounted: function() {
    //var vm = this;
  }
};
</script>