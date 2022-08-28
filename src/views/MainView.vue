<template>
  <div id="main-view">
    <div id="top" class="boundary">
      <control-view/>
    </div>
    <div id="bottom">
      <div id="bottom-left" class="boundary">
        <chart-view/>
      </div>
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
export default {
  name: "MainView",
  components: {GridView, ChartView, ControlView}
};
</script>

<style scoped lang="scss">
#main-view {
  width: 100%;
  height: 100%;

  #top {
    height: calc(5% - 2 * var(--boundary-width));
  }

  #bottom {
    height: 95%;

    #bottom-left {
      float: left;
      width: calc(50% - 2 * var(--boundary-width));
      height: calc(100% - 2 * var(--boundary-width));
    }

    #bottom-right {
      margin-left: 50%;
      width: calc(50% - 2 * var(--boundary-width));
      height: calc(100% - 2 * var(--boundary-width));
    }
  }
}
</style>
