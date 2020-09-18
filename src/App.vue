<template>
  <div class="container" id="app">
    <div class="jumbotron">
      <UserInfoForm @form-updated="updateUserSubmissionInfo"/>
    </div>
    <UserSubmission v-if="showSubmissionChart" :user="cfHandle" :days="dayCounts" :count="totCount" :acCount="acCount"/>

    <div class="container">
      <div class="row">
        <div class="col-sm">
          <SolveByTypePieChart v-if="showSubmissionChart" :chartData="solveByTypePieCharData"/>
        </div>
        <div class="col-sm">
          <SubmissionChart v-if="showSubmissionChart" :chart-data="submissionChartData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfoForm from "./components/UserInfoForm";
import SubmissionChart from "./components/SubmissionChart";
import UserSubmission from "@/components/UserSubmission";
import userSubmissionService from "./service/user-submission-service";
import SolveByTypePieChart from "@/components/SolveByTypePieChart";

export default {
  name: 'App',
  components: {
    SolveByTypePieChart,
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
      submissionChartData: {},
      solveByTypePieCharData: {}
    }
  },
  methods: {
    async updateUserSubmissionInfo(handleId, days) {
      this.showSubmissionChart = false;
      const {pieChartData, lineChartData, acCount, totalSubmissionCount} = await userSubmissionService.getSubmissionData(handleId, days);
      this.cfHandle = handleId;
      this.dayCounts = days;
      this.submissionChartData = lineChartData;
      this.acCount = acCount;
      this.totCount = totalSubmissionCount;
      this.solveByTypePieCharData = pieChartData;
      this.showSubmissionChart = true;
    }
  }
}
</script>

<style>
</style>
