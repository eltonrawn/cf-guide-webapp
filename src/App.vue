<template>
  <div class="container" id="app">
    <div class="jumbotron">
      <UserInfoForm @form-updated="updateUserSubmissionInfo"/>
    </div>
    <UserSubmission v-if="showSubmissionChart" :user="cfHandle" :days="dayCounts" :count="totCount" :acCount="acCount"/>
    <SubmissionChart v-if="showSubmissionChart" :chart-data="submissionChartData"/>
  </div>
</template>

<script>
import UserInfoForm from "./components/UserInfoForm";
import SubmissionChart from "./components/SubmissionChart";
import UserSubmission from "@/components/UserSubmission";
import userSubmissionService from "./service/user-submission-service";

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
      this.$data.showSubmissionChart = false;
      const {chartData, acCount, totalSubmissionCount} = await userSubmissionService.getSubmissionData(handleId, days);
      this.$data.cfHandle = handleId;
      this.$data.dayCounts = days;
      this.$data.submissionChartData = chartData;
      this.$data.acCount = acCount;
      this.$data.totCount = totalSubmissionCount;
      this.$data.showSubmissionChart = true;
    }
  }
}
</script>

<style>
</style>
