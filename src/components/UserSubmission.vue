<template>
  <div class="container" >
    <div class="jumbotron">
      <UserInfoForm @form-updated="updateUserSubmissionInfo"/>
    </div>
    <h5 v-if="showSubmissionChart">
      Total Ac: {{acCount}}.<br/>
      Total Submission: {{totCount}}<br/>
    </h5>
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <SubmissionChart v-if="showSubmissionChart" :chartData="solveByTypeCharData"/>
        </div>
        <div class="col-sm-9">
          <SubmissionChart v-if="showSubmissionChart" :chart-data="submissionChartData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubmissionChart from "@/components/SubmissionChart";
import UserInfoForm from "@/components/UserInfoForm";
import userSubmissionService from "@/service/user-submission-service";

export default {
  name: 'UserSubmission',
  components: {
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
      solveByTypeCharData: {}
    }
  },
  methods: {
    async updateUserSubmissionInfo(handleId, days) {
      this.showSubmissionChart = false;
      const {solveByTypeChartData, lineChartData, acCount, totalSubmissionCount} = await userSubmissionService.getSubmissionData(handleId, days);
      this.cfHandle = handleId;
      this.dayCounts = days;
      this.submissionChartData = lineChartData;
      this.acCount = acCount;
      this.totCount = totalSubmissionCount;
      this.solveByTypeCharData = solveByTypeChartData;
      this.showSubmissionChart = true;
    }
  }
}
</script>

<style>
</style>
