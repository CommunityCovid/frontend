<template>
  <div>{{ this.$route.query.gridName }}</div>
</template>

<script>
export default {
  name: "InfoView",
  mounted() {
    console.log(this.$route.params);
  }
};
</script>

<style scoped>

</style>
