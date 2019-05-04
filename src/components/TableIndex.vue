<template>
  <Handsontable
    :members="members"
    :department="department"
    @getTableContents="getTableContents"
    @updateMembers="updateMembers"
  />
</template>

<script>
import api from "axios";
import Handsontable from "./Handsontable";
import { maxLength } from "./CustomHooks.js";

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
  methods: {
    getMembers: function() {
      return api.get(`${this.getUrl}/members`);
    },
    getDepartment: function() {
      return api.get(`${this.getUrl}/department`);
    },
    getTableContents: async function() {
      // const getData = await api.all([this.getMembers(), this.getDepartment()]);
      // const membersData = getData[0].data;
      // const departmentData = getData[1].data;
      const membersData = [
        {
          id: 1,
          name: "Paul",
          mail: "paul@mail.com",
          department: "Marketing",
          position: "Manager"
        },
        {
          id: 2,
          name: "Tom",
          mail: "tom@mail.com",
          department: "Engineering",
          position: "Manager"
        },
        {
          id: 3,
          name: "Ethan",
          mail: "tom@mail.com",
          department: "Accounting",
          position: "Manager"
        },
        {
          id: 4,
          name: "Michael",
          mail: "tom@mail.com",
          department: "Engineering",
          position: "Manager"
        },
        {
          id: 5,
          name: "Ann",
          mail: "tom@mail.com",
          department: "Marketing",
          position: "Manager"
        }
      ];

      membersData.map(key => (key.initial = true));

      const departmentData = ["Marketing", "Engineering", "Accounting"];

      this.members = membersData;
      this.department = departmentData;
    },
    // getTableContents: async function() {
    //   const getData = await api.all([this.getMembers(), this.getDepartment()]);
    //   const membersData = getData[0].data;
    //   const departmentData = getData[1].data;

    //   membersData.map(key => (key.initial = true));

    //   this.members = membersData;
    //   this.department = departmentData;
    // },
    updateMembers: function(payload) {
      this.members = payload;
    }
  }
};
</script>

<style></style>

