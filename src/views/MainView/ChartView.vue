<template>
  <div id="chart-view">
    <div ref="overall" id="overall" class="boundary"/>
  </div>
</template>

<script>
import api from "@/service/charts";

export default {
  name: "ChartView",
  data() {
    return {};
  },
  mounted() {
    this.drawOverall();
  },
  methods: {
    async drawOverall() {
      let chart = this.$echarts.getInstanceByDom(this.$refs["overall"]);
      if (chart == null) {
        chart = this.$echarts.init(this.$refs["overall"]);
      }
      const res = await api.getCommunityCnt();
      const data = res["data"];


      chart.setOption(
          {
            title: {
              text: "Overall",
              left: "center"
            },
            tooltip: {
              trigger: "item"
            },
            legend: {
              orient: "vertical",
              left: "left"
            },
            series: [
              {
                name: "Access From",
                type: "pie",
                radius: "50%",
                data: [
                  {value: data["finishedCnt"], name: "finished"},
                  {value: data["totalCount"] - data["finishedCnt"], name: "unfinished"}
                ]
              }
            ]
          },
          true
      );
    }
  }
};
</script>

<style scoped lang="scss">
#chart-view {
  height: 100%;

  #overall {
    aspect-ratio: 1 / 1;
    width: calc(100% - 2 * var(--boundary-width));
  }
}
</style>
