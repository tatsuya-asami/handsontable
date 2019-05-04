<template>
  <div>
    <button @click="getTableData">tableData</button>
    <button @click="getMembers">members</button>
    <HotTable ref="hotTable" :data="members" :settings="hotSettings"/>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import { setTimeout } from "timers";

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
      test: "testttt",
      hotSettings: {
        dataSchema: {
          id: null,
          name: null,
          mail: null,
          department: null,
          position: null
        },
        colHeaders: ["", "ID", "Name", "E-mail", "Department", "Position"],
        rowHeaders: true,
        columns: [
          { data: "checkbox", type: "checkbox" },
          { data: "id", type: "text", placeholder: "ID" },
          { data: "name", type: "text", placeholder: "name" },
          { data: "mail", type: "text", placeholder: "E-mail" },
          {
            data: "department",
            type: "dropdown",
            placeholder: "department"
          },
          { data: "position", type: "text", placeholder: "position" }
        ],
        contextMenu: {
          items: {
            row_above: true,
            row_below: false,
            remove_row: {
              name: "行を削除"
            }
          }
        },
        minSpareRows: 1,
        beforeRemoveRow: this.beforeRemoveRowVue,
        afterChange: this.afterChangeVue
      }
    };
  },
  created: function() {
    this.$emit("getTableContents");
  },
  watch: {
    department: function() {
      this.setCellMeta();
    }
  },
  methods: {
    getTableData: function() {
      console.log(this.$refs.hotTable.hotInstance.getSourceData());
    },
    getMembers: function() {
      console.log(this.members);
    },
    setCellMeta: async function() {
      const departmentData = await this.department;
      console.log(await departmentData);

      await this.$refs.hotTable.hotInstance.updateSettings({
        cells: function(row, col, prop) {
          const cellProperties = {};
          // ドロップダウンメニュー項目の設定
          if (prop === "department") {
            cellProperties.source = departmentData;
          }

          const table = this.instance.getSourceData();

          // readOnlyにするセルの設定。
          if (table[row]) {
            if (prop === "id" && table[row].initial) {
              cellProperties.readOnly = true;
            }
            if (prop === "name" && table[row].initial) {
              cellProperties.readOnly = true;
            }
          }
          // console.log(cellProperties);
          return cellProperties;
        }
      });
    },
    beforeRemoveRowVue: function(index, amount, physicalRows, source) {
      console.log(this.test);
      console.log(index);
      console.log(amount);
      console.log(physicalRows);
      console.log(source);
    },
    afterChangeVue: function(changes, source) {
      if (source === "loadData") {
        return;
      }
      const tableData = this.$refs.hotTable.hotInstance.getSourceData();
      this.$emit("updateMembers", tableData);
    }
  }
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>

