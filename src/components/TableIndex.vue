<template>
  <div>
    <Handsontable
      :members="members"
      :department="department"
      @getTableContents="getTableContents"
      @updateMembers="updateMembers"
    />
  </div>
</template>

<script>
import api from "axios";
import Handsontable from "./Handsontable";
import firebase from "../../firebase.js";

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
  mounted: function() {
    this.getTableContents();
  },
  methods: {
    getTableContents: async function() {
      const tableDatabase = firebase
        .firestore()
        .collection("test1")
        .doc("table");

      try {
        // await tableDatabase.set({
        //   department: ["Marketing", "Engineering", "Accounting"],
        //   members: [
        //     {
        //       id: 1,
        //       name: "Paul",
        //       mail: "paul@mail.com",
        //       department: "Marketing",
        //       position: "Manager"
        //     },
        //     {
        //       id: 2,
        //       name: "Tom",
        //       mail: "tom@mail.com",
        //       department: "Engineering",
        //       position: "Manager"
        //     },
        //     {
        //       id: 3,
        //       name: "Ethan",
        //       mail: "ethan@mail.com",
        //       department: "Accounting",
        //       position: "Manager"
        //     },
        //     {
        //       id: 4,
        //       name: "Jasper",
        //       mail: "paul@mail.com",
        //       department: "Accounting",
        //       position: "Manager"
        //     },
        //     {
        //       id: 5,
        //       name: "Brandon",
        //       mail: "paul@mail.com",
        //       department: "Marketing",
        //       position: "Manager"
        //     }
        //   ]
        // });
        const getData = await tableDatabase.get();
        // console.log(getData.data().members);
        const membersData = getData.data().members;
        const departmentData = getData.data().department;

        membersData.map(key => (key.initial = true));

        this.members = membersData;
        this.department = departmentData;
      } catch (err) {
        alert(err);
      }
    },
    updateMembers: function(payload) {
      this.members = payload;
    }
  }
};
</script>

<style></style>

