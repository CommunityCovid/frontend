<template>
  <div id="main-view">
    <div id="top" class="boundary">
      <control-view/>
    </div>
    <div id="bottom">
      <el-col style="height: 100%">
        <el-row style="height: 45%">
          <div id="bottom-left-top" class="boundary">
            <chart-view/>
          </div>
        </el-row>

        <el-row style="height: 55%">
          <div id="bottom-left-bottom" class="boundary">
            <time-chart-view/>
          </div>
        </el-row>
      </el-col>
      <div id="bottom-right" class="boundary">
        <grid-view/>
      </div>
    </div>
  </div>
</template>

<script>
import ControlView from "@/views/MainView/ControlView";
import ChartView from "@/views/MainView/ChartView";
import GridView from "@/views/MainView/GridView";
import TimeChartView from "./MainView/TimeChartView";

export default {
  name: "MainView",
  components: {TimeChartView, GridView, ChartView, ControlView},
  created() {
    // this.$store.commit("datastore/initGrids")
  }
};
</script>

<style scoped lang="scss">
#main-view {
  width: 100%;
  height: 100%;

  #top {
    height: calc(6% - 2 * var(--boundary-width));
  }

  #bottom {
    height: 95%;

    #bottom-left-top {
      float: left;
      width: calc(40% - 2 * var(--boundary-width) - 5px);
      height: calc(100% - 2 * var(--boundary-width) - 10px);
      margin-top: 2px;

    }

    #bottom-left-bottom {
      float: left;
      width: calc(40% - 2 * var(--boundary-width) - 5px);
      height: calc(100% - 2 * var(--boundary-width) - 5px);
      margin-top: -5px;
    }

    #bottom-right {
      margin-left: 40%;
      width: calc(60% - 2 * var(--boundary-width));
      height: calc(100% - 2 * var(--boundary-width));
    }
  }
}
</style>
