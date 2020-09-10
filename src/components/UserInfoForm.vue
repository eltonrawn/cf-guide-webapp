<template>
  <div class="container">
    <form class="form-inline" @submit.prevent="onSubmit">
      <label for="cf-handle">CF handle:&nbsp;</label>
      <input type="text" class="form-control" id="cf-handle" placeholder="Enter cf handle" name="cf-handle" v-model="handleId">
      <label for="days"> &nbsp;&nbsp;&nbsp;Days:&nbsp; </label>
      <input type="text" class="form-control" id="days" placeholder="Enter days to find solve count" name="days" v-model="days">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="submit" class="btn btn-primary">Submission count</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      handleId: 'err0r',
      days: 10
    }
  },
  methods: {
    onSubmit() {
      alert(this.days);
      alert(this.handleId);
      this.$emit('form-updated', this.handleId, this.days);
    }
  }
}
</script>

<style scoped>
</style>
