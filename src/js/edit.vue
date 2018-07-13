<style>
</style>

<template lang="pug">
v-container
  v-toolbar(flat color="white")
    v-toolbar-title My Bouns Plan
    v-divider.mx-2(inset vertical)
    v-spacer
    v-dialog(v-model="dialog" max-width="500px")
      v-btn.mb-2(slot="activator" color="primary" dark) New Item
      v-card
        v-card-title
          span.headline {{ formTitle }}
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12 sm6 md4)
                v-text-field(v-model="editedItem.name" label="Dessert name")
              v-flex(xs12 sm6 md4)
                v-text-field(v-model="editedItem.calories" label="Calories")
              v-flex(xs12 sm6 md4)
                v-text-field(v-model="editedItem.fat" label="Fat (g)")
              v-flex(xs12 sm6 md4)
                v-text-field(v-model="editedItem.carbs" label="Carbs (g)")
              v-flex(xs12 sm6 md4)
                v-text-field(v-model="editedItem.protein" label="Protein (g)")
        v-card-actions
          v-spacer
          v-btn(color="blue darken-1" flat @click.native="close") Cancel
          v-btn(color="blue darken-1" flat @click.native="save") Save
  v-data-table(:headers="headers" :items="desserts" hide-actions class="elevation-1")
    template(slot="items" slot-scope="props")
      td {{ props.item.name }}
      td.text-xs-right {{ statusFormatter(props.item.status) }}
      td.text-xs-right {{ props.item.amount }}
      td.text-xs-right {{ props.item.quantity }}
      td.justify-center.layout.px-0
        v-icon.mr-2(small @click="editItem(props.item)") edit
        v-icon(small @click="deleteItem(props.item)") delete
</template>

<script>
/**
 * --------------------------------------------------------------------------
 * Editor page
 * --------------------------------------------------------------------------
 */

module.exports = {
  name: "editor",
  props: {
    //data: Array
  },
  data: function() {
    return {
      dialog: false,
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
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    };
  },
  components: {},
  watch: {
    dialog: function(val) {
      val || this.close();
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  filters: {},
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

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
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