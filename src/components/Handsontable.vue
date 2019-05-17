<template>
  <div>
    <button @click="getTableData">tableData</button>
    <button @click="getMembers">members</button>
    <button @click="postSimulate">POST!</button>
    <HotTable ref="hotTable" :data="members" :settings="hotSettings"/>
  </div>
</template>

<script>
import axios from "axios";
import { HotTable } from "@handsontable/vue";
import { maxLength } from "./CustomHooks.js";
import firebase from "../../firebase.js";

export default {
  name: "Handsontable",
  components: {
    HotTable
  },
  props: {
    members: {
      type: Array,
      default: () => []
    },
    department: {
      type: Array,
      default: () => []
    },
    tableDatabase: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      test: "testttt",
      editedRow: null,
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
        // beforeRemoveRow: this.beforeRemoveRowVue,
        afterBeginEditing: this.afterBeginEditingVue,
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
    getTableData: async function() {
      const tableData = this.$refs.hotTable.hotInstance.getSourceData();
      console.log(tableData);
      const apiData = await axios.get(
        "https://us-central1-handsontable-f68d2.cloudfunctions.net/helloWorld"
      );
      console.log(apiData);
    },
    getMembers: function() {
      console.log(this.members);
    },
    postFirebase: function(tableData) {
      return new Promise(resolve => {
        resolve(
          this.tableDatabase.update({
            members: tableData
          })
        );
      });
    },
    postSimulate: function() {
      const tableData = this.$refs.hotTable.hotInstance.getSourceData();
      // 何も編集していなければここで終了
      if (this.editedRow === null) {
        return;
      }
      // numOfRowsが現在のテーブルの行-1までの配列になるようにする。
      const numOfRows = [];
      for (let i = 0; i < tableData.length - 1; i++) {
        numOfRows.push(i);
      }
      // 最終行を編集し始めていたらバリデーションチェックする。
      if (this.editedRow === tableData.length - 1) {
        numOfRows.push(this.editedRow);
      }

      try {
        this.$refs.hotTable.hotInstance.validateRows(numOfRows, async valid => {
          if (!valid) {
            alert("空欄または不正なデータが入力されています。");
            return;
          }

          const postData = await this.postFirebase(tableData);
          console.log(tableData);
          alert("送信完了しました！");
        });
      } catch (err) {
        alert(err);
      }
    },
    setCellMeta: function() {
      const departmentData = this.department;
      // let test = 0;

      this.$refs.hotTable.hotInstance.updateSettings({
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
    // beforeRemoveRowVue: function(index, amount, physicalRows, source) {
    //   console.log(this.test);
    //   console.log(index);
    //   console.log(amount);
    //   console.log(physicalRows);
    //   console.log(source);
    // },
    afterChangeVue: function(changes, source) {
      if (source === "loadData") {
        return;
      }
      const tableData = this.$refs.hotTable.hotInstance.getSourceData();
      this.$emit("updateMembers", tableData);
    },
    afterBeginEditingVue: function(row) {
      this.editedRow = row;
    }
  }
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>

