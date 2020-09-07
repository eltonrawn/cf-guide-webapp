<template>
  <div>
    <h1 v-if="user !== ''">{{ user }} solved {{ count }} problems in last {{ days }} days</h1>
<!--    <SubmissionByDate :key="currentDate.date" v-for="currentDate in solveCountByDate" :count="currentDate.count" :date="currentDate.date" />-->
  </div>
</template>

<script>
import SubmissionByDate from "./SubmissionByDate";

export default {
  name: 'UserSubmission',
  components: {SubmissionByDate},
  props: ['user', 'days', 'solveCountByDate'],
  computed: {
    count() {
      if (Array.isArray(this.solveCountByDate) && this.solveCountByDate.length) {
        return this.solveCountByDate.map(value => value.count).reduce((sum, val) => sum + val);
      }
      return this.solveCountByDate;
    }
  },
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
