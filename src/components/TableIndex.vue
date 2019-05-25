<template>
  <div>
    <img :src="testShot" width="50%">
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
      testShot: ""
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
    getStorage: async function() {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const testShot = storageRef.child("testshot.png");

      try {
        const testShotUrl = await testShot.getDownloadURL();
        this.testShot = testShotUrl;
      } catch (err) {
        alert(err);
      }
    },
    getFunction: async function() {
      const data = await firebase.functions().httpsCallable("helloWorld");
      // console.log(data);
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

