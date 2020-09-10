<template>
  <div>
    <h3 v-if="user !== ''">
      {{ user }} submitted {{ count }} times in last {{ days }} days. {{acCount}} of them were accepted.<br/>
      {{uniqueAcCount}} problems were solved by him for the first time.<br/>
    </h3>

  </div>
</template>

<script>

export default {
  name: 'UserSubmission',
  props: ['user', 'days', 'count', 'acCount', 'uniqueAcCount'],
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
