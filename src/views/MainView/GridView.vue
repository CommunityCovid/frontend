<template>
  <div id="grid-view">
    <div v-if="grids !== undefined">
      <DoughnutChart v-for="grid in grids" :key="grid.name" :grid="grid"></DoughnutChart>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import DoughnutChart from "../../components/DoughnutChart";

export default {
  name: "GridView",
  components: {DoughnutChart},
  created() {
    this.$store.commit("datastore/initGrids")
  },
  computed: {
    ...mapState('datastore', {
      grids: state => state.grids
    })
  }
};
</script>

<style scoped lang="scss">
#grid-view {
  height: 100%;
}
</style>
