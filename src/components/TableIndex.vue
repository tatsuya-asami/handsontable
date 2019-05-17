<template>
  <div>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/handsontable-f68d2.appspot.com/o/testshot.png?alt=media&token=3e72a30a-cd3b-4897-a8e5-dacd69473a0e"
    >
    <img src="testshot.png">
    <Handsontable
      :members="members"
      :department="department"
      :table-database="tableDatabase"
      @getTableContents="getTableContents"
      @updateMembers="updateMembers"
    />
  </div>
</template>

<script>
import api from "axios";
import Handsontable from "./Handsontable";
import firebase from "../../firebase.js";
import sampleData from "./sampleData.js";
import axios from "axios";

export default {
  name: "TableIndex",
  components: {
    Handsontable
  },
  data: function() {
    return {
      members: [],
      department: [],
      img: null
    };
  },
  computed: {
    tableDatabase: () =>
      firebase
        .firestore()
        .collection("test1")
        .doc("table")
  },
  mounted: function() {
    this.getFunction();
    this.getStorage();
  },
  methods: {
    getStorage: function() {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef.child("testshot.png");
      this.img = imageRef;
      console.log(imageRef);
    },
    getFunction: async function() {
      const data = await firebase.functions().httpsCallable("helloWorld");
      console.log(data);
    },
    setSampleData: function() {
      return new Promise(resolve => {
        resolve(this.tableDatabase.set(sampleData));
      });
    },
    listenData: function() {
      return new Promise(resolve => {
        resolve(
          this.tableDatabase.onSnapshot(data => {
            this.members = data.data().members;
          })
        );
      });
    },
    getData: function() {
      return new Promise(resolve => {
        resolve(this.tableDatabase.get());
      });
    },
    getTableContents: async function() {
      try {
        await this.listenData();
        const tableData = await this.getData();
        const membersData = tableData.data().members;
        const departmentData = tableData.data().department;

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

