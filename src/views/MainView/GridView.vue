<template>
  <!--  <div id="grid-view" v-if="grids !== undefined" ref="gridview"/>-->
  <div id="grid-view" ref="gridview"/>
</template>

<script>
// import {mapState} from "vuex";
import api from "@/service/grids";

export default {
  name: "GridView",
  created() {
    // this.$store.commit("datastore/initGrids");
  },
  mounted() {
    this.drawGrids();
  },
  data() {
    return {
      gridsData: {}
    };
  },
  methods: {
    async drawGrids() {
      const gridsCnt = await api.getGridsCnt();
      const gridsData = gridsCnt["data"][0];
      this.gridsData = gridsData;

      let myChart = this.$echarts.getInstanceByDom(this.$refs["gridview"]);
      if (myChart == null) {
        myChart = this.$echarts.init(this.$refs["gridview"]);
      }

      const keysSorted = Object.keys(gridsData).sort(
          (a, b) => gridsData[b]["totalCnt"] - gridsData[a]["totalCnt"]);
      const max = this.getBaseLog(10, gridsData[keysSorted[0]]["totalCnt"]);

      let option = {
        tooltip: {
          trigger: "item"
        },
        legend: {
          top: "3.3%",
          left: "center",
          height: "3.3%"
        },
        series: []
      };
      let config = {
        type: "pie",
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
        }
      };
      let cnt = 0;
      for (let grid of keysSorted) {
        const data = gridsData[grid];
        const x = Math.floor(cnt / 10);
        const y = cnt - x * 10;
        const unfinishedCnt = data["totalCnt"] - data["finishedCnt"];

        let newConfig = {...config};
        newConfig["name"] = grid;
        newConfig["center"] = [`${y * 10 + 5}%`, `${x * 10 + 15}%`];

        const outerRadius = (this.getBaseLog(10, data["totalCnt"]) / max) * 8;
        newConfig["radius"] = [`${outerRadius / 1.7}%`, `${outerRadius}%`];

        newConfig["gridsData"] = gridsData[grid];

        newConfig["data"] = [
          {value: data["finishedCnt"], name: "已完成"},
          {value: unfinishedCnt, name: "未完成"}
        ];
        option["series"].push(newConfig);

        cnt += 1;
      }

      const that = this;
      myChart.on("click", function (params) {
        if (params["componentType"] === "series" && params["componentSubType"] === "pie") {
          const gridName = params["seriesName"];

          let routeData = that.$router.resolve({
            path: "/grid",
            query: {"gridName": gridName}
          });
          window.open(routeData.href, "_blank");
        }
      });

      myChart.setOption(option);
    },
    getBaseLog(base, number) {
      return Math.log(number) / Math.log(base);
    },
    getLabel(params) {
      const grid = params["seriesName"];
      const data = this.gridsData[grid];
      const unfinishedCnt = data["totalCnt"] - data["finishedCnt"];
      const proportion = `${unfinishedCnt}/${data["totalCnt"]}`;
      return `{name|${grid}}\n{proportion|${proportion}}`;
    }
  },
  computed: {
    // ...mapState("datastore", {
    //   grids: state => state.grids
    // })
  },
  watch: {
    // grids() {
    //
    // }
  }
};
</script>

<style scoped lang="scss">
#grid-view {
  height: 100%;
  width: 100%;
}
</style>
