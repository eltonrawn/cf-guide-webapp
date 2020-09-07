<template>
  <div id="app">
    <UserInfoForm @form-updated="updateUserSubmissionInfo"/>
    <UserSubmission :user="cfHandle" :days="dayCounts" :solveCountByDate="solveCountByDate"/>
  </div>
</template>

<script>
import UserSubmission from './components/UserSubmission.vue';
import UserInfoForm from "./components/UserInfoForm";
import axios from "axios";

export default {
  name: 'App',
  components: {
    UserSubmission,
    UserInfoForm
  },
  data() {
    return {
      cfHandle: '',
      dayCounts: 0,
      solveCountByDate: []
    }
  },
  methods: {
    async updateUserSubmissionInfo(handleId, days) {
      const url = `http://localhost:8080/users/${handleId}/submissions/count?days=${days}`;
      const res = await axios.get(url).then(response => {
        return response.data;
      });

      this.$data.cfHandle = handleId;
      this.$data.dayCounts = days;
      this.$data.solveCountByDate = res.countAra.map((count, idx) => {
        const d = new Date();
        d.setDate(d.getDate() - idx);
        const date = d.toDateString()
        return {
          count, date
        }
      });
      console.log(this.$data.dayCounts);
    }
  }
}
</script>

<style>
</style>
