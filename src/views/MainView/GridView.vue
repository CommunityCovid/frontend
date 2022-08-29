<template>
  <div id="grid-view" v-if="grids !== undefined" ref="gridview"/>
</template>

<script>
import {mapState} from "vuex";
import api from "@/service/grids";

export default {
  name: "GridView",
  created() {
    this.$store.commit("datastore/initGrids");
  },
  mounted() {
    this.drawGrids();
  },
  data() {
    return {};
  },
  methods: {
    async drawGrids() {
      const gridsCnt = await api.getGridsCnt();
      const gridsData = gridsCnt["data"][0];

      let myChart = this.$echarts.getInstanceByDom(this.$refs["gridview"]);
      if (myChart == null) {
        myChart = this.$echarts.init(this.$refs["gridview"]);
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
        series: []
      };
      let config = {
        type: "pie",
        radius: ["4%", "8%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2
        },
        label: {
          show: true,
          position: "center",
          formatter: `{a}`
        },
        labelLine: {
          show: false
        }
      };
      let cnt = 0;
      for (let grid in gridsData) {
        const data = gridsData[grid];
        const x = Math.floor(cnt / 10);
        const y = cnt - x * 10;

        let newConfig = {...config};
        newConfig["name"] = grid;
        newConfig["center"] = [`${y * 10 + 5}%`, `${x * 10 + 15}%`];
        newConfig["data"] = [
          {value: data["finishedCnt"], name: "finished"},
          {value: data["totalCnt"] - data["finishedCnt"], name: "unfinished"}
        ];
        option["series"].push(newConfig);

        cnt += 1;
      }

      myChart.on("click", function (params) {
        console.log(params);

        if (params.componentType === "series") {
          if (params.seriesType === "graph") {
            if (params.dataType === "edge") {
              // 点击到了 graph 的 edge（边）上。
            } else {
              // 点击到了 graph 的 node（节点）上。
            }
          }
        }
      });

      myChart.setOption(option);
    }
  },
  computed: {
    ...mapState("datastore", {
      grids: state => state.grids
    })
  },
  watch: {
    grids() {

    }
  }
};
</script>

<style scoped lang="scss">
#grid-view {
  height: 100%;
  width: 100%;
}
</style>
