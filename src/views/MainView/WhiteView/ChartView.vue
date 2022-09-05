<template>
  <div id="chart-view">
    <pie-chart ref="piechart"/>
  </div>
</template>

<script>
import api from "@/service/charts";
import PieChart from "@/components/PieChart";
import {mapState} from "vuex";

export default {
  name: "ChartView",
  components: {PieChart},
  data() {
    return {};
  },
  mounted() {
    this.drawOverall();
  },
  methods: {
    async drawOverall() {
      const res = await api.getCommunityCnt(
          {
            "date": this.date,
            "recordLimit": this.recordLimit
          }
      );
      const data = res["data"];
      this.$refs["piechart"].drawPieChart({
        title: "白名单核酸情况总况",
        finishedCnt: data["finishedCnt"],
        totalCnt: data["totalCount"]
      });
    },
    dataUpdate(){
      if(this.date && this.recordLimit){
        this.drawOverall()
      }
    }
  },
  computed: {
    ...mapState("datastore", {
      date: state => state.date,
      recordLimit: state => state.recordLimit,
      dateChanged: state => state.dateChanged,
      recordLimitChanged: state => state.recordLimitChanged
    })
  },
  watch: {
    dateChanged(){
      this.dataUpdate()
    },
    recordLimitChanged(){
      this.dataUpdate()
    }
  },

};
</script>

<style scoped lang="scss">
#chart-view {
  height: 100%;

  #overall {
    margin-top: 10px;
    height: calc(98% - 10px);
    //aspect-ratio: 1/1;
    width: calc(95% - 2 * var(--boundary-width));
  }
}
</style>
