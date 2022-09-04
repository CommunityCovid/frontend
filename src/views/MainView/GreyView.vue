<template>
  <div id="grey-view">
    <div id="left">
      <div id="grey-chart-view" class="boundary">
        <chart-view/>
      </div>
      <div id="grey-grid-view" class="boundary">
        <grid-view/>
      </div>
    </div>

    <div id="right" class="boundary">
      <grey-list-view/>
    </div>
  </div>
</template>

<script>
import ChartView from "@/views/MainView/DailyView/ChartView";
import GridView from "@/views/MainView/DailyView/GridView";
import GreyListView from "@/views/MainView/GreyView/GreyListView";

export default {
  name: "GreyView",
  components: {GreyListView, GridView, ChartView},
};
</script>

<style scoped lang="scss">
#grey-view {
  width: 100%;
  height: 100%;

  #left {
    float: left;
    width: calc(40% - 2 * var(--boundary-width));
    height: calc(100% - 2 * var(--boundary-width));

    #grey-chart-view {
      width: 100%;
      height: calc(45% - 2 * var(--boundary-width));
    }

    #grey-grid-view {
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
