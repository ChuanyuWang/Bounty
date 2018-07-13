<style>
</style>

<template lang="pug">
v-container
  v-toolbar(flat)
    v-toolbar-title {{$t('my_bonus_plan')}}
    v-divider.mx-2(inset vertical)
    v-spacer
    v-btn(color="primary" to='/edit') {{$t('create')}}
  v-data-table(:headers="headers" :items="desserts" hide-actions class="elevation-1")
    template(slot="items" slot-scope="props")
      td {{ props.item.name }}
      td.text-xs-right {{ statusFormatter(props.item.status) }}
      td.text-xs-right {{ props.item.amount | amountFilter }}
      td.text-xs-right {{ props.item.quantity }}
      td.justify-center.layout.px-0
        v-icon.mr-2(v-show="props.item.status==='draft'" small @click="editItem(props.item)") edit
        v-icon.mr-2(v-show="props.item.status==='released'" small @click="openItem(props.item)") visibility
        v-icon(small @click="deleteItem(props.item)") delete
</template>

<script>
/**
 * --------------------------------------------------------------------------
 * Home page
 * --------------------------------------------------------------------------
 */

module.exports = {
  name: "home",
  props: {
    //data: Array
  },
  data: function() {
    return {
      headers: [
        {
          text: this.$t("name"),
          align: "left",
          value: "name"
        },
        { text: this.$t("status"), value: "status" },
        { text: this.$t("amount"), value: "amount" },
        { text: this.$t("quantity"), value: "quantity" },
        { text: this.$t("actions"), value: "status", sortable: false }
      ],
      desserts: []
    };
  },
  components: {},
  watch: {},
  computed: {},
  filters: {
    amountFilter(value) {
      return "$" + value;
    }
  },
  methods: {
    statusFormatter(value) {
      if (value === "released") return this.$t("released");
      if (value === "draft") return this.$t("draft");
      else return value;
    },
    initialize() {
      this.desserts = [
        {
          name: "2012年奖金计划表-销售部",
          status: "released",
          amount: 3000000,
          quantity: 52
        },
        {
          name: "2013年奖金计划表-生产部",
          status: "released",
          amount: 2000000,
          quantity: 123
        },
        {
          name: "2014年奖金计划表-销售部",
          status: "released",
          amount: 4000000,
          quantity: 35
        },
        {
          name: "2016年奖金计划表-生产部",
          status: "released",
          amount: 2000000,
          quantity: 156
        },
        {
          name: "2017年奖金计划表-销售部",
          status: "released",
          amount: 1000000,
          quantity: 25
        },
        {
          name: "2018年奖金计划表-生产部",
          status: "draft",
          amount: 2000000,
          quantity: 135
        }
      ];
    },

    openItem(item) {
      //TODO
    },

    editItem(item) {
      //TODO
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    }
  },
  created: function() {
    //var vm = this;
    this.initialize();
  },
  mounted: function() {
    //var vm = this;
  }
};
</script>