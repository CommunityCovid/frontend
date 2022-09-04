<template>
  <div id="bar-chart" ref="barchart"/>
</template>

<script>
export default {
  name: "BarChart",
  methods: {
    drawBarChart(data) {
      const {gridName, records, done, notDone} = data;
      let myChart = this.$echarts.getInstanceByDom(this.$refs["barchart"]);
      if (myChart == null) {
        myChart = this.$echarts.init(this.$refs["barchart"]);
      }

      let option = {
        graphic: {
          type: "text",
          left: "0%",
          top: "5px",
          style: {
            text: gridName,
            textAlign: "center",
            fill: "#333",
            fontSize: 12,
            fontWeight: "bold"
          }
        },
        grid: {
          top: "20px",
          left: "0px",
          right: "0px",
          bottom: "18px"
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
            "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",]
        },
        yAxis: {
          type: "value",
          show: false,
          max: function (value) {
            return value.max;
          },
          axisLabel: {
            formatter: function () {
              return "";
            }
          }
        },
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            data: done,
            type: "bar",
            barCategoryGap: 0,
            stack: "x"
          },
          {
            data: notDone,
            type: "bar",
            barCategoryGap: 0,
            stack: "x"
          },
          {
            data: records,
            type: "line",
            smooth: true
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>

<style scoped lang="scss">
#bar-chart {
  height: 100%;
  width: 100%;
}
</style>
