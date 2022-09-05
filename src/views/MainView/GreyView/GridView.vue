<template>
  <div id="grid-view">
    <div id="grids" ref="grids"/>

    <div id="settings">
      <el-radio-group v-model="sortBy" @change="sortMethodChanged">
        <el-radio label="name">名字</el-radio>
        <el-radio label="num">人数</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import api from "@/service/grids";

export default {
  name: "GridView",
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
      });  // todo: 换成灰名单数据
      const gridsData = gridsCnt["data"][0];
      this.$store.commit("datastore/setGridsData", gridsData);
    },
    drawGrids() {
      let gridsData = this.$store.state.datastore.gridsData;
      if (!gridsData) {
        return;
      }

      let myChart = this.$echarts.getInstanceByDom(this.$refs["grids"]);
      if (myChart == null) {
        myChart = this.$echarts.init(this.$refs["grids"]);
      }

      let keysSorted = Object.keys(gridsData)
          .sort((a, b) => gridsData[b]["totalCnt"] - gridsData[a]["totalCnt"]);
      const max = this.getBaseLog(10, gridsData[keysSorted[0]]["totalCnt"]);
      if (this.sortBy === "name") {
        keysSorted.sort();
      }

      let option = {
        tooltip: {
          trigger: "item"
        },
        legend: {
          top: "2%",
          right: "0%",
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
        newConfig["center"] = [`${y * 10 + 5}%`, `${x * 11 + 15}%`];

        const outerRadius = (this.getBaseLog(10, data["totalCnt"]) / max) * 10;
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
            path: "/gridInfo",
            query: {
              "grid": gridName,
              "date": that.$store.state.datastore.date,
              "recordLimit": that.$store.state.datastore.recordLimit,
              "type": "grey"
            }
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
      const data = this.$store.state.datastore["gridsData"][grid];
      const unfinishedCnt = data["totalCnt"] - data["finishedCnt"];
      const proportion = `${unfinishedCnt}/${data["totalCnt"]}`;
      return `{name|${grid}}\n{proportion|${proportion}}`;
    },
    sortMethodChanged() {
      this.drawGrids();
    },
    dataUpdate() {
      if (this.date && this.recordLimit) {
        this.getGridData();
        this.drawGrids();
      }
    }
  },
  computed: {
    ...mapState("datastore", {
      date: state => state.date,
      recordLimit: state => state.recordLimit,
      gridsData: state => state.gridsData,
      dateChanged: state => state.dateChanged,
      recordLimitChanged: state => state.recordLimitChanged
    })
  },
  watch: {
    gridsData() {
      this.drawGrids();
    },
    dateChanged() {
      this.dataUpdate()
    },
    recordLimitChanged() {
      this.dataUpdate()
    }
  },
};
</script>

<style scoped lang="scss">
#grid-view {
  height: 100%;
  width: 100%;
  position: relative;

  #grids {
    height: 100%;
    width: 100%;
  }

  #settings {
    position: absolute;
    top: 2%;
    left: 20px;
  }
}
</style>
