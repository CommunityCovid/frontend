<template>
  <div id="main-view">
    <div id="top" class="boundary">
      <control-view/>
    </div>
    <div id="bottom">
      <div id="hourly-view" v-if="timeGranularity==='hour'">
        <hourly-view/>
      </div>
      <div id="daily-view" v-else-if="timeGranularity==='day'">
        <daily-view/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ControlView from "@/views/MainView/ControlView";
import HourlyView from "@/views/MainView/HourlyView";
import DailyView from "@/views/MainView/DailyView";

export default {
  name: "MainView",
  components: {DailyView, HourlyView, ControlView},
  data() {
    return {};
  },
  created() {
  },
  watch: {},
  computed: {
    ...mapState("datastore", {
      timeGranularity: state => state.timeGranularity
    })
  }
};
</script>

<style scoped lang="scss">
#main-view {
  width: 100%;
  height: 100%;

  #top {
    width: 100%;
    height: calc(6% - 2 * var(--boundary-width));
  }

  #bottom {
    width: 100%;
    height: 95%;

    #hourly-view {
      width: 100%;
      height: 100%;
    }

    #daily-view {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
