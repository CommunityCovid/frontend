<template>
  <div id="white-view">
    <div id="left">
      <div id="left-top" class="boundary">
        <chart-view/>
      </div>
      <div id="left-bottom" class="boundary">
        <time-chart-view/>
      </div>
    </div>

    <div id="right" class="boundary">
      <grid-view/>
    </div>
  </div>
</template>

<script>
import ChartView from "@/views/MainView/WhiteView/ChartView";
import GridView from "@/views/MainView/WhiteView/GridView";
import TimeChartView from "@/views/MainView/WhiteView/TimeChartView";

export default {
  name: "WhiteView",
  components: {GridView, TimeChartView, ChartView},
};
</script>

<style scoped lang="scss">
#white-view {
  width: 100%;
  height: 100%;

  #left {
    float: left;
    width: calc(40% - 2 * var(--boundary-width));
    height: calc(100% - 2 * var(--boundary-width));

    #left-top {
      width: 100%;
      height: calc(45% - 2 * var(--boundary-width));
    }

    #left-bottom {
      width: 100%;
      height: calc(55% - 2 * var(--boundary-width));
    }
  }

  #right {
    margin-left: 40%;
    width: calc(60% - 2 * var(--boundary-width));
    height: calc(100% - 2 * var(--boundary-width));
  }
}
</style>
