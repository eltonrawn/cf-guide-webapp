<template>
  <div>
    <h5 v-if="user !== ''">
      Total Ac: {{acCount}}.<br/>
      Total Submission: {{count}}<br/>
    </h5>
  </div>
</template>

<script>

export default {
  name: 'UserSubmission',
  props: ['user', 'days', 'count', 'acCount'],
  data() {
    return {
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
