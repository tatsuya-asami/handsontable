<template>
  <Handsontable :members="members" :department="department"/>
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
    return {
      members: [],
      department: []
    };
  },
  computed: {
    getUrl: () => "http://localhost:3000"
  },
  created: function() {
    this.getTableContents();
  },
  methods: {
    getMembers: function() {
      return api.get(`${this.getUrl}/members`);
    },
    getDepartment: function() {
      return api.get(`${this.getUrl}/department`);
    },
    getTableContents: async function() {
      const getData = await api.all([this.getMembers(), this.getDepartment()]);
      const membersData = getData[0].data;
      const departmentData = getData[1].data;

      this.members = membersData;
      this.department = departmentData;
      console.log(this.members);
      console.log(this.department);
    }
  }
};
</script>

<style></style>

