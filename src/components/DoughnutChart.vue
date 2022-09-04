<template>
  <div id="doughnut-chart" ref="doughnutchart"/>
</template>

<script>
export default {
  name: "DoughnutChart",
  props: ["gridData", "gridName", "maxRadius"],
  mounted() {
  },
  methods: {
    drawDoughnutChart() {
      let myChart = this.$echarts.getInstanceByDom(this.$refs["doughnutchart"]);
      if (myChart == null) {
        myChart = this.$echarts.init(this.$refs["doughnutchart"]);
      }

      let option = {
        tooltip: {
          trigger: "item"
        },
        legend: {
          top: "3.3%",
          left: "center",
          height: "3.3%"
        },
        series: [{
          name: this.gridName,
          type: "pie",
          radius: this.getRadius(),
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2
          },
          label: {
            show: true,
            position: "center",
            formatter: this.getLabel,
            rich: {
              name: {
                fontSize: 12,
                fontWeight: "bold"
              },
              proportion: {
                fontSize: 10
              }
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: this.gridData["finishedCnt"], name: "已完成"},
            {value: this.unfinishedCnt, name: "未完成"}
          ]
        }]
      };

      const that = this;
      myChart.on("click", function (params) {
        if (params["componentType"] === "series" && params["componentSubType"] === "pie") {
          const gridName = params["seriesName"];

          let routeData = that.$router.resolve({
            path: "/gridInfo",
            query: {"grid": gridName}
          });
          window.open(routeData.href, "_blank");
        }
      });

      myChart.setOption(option);
    },
    getLabel() {
      const proportion = `${this.unfinishedCnt}/${this.gridData["totalCnt"]}`;
      return `{name|${this.gridName}}\n{proportion|${proportion}}`;
    },
    getRadius() {
      const outerRadius = (this.getBaseLog(10, this.gridData["totalCnt"]) / this.maxRadius) * 10;
      return [`${outerRadius / 1.7}%`, `${outerRadius}%`];
    },
    getBaseLog(base, number) {
      return Math.log(number) / Math.log(base);
    },
  },
  computed: {
    unfinishedCnt() {
      return this.gridData["totalCnt"] - this.gridData["finishedCnt"];
    },
  }
};
</script>

<style scoped>
#doughnut-chart {
  height: 100%;
  width: 100%;
}
</style>
