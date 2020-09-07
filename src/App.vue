<template>
  <div id="app">
    <UserInfoForm @form-updated="updateUserSubmissionInfo"/>
    <SubmissionChart :chart-data="submissionChartData"/>
  </div>
</template>

<script>
import axios from "axios";
import UserInfoForm from "./components/UserInfoForm";
import SubmissionChart from "./components/SubmissionChart";

export default {
  name: 'App',
  components: {
    SubmissionChart,
    UserInfoForm
  },
  data() {
    return {
      cfHandle: '',
      dayCounts: 0,
      solveCountByDate: [],
      submissionChartData: {}
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
      const labels = [];
      const datasets = [];
      this.$data.solveCountByDate = res.countAra.map((count, idx) => {
        const d = new Date();
        d.setDate(d.getDate() - idx);
        const date = d.toDateString()
        return {
          count, date
        }
      });

      const dataset = {label: 'Total submission', backgroundColor: '#79bdf8', data: []};
      this.$data.solveCountByDate.forEach(data => {
        labels.push(data.date);
        dataset.data.push(data.count);
      });
      datasets.push(dataset);
      this.$data.submissionChartData = {labels, datasets};
    }
  }
}
</script>

<style>
</style>
