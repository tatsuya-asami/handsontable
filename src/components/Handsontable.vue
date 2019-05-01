<template>
  <div>
    <button @click="getTableData">tableData</button>
    <HotTable ref="hotTable" :data="members" :settings="hotSettings"/>
  </div>
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
        colHeaders: true,
        rowHeaders: true,
        columns: [
          { data: "id", type: "text", placeholder: "ID" },
          { data: "name", type: "text", placeholder: "name" },
          { data: "mail", type: "text", placeholder: "mail" },
          { data: "department", type: "text", placeholder: "department" },
          { data: "position", type: "text", placeholder: "position" }
        ]
      }
    };
  },
  created: async function() {
    // console.log(await this.department);
    // console.log(this.department);
    await this.$emit("getTableContents");
    // await this.$refs.hotTable.hotInstance.render();
    console.log(await this.members);
  },
  // watch: {
  //   members: async function() {
  //     console.log(this.members);
  //     await this.$refs.hotTable.hotInstance.render();
  //     console.log(this.$refs.hotTable.hotInstance.getData());
  //   },
  //   department: function() {
  //     console.log(this.department);
  //   }
  // },
  methods: {
    getTableData: function() {
      this.$refs.hotTable.hotInstance.render();
      console.log(this.$refs.hotTable.hotInstance.getData());
    }
  }
  // computed: {
  //   aut: function() {
  //     return (this.settings.data = this.author)
  //   }
  // }
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>

