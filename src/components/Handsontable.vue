<template>
  <HotTable :data="members" :settings="hotSettings"/>
</template>

<script>
import { HotTable } from "@handsontable/vue";

export default {
  name: "Handsontable",
  components: {
    HotTable
  },
  props: {
    members: {
      type: Array,
      default: []
    },
    department: {
      type: Array,
      default: []
    }
  },
  data: function() {
    return {
      hotSettings: {
        // data: [
        //   ["", "Ford", "Volvo", "Toyota", "Honda"],
        //   ["2016", 10, , 12, 13],
        //   ["2017", 20, 11, 14, 13],
        //   ["2018", 30, 15, 12, 13]
        // ],
        colHeaders: true,
        rowHeaders: true
      }
    };
  },
  // mounted: async function() {
  //   console.log(await this.department);
  //   console.log(this.department);
  // },
  // watch: {
  //   members: function() {
  //     console.log(this.members);
  //   },
  //   department: function() {
  //     console.log(this.department);
  //   }
  // },
  computed: {
    aut: function() {
      return (this.settings.data = this.author);
    }
  }
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>

