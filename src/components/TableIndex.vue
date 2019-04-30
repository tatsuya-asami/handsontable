<template>
  <Handsontable/>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import api from "axios";
import Handsontable from "./Handsontable";

export default {
  name: "TableIndex",
  components: {
    Handsontable
  },
  data: function() {
    return {};
  },
  created: function() {
    this.getTableContents();
  },
  methods: {
    getTableContents: function() {
      alert();
    }
  }
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>

