<template>
  <div>
    <button @click="getTableData">tableData</button>
    <button @click="getMembers">members</button>
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
          {
            data: "id",
            type: "text",
            placeholder: "ID",
            allowEmpty: false,
            validator: "numeric"
          },
          {
            data: "name",
            type: "text",
            placeholder: "name",
            maxLength: 15,
            editor: "maxlength"
          },
          {
            data: "mail",
            type: "text",
            placeholder: "E-mail",
            allowEmpty: true,
            validator: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          },
          {
            data: "department",
            type: "dropdown",
            placeholder: "department",
            allowEmpty: true
          },
          {
            data: "position",
            type: "text",
            placeholder: "position"
          }
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
      const tableData = this.$refs.hotTable.hotInstance.getSourceData();
      console.log(tableData);
      // numOfRowsが現在のテーブルの行-1までの配列になるようにする。
      const numOfRows = [];
      for (let i = 0; i < tableData.length - 1; i++) {
        numOfRows.push(i);
      }
      console.log(numOfRows);
      const numberOfTableRows = this.$refs.hotTable.hotInstance.validateRows(
        numOfRows,
        valid => {
          if (!valid) {
            console.log(valid);
            alert("空欄または不正なデータが入力されています。");
            return;
          }
          // ここに次の処理を書く。
          alert("送信完了しました！");
        }
      );
    },
    getMembers: function() {
      console.log(this.members);
    },
    setCellMeta: async function() {
      const departmentData = await this.department;
      console.log(await departmentData);
      // let test = 0;

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
          // test++;
          // console.log(test);
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

