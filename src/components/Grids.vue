<template>
  <div id="grids-chart">
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

export default {
  name: "Grids",
  data() {
    return {
      dataName: "",
      type: "",
      sortBy: "name"
    };
  },
  methods: {
    drawGrids(type) {
      const dataName = type === "white" ? "gridsData" : "greyGridsData";
      let gridsData = this.$store.state.datastore[dataName];
      this.dataName = dataName;
      this.type = type;

      let myChart = this.$echarts.getInstanceByDom(this.$refs["grids"]);
      if (myChart == null) {
        myChart = this.$echarts.init(this.$refs["grids"]);
      }

      let keysSorted = Object.keys(gridsData)
          .sort((a, b) => gridsData[b]["totalCnt"] - gridsData[a]["totalCnt"]);
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
          },
          config = {
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
          },
          cnt = 0;
      for (let grid of keysSorted) {
        const data = gridsData[grid];
        const x = Math.floor(cnt / 10);
        const y = cnt - x * 10;
        const unfinishedCnt = data["totalCnt"] - data["finishedCnt"];

        let newConfig = {...config};
        newConfig["name"] = grid;
        newConfig["center"] = [`${y * 10 + 5}%`, `${x * 11 + 15}%`];

        // const outerRadius = (this.getBaseLog(10, data["totalCnt"]) / max) * 11;
        const outerRadius = 10;

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
        console.log("click")
        if (params["componentType"] === "series" && params["componentSubType"] === "pie") {
          const gridName = params["seriesName"];

          let routeData = that.$router.resolve({
            path: "/gridInfo",
            query: {
              "grid": gridName,
              "date": that.$store.state.datastore.date,
              "recordLimit": that.$store.state.datastore.recordLimit, // todo:是否正确？
              "type": that.type
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
      const data = this.$store.state.datastore[this.dataName][grid];
      const unfinishedCnt = data["totalCnt"] - data["finishedCnt"];
      const proportion = `${unfinishedCnt}/${data["totalCnt"]}`;
      return `{name|${grid}}\n{proportion|${proportion}}`;
    },
    sortMethodChanged() {
      this.drawGrids(this.type);
    }
  },
  computed: {
    ...mapState("datastore", {
      date: state => state.date,
      recordLimit: state => state.recordLimit,
    })
  },
  watch: {
  },
};
</script>

<style scoped lang="scss">
#grids-chart {
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
