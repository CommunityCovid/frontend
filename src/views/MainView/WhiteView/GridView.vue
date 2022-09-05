<template>
  <div id="grid-view">
    <grids ref="grids"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import api from "@/service/grids";
import Grids from "@/components/Grids";

export default {
  name: "GridView",
  components: {Grids},
  mounted() {
    this.getGridData();
  },
  data() {
    return {
      sortBy: "name"
    };
  },
  methods: {
    async getGridData() {
      const gridsCnt = await api.getGridsCnt({
        "date": this.date,
        "recordLimit": this.recordLimit
      });
      const gridsData = gridsCnt["data"][0];
      this.$store.commit("datastore/setGridsData", gridsData);

      this.$refs.grids.drawGrids("white");
    }
  },
  computed: {
    ...mapState("datastore", {
      date: state => state.date,
      recordLimit: state => state.recordLimit,
    })
  },
  watch: {},
};
</script>

<style scoped lang="scss">
#grid-view {
  height: 100%;
  width: 100%;
}
</style>
