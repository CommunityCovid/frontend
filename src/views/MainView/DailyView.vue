<template>
  <div id="daily-view">
    <div id="daily-view-left">
      <div id="daily-chart-view" class="boundary">
        <chart-view/>
      </div>
      <div id="daily-grid-view" class="boundary">
        <time-chart-view/>
      </div>
    </div>

    <div id="daily-view-right" class="boundary">
      <grid-view/>
    </div>
  </div>
</template>

<script>
import ChartView from "@/views/MainView/DailyView/ChartView";
import GridView from "@/views/MainView/DailyView/GridView";
import TimeChartView from "@/views/MainView/DailyView/TimeChartView";

export default {
  name: "DailyView",
  components: {GridView, TimeChartView, ChartView},
};
</script>

<style scoped lang="scss">
#daily-view {
  #daily-view {
    width: 100%;
    height: 100%;

    #daily-view-left {
      float: left;
      width: calc(40% - 2 * var(--boundary-width));
      height: calc(100% - 2 * var(--boundary-width));

      #daily-chart-view {
        width: 100%;
        height: calc(45% - 2 * var(--boundary-width));
      }

      #daily-grid-view {
        width: 100%;
        height: calc(55% - 2 * var(--boundary-width));
      }
    }

    #daily-view-right {
      margin-left: 40%;
      width: calc(60% - 2 * var(--boundary-width));
      height: calc(100% - 2 * var(--boundary-width));
    }
  }
}
</style>
