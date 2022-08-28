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
  height: calc(100% - 2px);

  #top {
    height: calc(5% - 2px);
  }

  #bottom {
    height: 95%;

    #bottom-left {
      float: left;
      width: calc(50% - 2px);
      height: calc(100% - 1px);
    }

    #bottom-right {
      margin-left: 50%;
      width: calc(50% - 2px);
      height: calc(100% - 1px);
    }
  }
}
</style>
