<template>
  <div>
    <h4>Solved {{count}} problem in {{date}}</h4>
  </div>
</template>

<script>
export default {
  props: ['date', 'count']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
