<template>
  <div class="container" id="app">
    <div class="jumbotron">
      <UserInfoForm @form-updated="updateUserSubmissionInfo"/>
    </div>
    <UserSubmission :user="cfHandle" :days="dayCounts" :count="totCount" :acCount="acCount"/>
    <SubmissionChart v-if="showSubmissionChart" :chart-data="submissionChartData"/>
  </div>
</template>

<script>
import axios from "axios";
import UserInfoForm from "./components/UserInfoForm";
import SubmissionChart from "./components/SubmissionChart";
import UserSubmission from "@/components/UserSubmission";

export default {
  name: 'App',
  components: {
    UserSubmission,
    SubmissionChart,
    UserInfoForm
  },
  data() {
    return {
      cfHandle: '',
      dayCounts: 0,
      totCount: 0,
      acCount: 0,
      showSubmissionChart: false,
      submissionChartData: {}
    }
  },
  methods: {
    async updateUserSubmissionInfo(handleId, days) {
      const url = `http://localhost:8080/users/${handleId}/submissions/count?days=${days}`;
      this.$data.showSubmissionChart = false;
      const res = await axios.get(url).then(response => {
        return response.data;
      });

      this.$data.cfHandle = handleId;
      this.$data.dayCounts = days;
      const labels = [];
      const datasets = [];

      const acCounts = {label: 'AC count', backgroundColor: '#0aa804', data: []};
      const submissionCounts = {label: 'Submission count', backgroundColor: '#081c01', data: []};

      res.countAra.forEach(data => {
        labels.push(data.date);
        acCounts.data.push(data.uniqueAcCount);
        submissionCounts.data.push(data.totalSubmission);
      });
      datasets.push(acCounts);
      datasets.push(submissionCounts);

      this.$data.submissionChartData = {labels, datasets};
      this.$data.showSubmissionChart = true;
      this.$data.acCount = acCounts.data.reduce((res, count) => {
        return res + count;
      }, 0);
      this.$data.totCount = res.totalSubmissionCount;
    }
  }
}
</script>

<style>
</style>
