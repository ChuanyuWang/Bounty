<style>
</style>

<template lang="pug">
v-container
  h2 2018年奖金计划表-生产部
  v-subheader 刘总经理 {{ new Date().toLocaleString() }} {{$t('created')}} - {{$t('draft')}}
  v-toolbar(flat)
    v-btn {{$t('import')}}
    v-btn {{$t('export')}}
    v-btn(color="info") {{$t('publish')}}
    v-spacer
    v-dialog(v-model="dialog" max-width="500px")
      v-btn.mb-2(slot="activator" color="primary" dark) {{$t('add_employee')}}
      v-card
        v-card-title
          span.headline {{ formTitle }}
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12 sm6 md4)
                v-text-field(v-model="editedItem.name" :rules="requiredRules" :label="$t('employee_name')")
              v-flex(xs12 sm6 md4)
                v-text-field(v-model.number="editedItem.base" :rules="numberRules" :label="$t('base')" prefix='$')
              v-flex(xs12 sm6 md4)
                v-text-field(v-model.number="editedItem.bonus" :rules="numberRules" :label="$t('bonus')" prefix='$')
              v-flex(xs12 sm6 md4)
                v-text-field(v-model.number="editedItem.performance" :rules="requiredRules" :label="$t('performance')" mask='###' suffix='%')
        v-card-actions
          v-spacer
          v-btn(color="blue darken-1" flat @click.native="close") {{$t('cancel')}}
          v-btn(color="blue darken-1" flat @click.native="save" :disabled="hasError") {{$t('save')}}
  v-data-table(:headers="headers" :items="employees" class="elevation-1")
    template(slot="items" slot-scope="props")
      td {{ props.item.name }}
      td.text-xs-right {{ props.item.base | currencyFormatter }}
      td.text-xs-right {{ props.item.bonus | currencyFormatter }}
      td.text-xs-right {{ props.item.performance | percentFormatter }}
      td.text-xs-right.green.lighten-1 {{ props.item.total | currencyFormatter}}
      td.justify-center.layout.px-0
        v-icon.mr-2(small @click="editItem(props.item)") edit
        v-icon(small @click="deleteItem(props.item)") delete
    template(slot="footer")
      td.pa-2(colspan='100%' style='text-align:right')
        v-layout
          v-text-field(v-model.number="budget" :label="$t('budget')" mask='##############' prefix='$' solo flat prepend-icon="local_atm")
          v-btn(color="success" @click='calculate') {{$t('calculate')}}
  v-snackbar(v-model="error" color="error" :timeout="5000") {{errorMessage}}
    v-btn(flat @click="error = false") {{$t('close')}}
</template>

<script>
/**
 * --------------------------------------------------------------------------
 * Editor page
 * --------------------------------------------------------------------------
 */

var data = require('./data');

module.exports = {
  name: "editor",
  props: {
    //data: Array
  },
  data: function() {
    return {
      valid: true,
      dialog: false,
      headers: [
        {
          text: this.$t("employee_name"),
          align: "left",
          value: "name"
        },
        { text: this.$t("base"), value: "status", align: "right"},
        { text: this.$t("bonus"), value: "bonus", align: "right" },
        { text: this.$t("performance"), value: "performance", align: "right" },
        { text: this.$t("total"), value: "total", align: "right" },
        { text: this.$t("actions"), value: "name", sortable: false, align: "center" }
      ],
      employees: [],
      editedIndex: -1,
      budget: null,
      editedItem: {
        name: "",
        base: 0,
        bonus: 0,
        performance: 0
      },
      defaultItem: {
        name: "",
        base: 0,
        bonus: 0,
        performance: 100
      },
      numberRules: [
        function(v) {
          return (v !== "" && !isNaN(Number(v))) || "Not valid";
        }
      ],
      requiredRules: [
        function(v) {
          return v!== "" || "Not valid";
        }
      ],
      error: false,
      errorMessage: ''
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
      return this.editedIndex === -1 ? this.$t('new_employee') : this.$t('edit_employee');
    },
    hasError() {
      return !this.editedItem.name || typeof(this.editedItem.base) !== 'number' || typeof(this.editedItem.bonus) !== 'number' || typeof(this.editedItem.performance) !== 'number';
    }
  },
  filters: {
    currencyFormatter(v) {
      return '$' + (v||0).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    },
    percentFormatter(v) {
      return v + '%'
    }
  },
  methods: {
    statusFormatter(value) {
      if (value === "released") return this.$t("released");
      if (value === "draft") return this.$t("draft");
      else return value;
    },
    initialize(data) {
      this.employees = data;
    },

    editItem(item) {
      this.editedIndex = this.employees.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.employees.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.employees.splice(index, 1);
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
        Object.assign(this.employees[this.editedIndex], this.editedItem);
      } else {
        this.employees.push(this.editedItem);
      }
      this.close();
    },

    calculate() {
      //Object.assign(this.employees[0], {total: 1000});
      var total_base = 0;
      var total_bonus = 0;
      for (var i =0;i<this.employees.length;i++) {
        var item = this.employees[i];
        total_base += item.base;
        total_bonus += item.bonus * item.performance / 100;
      }
      if (this.budget < total_base) {
        this.errorMessage = "预算小于奖金基数"
        return this.error = true;
      }

      var delta = (this.budget - total_base)/total_bonus;

      for (var i =0;i<this.employees.length;i++) {
        var item = this.employees[i];
        item.total = item.base + (item.bonus * item.performance * delta) / 100
      }
    }
  },
  created: function() {
    //var vm = this;
    this.initialize(data);
  },
  mounted: function() {
    //var vm = this;
  }
};
</script>